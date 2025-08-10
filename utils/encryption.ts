import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { SECURITY_CONFIG } from './securityConfig';
import * as CryptoJS from 'crypto-js';

// Encryption key management
const ENCRYPTION_KEY_STORAGE_KEY = 'finguard_encryption_key';
const IV_STORAGE_KEY = 'finguard_encryption_iv';

export class EncryptionService {
  private static instance: EncryptionService;
  private encryptionKeyBase64: string | null = null;
  private initializationVectorBase64: string | null = null;

  private constructor() {}

  public static getInstance(): EncryptionService {
    if (!EncryptionService.instance) {
      EncryptionService.instance = new EncryptionService();
    }
    return EncryptionService.instance;
  }

  // Initialize encryption service
  public async initialize(): Promise<void> {
    try {
      this.encryptionKeyBase64 = await SecureStore.getItemAsync(ENCRYPTION_KEY_STORAGE_KEY);
      this.initializationVectorBase64 = await SecureStore.getItemAsync(IV_STORAGE_KEY);

      if (!this.encryptionKeyBase64 || !this.initializationVectorBase64) {
        await this.generateNewKeys();
      }
    } catch (error) {
      console.error('Failed to initialize encryption service:', error);
      throw new Error('Encryption initialization failed');
    }
  }

  private wordArrayFromRandomBytes = async (numBytes: number): Promise<CryptoJS.lib.WordArray> => {
    const randomBytes = await Crypto.getRandomBytesAsync(numBytes);
    // Convert Uint8Array to WordArray
    const words: number[] = [];
    for (let i = 0; i < randomBytes.length; i += 4) {
      words.push(
        ((randomBytes[i] || 0) << 24) |
          ((randomBytes[i + 1] || 0) << 16) |
          ((randomBytes[i + 2] || 0) << 8) |
          (randomBytes[i + 3] || 0)
      );
    }
    return CryptoJS.lib.WordArray.create(words, randomBytes.length);
  };

  // Generate new encryption keys
  private async generateNewKeys(): Promise<void> {
    try {
      // 32 bytes = 256-bit key
      const keyWordArray = await this.wordArrayFromRandomBytes(32);
      const ivWordArray = await this.wordArrayFromRandomBytes(SECURITY_CONFIG.ENCRYPTION.IV_SIZE);

      this.encryptionKeyBase64 = CryptoJS.enc.Base64.stringify(keyWordArray);
      this.initializationVectorBase64 = CryptoJS.enc.Base64.stringify(ivWordArray);

      await SecureStore.setItemAsync(ENCRYPTION_KEY_STORAGE_KEY, this.encryptionKeyBase64);
      await SecureStore.setItemAsync(IV_STORAGE_KEY, this.initializationVectorBase64);
    } catch (error) {
      console.error('Failed to generate encryption keys:', error);
      throw new Error('Key generation failed');
    }
  }

  private getKeyWordArray(): CryptoJS.lib.WordArray {
    if (!this.encryptionKeyBase64) throw new Error('Encryption service not initialized');
    return CryptoJS.enc.Base64.parse(this.encryptionKeyBase64);
  }

  private getIvWordArray(): CryptoJS.lib.WordArray {
    if (!this.initializationVectorBase64) throw new Error('Encryption service not initialized');
    return CryptoJS.enc.Base64.parse(this.initializationVectorBase64);
  }

  // Encrypt data using AES-256-CBC
  public async encrypt(data: string): Promise<string> {
    if (!this.encryptionKeyBase64 || !this.initializationVectorBase64) {
      throw new Error('Encryption service not initialized');
    }

    try {
      // Fresh IV per encryption for forward secrecy
      const ivWordArray = await this.wordArrayFromRandomBytes(SECURITY_CONFIG.ENCRYPTION.IV_SIZE);
      const keyWordArray = this.getKeyWordArray();

      const cipherParams = CryptoJS.AES.encrypt(data, keyWordArray, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const ciphertextBase64 = cipherParams.ciphertext.toString(CryptoJS.enc.Base64);
      const ivBase64 = CryptoJS.enc.Base64.stringify(ivWordArray);

      // result format: iv:ciphertext
      return `${ivBase64}:${ciphertextBase64}`;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Data encryption failed');
    }
  }

  // Decrypt data using AES-256-CBC
  public async decrypt(encryptedData: string): Promise<string> {
    if (!this.encryptionKeyBase64 || !this.initializationVectorBase64) {
      throw new Error('Encryption service not initialized');
    }

    try {
      const [ivBase64, ciphertextBase64] = encryptedData.split(':');
      if (!ivBase64 || !ciphertextBase64) {
        throw new Error('Invalid encrypted data format');
      }
      const ivWordArray = CryptoJS.enc.Base64.parse(ivBase64);
      const keyWordArray = this.getKeyWordArray();

      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(ciphertextBase64) } as any,
        keyWordArray,
        {
          iv: ivWordArray,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      return CryptoJS.enc.Utf8.stringify(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Data decryption failed');
    }
  }

  // Encrypt sensitive data for storage
  public async encryptSensitiveData(data: any): Promise<string> {
    const jsonString = JSON.stringify(data);
    return await this.encrypt(jsonString);
  }

  // Decrypt sensitive data from storage
  public async decryptSensitiveData(encryptedData: string): Promise<any> {
    const decryptedString = await this.decrypt(encryptedData);
    return JSON.parse(decryptedString);
  }

  // Generate hash for data integrity
  public async generateHash(data: string): Promise<string> {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );
  }

  // Verify data integrity
  public async verifyHash(data: string, expectedHash: string): Promise<boolean> {
    const actualHash = await this.generateHash(data);
    return actualHash === expectedHash;
  }

  // Rotate encryption keys
  public async rotateKeys(): Promise<void> {
    try {
      await this.generateNewKeys();
      console.log('Encryption keys rotated successfully');
    } catch (error) {
      console.error('Key rotation failed:', error);
      throw new Error('Key rotation failed');
    }
  }

  // Clear encryption keys (for logout)
  public async clearKeys(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(ENCRYPTION_KEY_STORAGE_KEY);
      await SecureStore.deleteItemAsync(IV_STORAGE_KEY);
      this.encryptionKeyBase64 = null;
      this.initializationVectorBase64 = null;
    } catch (error) {
      console.error('Failed to clear encryption keys:', error);
    }
  }
}

// Export singleton instance
export const encryptionService = EncryptionService.getInstance();

// Utility functions for common encryption tasks
export const encryptString = async (data: string): Promise<string> => {
  return await encryptionService.encrypt(data);
};

export const decryptString = async (encryptedData: string): Promise<string> => {
  return await encryptionService.decrypt(encryptedData);
};

export const encryptObject = async (data: any): Promise<string> => {
  return await encryptionService.encryptSensitiveData(data);
};

export const decryptObject = async (encryptedData: string): Promise<any> => {
  return await encryptionService.decryptSensitiveData(encryptedData);
};

export const generateDataHash = async (data: string): Promise<string> => {
  return await encryptionService.generateHash(data);
};

export const verifyDataIntegrity = async (data: string, expectedHash: string): Promise<boolean> => {
  return await encryptionService.verifyHash(data, expectedHash);
};
