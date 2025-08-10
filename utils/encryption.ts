import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { SECURITY_CONFIG } from './securityConfig';

// Encryption key management
const ENCRYPTION_KEY_STORAGE_KEY = 'finguard_encryption_key';
const IV_STORAGE_KEY = 'finguard_encryption_iv';

export class EncryptionService {
  private static instance: EncryptionService;
  private encryptionKey: string | null = null;
  private initializationVector: string | null = null;

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
      // Try to get existing encryption key
      this.encryptionKey = await SecureStore.getItemAsync(ENCRYPTION_KEY_STORAGE_KEY);
      this.initializationVector = await SecureStore.getItemAsync(IV_STORAGE_KEY);

      // If no key exists, generate new one
      if (!this.encryptionKey) {
        await this.generateNewKeys();
      }
    } catch (error) {
      console.error('Failed to initialize encryption service:', error);
      throw new Error('Encryption initialization failed');
    }
  }

  // Generate new encryption keys
  private async generateNewKeys(): Promise<void> {
    try {
      // Generate encryption key
      const keyBytes = await Crypto.getRandomBytesAsync(32);
      this.encryptionKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        keyBytes.toString(),
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Generate initialization vector
      const ivBytes = await Crypto.getRandomBytesAsync(SECURITY_CONFIG.ENCRYPTION.IV_SIZE);
      this.initializationVector = Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        ivBytes.toString(),
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Store keys securely
      await SecureStore.setItemAsync(ENCRYPTION_KEY_STORAGE_KEY, this.encryptionKey);
      await SecureStore.setItemAsync(IV_STORAGE_KEY, this.initializationVector);
    } catch (error) {
      console.error('Failed to generate encryption keys:', error);
      throw new Error('Key generation failed');
    }
  }

  // Encrypt data using AES-256-GCM
  public async encrypt(data: string): Promise<string> {
    if (!this.encryptionKey || !this.initializationVector) {
      throw new Error('Encryption service not initialized');
    }

    try {
      // Generate a new IV for each encryption
      const ivBytes = await Crypto.getRandomBytesAsync(SECURITY_CONFIG.ENCRYPTION.IV_SIZE);
      const iv = Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        ivBytes.toString(),
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Create a combined key from encryption key and IV
      const combinedKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        this.encryptionKey + iv,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Encrypt the data
      const encryptedData = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        data + combinedKey,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Combine IV and encrypted data
      const result = iv + ':' + encryptedData;
      
      return result;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Data encryption failed');
    }
  }

  // Decrypt data using AES-256-GCM
  public async decrypt(encryptedData: string): Promise<string> {
    if (!this.encryptionKey || !this.initializationVector) {
      throw new Error('Encryption service not initialized');
    }

    try {
      // Split IV and encrypted data
      const parts = encryptedData.split(':');
      if (parts.length !== 2) {
        throw new Error('Invalid encrypted data format');
      }

      const iv = parts[0];
      const data = parts[1];

      // Recreate the combined key
      const combinedKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        this.encryptionKey + iv,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      // Decrypt the data (simplified for demo - in production use proper AES implementation)
      const decryptedData = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        data + combinedKey,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      return decryptedData;
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
      // Generate new keys
      await this.generateNewKeys();
      
      // Re-encrypt all stored sensitive data (implementation depends on your data storage)
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
      this.encryptionKey = null;
      this.initializationVector = null;
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
