import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptionService } from './encryption';

/**
 * AsyncStorage utility class with encryption and backward-compatible reads
 */
class AsyncStorageService {
  /**
   * Store data (always encrypted)
   */
  static async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      try { await encryptionService.initialize(); } catch {}
      const payload = await encryptionService.encrypt(jsonValue);
      await AsyncStorage.setItem(key, payload);
      return true;
    } catch (error) {
      console.error('Error storing data:', error);
      return false;
    }
  }

  /**
   * Retrieve data
   * - Tries decrypt → JSON
   * - Fallback: plain JSON
   * - Fallback: raw string
   * - Migrates plain values to encrypted
   */
  static async getItem(key) {
    try {
      const stored = await AsyncStorage.getItem(key);
      if (stored == null) return null;

      // Try encrypted first
      try {
        await encryptionService.initialize();
        const decrypted = await encryptionService.decrypt(stored);
        try {
          return JSON.parse(decrypted);
        } catch {
          // Not JSON, return raw decrypted string
          return decrypted;
        }
      } catch {
        // Not encrypted or bad ciphertext → try plain JSON
        try {
          const parsed = JSON.parse(stored);
          // Migrate to encrypted
          await this.setItem(key, parsed);
          return parsed;
        } catch {
          // Plain string (e.g., token). Migrate to encrypted string.
          await this.setItem(key, stored);
          return stored;
        }
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  /**
   * Remove an item
   */
  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  /**
   * Clear all
   */
  static async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Get all keys
   */
  static async getAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Error getting all keys:', error);
      return null;
    }
  }

  /**
   * Get multiple (backward-compatible)
   */
  static async getMultiple(keys) {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result = {};
      for (const [key, value] of pairs) {
        if (value == null) {
          result[key] = null;
          continue;
        }
        // Try encrypted first
        try {
          await encryptionService.initialize();
          const decrypted = await encryptionService.decrypt(value);
          try {
            result[key] = JSON.parse(decrypted);
          } catch {
            result[key] = decrypted;
          }
        } catch {
          // Fallback to plain JSON or string; migrate
          try {
            const parsed = JSON.parse(value);
            await this.setItem(key, parsed);
            result[key] = parsed;
          } catch {
            await this.setItem(key, value);
            result[key] = value;
          }
        }
      }
      return result;
    } catch (error) {
      console.error('Error getting multiple items:', error);
      return null;
    }
  }

  /**
   * Set multiple (always encrypted)
   */
  static async setMultiple(keyValuePairs) {
    try {
      try { await encryptionService.initialize(); } catch {}
      const out = [];
      for (const [key, value] of Object.entries(keyValuePairs)) {
        const payload = await encryptionService.encrypt(JSON.stringify(value));
        out.push([key, payload]);
      }
      await AsyncStorage.multiSet(out);
      return true;
    } catch (error) {
      console.error('Error setting multiple items:', error);
      return false;
    }
  }

  static async hasKey(key) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys.includes(key);
    } catch (error) {
      console.error('Error checking key existence:', error);
      return false;
    }
  }

  static async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      let totalSize = 0;

      values.forEach(([key, value]) => {
        totalSize += key.length + (value ? value.length : 0);
      });

      return {
        totalKeys: keys.length,
        totalSize: totalSize,
        keys: keys
      };
    } catch (error) {
      console.error('Error getting storage size:', error);
      return null;
    }
  }
}

// Common storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',
  LESSON_PROGRESS: 'lesson_progress',
  SIMULATION_HISTORY: 'simulation_history',
  THEME_PREFERENCE: 'theme_preference',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  SECURITY_SETTINGS: 'security_settings',
  CACHED_DATA: 'cached_data',
  LAST_LOGIN: 'last_login'
};

export default AsyncStorageService;
