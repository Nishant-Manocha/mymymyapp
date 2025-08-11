import { Platform } from 'react-native';
import { SECURITY_CONFIG } from './securityConfig';

// Import react-native-fs for reading certificate files
// Note: You may need to install this package: npm install react-native-fs
// If you prefer not to use react-native-fs, we can implement an alternative approach
let RNFS: any;
try {
  RNFS = require('react-native-fs');
} catch (error) {
  console.warn('react-native-fs not available, using fallback certificate loading');
}

export interface CertificateInfo {
  filename: string;
  content: string;
  fingerprint: string;
}

export interface SSLPinningResult {
  enabled: boolean;
  status: string;
  certificates?: CertificateInfo[];
  error?: string;
}

class SSLPinningService {
  private static instance: SSLPinningService;
  private certificates: Map<string, CertificateInfo> = new Map();
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): SSLPinningService {
    if (!SSLPinningService.instance) {
      SSLPinningService.instance = new SSLPinningService();
    }
    return SSLPinningService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('[SSL_PINNING_DEBUG] Initializing SSL Pinning service...');
      
      // Load certificates from assets
      await this.loadCertificates();
      
      this.isInitialized = true;
      console.log('[SSL_PINNING_DEBUG] SSL Pinning service initialized successfully');
    } catch (error) {
      console.error('[SSL_PINNING_DEBUG] Failed to initialize SSL Pinning service:', error);
      throw error;
    }
  }

  private async loadCertificates(): Promise<void> {
    try {
      const { CERTIFICATES, VALIDATION } = SECURITY_CONFIG.SSL_PINNING;
      
      if (!VALIDATION?.ENABLED) {
        console.log('[SSL_PINNING_DEBUG] SSL pinning validation disabled');
        return;
      }

      // Load production certificates
      if (CERTIFICATES.PRODUCTION) {
        for (const certFile of CERTIFICATES.PRODUCTION) {
          try {
            const certInfo = await this.loadCertificateFromAssets(certFile);
            this.certificates.set(certFile, certInfo);
            console.log(`[SSL_PINNING_DEBUG] Loaded production certificate: ${certFile}`);
          } catch (error) {
            console.warn(`[SSL_PINNING_DEBUG] Failed to load production certificate ${certFile}:`, error);
          }
        }
      }

      // Load staging certificates
      if (CERTIFICATES.STAGING) {
        for (const certFile of CERTIFICATES.STAGING) {
          try {
            const certInfo = await this.loadCertificateFromAssets(certFile);
            this.certificates.set(certFile, certInfo);
            console.log(`[SSL_PINNING_DEBUG] Loaded staging certificate: ${certFile}`);
          } catch (error) {
            console.warn(`[SSL_PINNING_DEBUG] Failed to load staging certificate ${certFile}:`, error);
          }
        }
      }

      console.log(`[SSL_PINNING_DEBUG] Loaded ${this.certificates.size} certificates`);
    } catch (error) {
      console.error('[SSL_PINNING_DEBUG] Error loading certificates:', error);
      throw error;
    }
  }

  private async loadCertificateFromAssets(certFile: string): Promise<CertificateInfo> {
    try {
      // Get the certificate path from config
      const certPath = SECURITY_CONFIG.SSL_PINNING.VALIDATION?.CERT_PATH || 'android/app/src/main/assets/certs';
      const fullPath = `${certPath}/${certFile}`;
      
      console.log(`[SSL_PINNING_DEBUG] Attempting to load certificate from: ${fullPath}`);

      let certContent: string;
      
      if (RNFS && Platform.OS === 'android') {
        // Use react-native-fs to read the certificate file
        try {
          certContent = await RNFS.readFile(fullPath, 'utf8');
          console.log(`[SSL_PINNING_DEBUG] Successfully read certificate using RNFS: ${certFile}`);
        } catch (rnfsError) {
          console.warn(`[SSL_PINNING_DEBUG] RNFS failed, trying alternative path:`, rnfsError);
          // Try alternative path for assets
          const altPath = `/android_asset/certs/${certFile}`;
          certContent = await RNFS.readFile(altPath, 'utf8');
          console.log(`[SSL_PINNING_DEBUG] Successfully read certificate using alternative path: ${certFile}`);
        }
      } else {
        // Fallback: Try to load from bundled assets or use a different approach
        console.log(`[SSL_PINNING_DEBUG] RNFS not available, using fallback method for: ${certFile}`);
        
        // For now, we'll use a placeholder approach
        // In production, you might want to bundle certificates as strings or use a native module
        throw new Error(`Certificate loading not implemented for ${certFile} - RNFS not available`);
      }

      // Generate fingerprint from certificate content
      const fingerprint = await this.generateFingerprint(certContent);
      
      return {
        filename: certFile,
        content: certContent,
        fingerprint: fingerprint
      };
    } catch (error) {
      console.error(`[SSL_PINNING_DEBUG] Failed to load certificate ${certFile}:`, error);
      throw error;
    }
  }

  private async generateFingerprint(certContent: string): Promise<string> {
    try {
      // Remove PEM headers and whitespace
      const cleanCert = certContent
        .replace(/-----BEGIN CERTIFICATE-----/, '')
        .replace(/-----END CERTIFICATE-----/, '')
        .replace(/\s/g, '');
      
      // Convert base64 to binary and generate SHA-256 hash
      // This is a simplified approach - in production you might want to use a proper crypto library
      const binaryString = atob(cleanCert);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Generate SHA-256 hash
      const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      return hashHex;
    } catch (error) {
      console.warn('[SSL_PINNING_DEBUG] Failed to generate fingerprint, using fallback:', error);
      // Fallback: use a hash of the content string
      return this.simpleHash(certContent);
    }
  }

  private simpleHash(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  public async validateCertificate(serverCert: string, hostname: string): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.warn('[SSL_PINNING_DEBUG] SSL Pinning service not initialized');
        return false;
      }

      if (!SECURITY_CONFIG.SSL_PINNING.ENABLED) {
        console.log('[SSL_PINNING_DEBUG] SSL pinning disabled');
        return true;
      }

      const { VALIDATION } = SECURITY_CONFIG.SSL_PINNING;
      
      // Check if we have any certificates loaded
      if (this.certificates.size === 0) {
        console.warn('[SSL_PINNING_DEBUG] No certificates loaded for validation');
        if (VALIDATION?.FALLBACK_TO_SYSTEM) {
          console.log('[SSL_PINNING_DEBUG] Falling back to system CA store');
          return true;
        }
        return false;
      }

      // Generate fingerprint for server certificate
      const serverFingerprint = await this.generateFingerprint(serverCert);
      console.log(`[SSL_PINNING_DEBUG] Server certificate fingerprint: ${serverFingerprint}`);

      // Compare with loaded certificates
      for (const [filename, certInfo] of this.certificates) {
        if (certInfo.fingerprint === serverFingerprint) {
          console.log(`[SSL_PINNING_DEBUG] Certificate match found: ${filename}`);
          return true;
        }
      }

      // No match found
      console.warn('[SSL_PINNING_DEBUG] SSL pinning validation failed - no certificate match');
      
      if (VALIDATION?.LOG_VIOLATIONS) {
        console.error('[SSL_PINNING_VIOLATION] Certificate mismatch detected');
        console.error('[SSL_PINNING_VIOLATION] Server fingerprint:', serverFingerprint);
        console.error('[SSL_PINNING_VIOLATION] Expected fingerprints:', 
          Array.from(this.certificates.values()).map(c => c.fingerprint));
      }

      if (VALIDATION?.STRICT_MODE) {
        return false;
      }

      // Allow fallback if not in strict mode
      if (VALIDATION?.FALLBACK_TO_SYSTEM) {
        console.log('[SSL_PINNING_DEBUG] Allowing fallback to system CA store');
        return true;
      }

      return false;
    } catch (error) {
      console.error('[SSL_PINNING_DEBUG] Error validating certificate:', error);
      
      // Get VALIDATION again in catch block since it's out of scope
      const { VALIDATION } = SECURITY_CONFIG.SSL_PINNING;
      
      if (VALIDATION?.FALLBACK_TO_SYSTEM) {
        console.log('[SSL_PINNING_DEBUG] Error occurred, falling back to system CA store');
        return true;
      }
      
      return false;
    }
  }

  public async compareCertificates(cert1: string, cert2: string): Promise<boolean> {
    try {
      const fingerprint1 = await this.generateFingerprint(cert1);
      const fingerprint2 = await this.generateFingerprint(cert2);
      return fingerprint1 === fingerprint2;
    } catch (error) {
      console.error('[SSL_PINNING_DEBUG] Error comparing certificates:', error);
      return false;
    }
  }

  public getStatus(): SSLPinningResult {
    return {
      enabled: SECURITY_CONFIG.SSL_PINNING.ENABLED && this.isInitialized,
      status: this.isInitialized ? 'Initialized' : 'Not initialized',
      certificates: Array.from(this.certificates.values()),
      error: this.isInitialized ? undefined : 'Service not initialized'
    };
  }

  public isEnabled(): boolean {
    return SECURITY_CONFIG.SSL_PINNING.ENABLED && this.isInitialized;
  }
}

export default SSLPinningService.getInstance();