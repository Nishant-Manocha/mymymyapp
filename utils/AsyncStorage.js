import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStorage utility class for handling local storage operations
 */
class AsyncStorageService {
  /**
   * Store data in AsyncStorage
   * @param {string} key - The key to store the data under
   * @param {any} value - The value to store (will be JSON stringified)
   * @returns {Promise<boolean>} - Returns true if successful, false otherwise
   */
  static async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error storing data:', error);
      return false;
    }
  }

  /**
   * Retrieve data from AsyncStorage
   * @param {string} key - The key to retrieve data for
   * @returns {Promise<any|null>} - Returns the parsed data or null if not found/error
   */
  static async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  /**
   * Remove an item from AsyncStorage
   * @param {string} key - The key to remove
   * @returns {Promise<boolean>} - Returns true if successful, false otherwise
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
   * Clear all data from AsyncStorage
   * @returns {Promise<boolean>} - Returns true if successful, false otherwise
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
   * Get all keys from AsyncStorage
   * @returns {Promise<string[]|null>} - Returns array of keys or null if error
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
   * Get multiple items from AsyncStorage
   * @param {string[]} keys - Array of keys to retrieve
   * @returns {Promise<Object|null>} - Returns object with key-value pairs or null if error
   */
  static async getMultiple(keys) {
    try {
      const values = await AsyncStorage.multiGet(keys);
      const result = {};
      values.forEach(([key, value]) => {
        result[key] = value ? JSON.parse(value) : null;
      });
      return result;
    } catch (error) {
      console.error('Error getting multiple items:', error);
      return null;
    }
  }

  /**
   * Set multiple items in AsyncStorage
   * @param {Object} keyValuePairs - Object with key-value pairs to store
   * @returns {Promise<boolean>} - Returns true if successful, false otherwise
   */
  static async setMultiple(keyValuePairs) {
    try {
      const pairs = Object.entries(keyValuePairs).map(([key, value]) => [
        key,
        JSON.stringify(value)
      ]);
      await AsyncStorage.multiSet(pairs);
      return true;
    } catch (error) {
      console.error('Error setting multiple items:', error);
      return false;
    }
  }

  /**
   * Check if a key exists in AsyncStorage
   * @param {string} key - The key to check
   * @returns {Promise<boolean>} - Returns true if key exists, false otherwise
   */
  static async hasKey(key) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys.includes(key);
    } catch (error) {
      console.error('Error checking key existence:', error);
      return false;
    }
  }

  /**
   * Get storage size information
   * @returns {Promise<Object|null>} - Returns storage info or null if error
   */
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

// Common storage keys for the FinGuard app
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
