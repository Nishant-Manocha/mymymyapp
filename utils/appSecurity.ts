import React, { ComponentType, FC } from 'react';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as SecureStore from 'expo-secure-store';
import { SECURITY_CONFIG } from './securityConfig';
import { TextInput } from 'react-native';



export interface AppSecurityConfig {
  disableCopyPaste: boolean;
  disableScreenshots: boolean;
  disableBackup: boolean;
  disableScreenRecording: boolean;
  disableKeyboardAutocomplete: boolean;
}

export class AppSecurityService {
  private static instance: AppSecurityService;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): AppSecurityService {
    if (!AppSecurityService.instance) {
      console.log('[AppSecurityService] Creating new instance');
      AppSecurityService.instance = new AppSecurityService();
    }
    return AppSecurityService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('[AppSecurityService] Already initialized, skipping.');
      return;
    }

    try {
      console.log('[AppSecurityService] Starting initialization...');

      console.log('[AppSecurityService] SECURITY_CONFIG.APP_SECURITY:', SECURITY_CONFIG.APP_SECURITY);

      if (SECURITY_CONFIG.APP_SECURITY.BACKUP_DISABLED) {
        console.log('[AppSecurityService] Disabling app backup...');
        await this.disableAppBackup();
      } else {
        console.log('[AppSecurityService] App backup disabling is OFF in config.');
      }

      if (SECURITY_CONFIG.APP_SECURITY.SCREENSHOT_DISABLED) {
        console.log('[AppSecurityService] Disabling screenshots...');
        await this.disableScreenshots();
      } else {
        console.log('[AppSecurityService] Screenshot disabling is OFF in config.');
      }

      if (SECURITY_CONFIG.APP_SECURITY.COPY_PASTE_DISABLED) {
        console.log('[AppSecurityService] Disabling copy/paste...');
        await this.disableCopyPaste();
      } else {
        console.log('[AppSecurityService] Copy/paste disabling is OFF in config.');
      }

      if (SECURITY_CONFIG.APP_SECURITY.SCREEN_RECORDING_DISABLED) {
        console.log('[AppSecurityService] Disabling screen recording...');
        await this.disableScreenRecording();
      } else {
        console.log('[AppSecurityService] Screen recording disabling is OFF in config.');
      }

      if (SECURITY_CONFIG.APP_SECURITY.KEYBOARD_AUTOCOMPLETE_DISABLED) {
        console.log('[AppSecurityService] Disabling keyboard autocomplete...');
        await this.disableKeyboardAutocomplete();
      } else {
        console.log('[AppSecurityService] Keyboard autocomplete disabling is OFF in config.');
      }

      this.isInitialized = true;
      console.log('[AppSecurityService] App security features initialized successfully');
    } catch (error) {
      console.error('[AppSecurityService] Failed to initialize app security features:', error);

      if (error instanceof TypeError) {
        console.error('[AppSecurityService] Possible undefined variable used with .includes():', error.message);
      }

      throw new Error('App security initialization failed');
    }
  }

  private async disableAppBackup(): Promise<void> {
    try {
      console.log('[AppSecurityService] disableAppBackup called');
      await SecureStore.setItemAsync('app_backup_disabled', 'true');
      console.log('[AppSecurityService] App backup disabled');
    } catch (error) {
      console.error('[AppSecurityService] Failed to disable app backup:', error);
    }
  }

  private async disableScreenshots(): Promise<void> {
    try {
      console.log('[AppSecurityService] disableScreenshots called');
      await SecureStore.setItemAsync('screenshots_disabled', 'true');
      console.log('[AppSecurityService] Screenshots disabled');
    } catch (error) {
      console.error('[AppSecurityService] Failed to disable screenshots:', error);
    }
  }

  private async disableCopyPaste(): Promise<void> {
    try {
      console.log('[AppSecurityService] disableCopyPaste called');
      await SecureStore.setItemAsync('copy_paste_disabled', 'true');
      console.log('[AppSecurityService] Copy/paste disabled');
    } catch (error) {
      console.error('[AppSecurityService] Failed to disable copy/paste:', error);
    }
  }

  private async disableScreenRecording(): Promise<void> {
    try {
      console.log('[AppSecurityService] disableScreenRecording called');
      await SecureStore.setItemAsync('screen_recording_disabled', 'true');
      console.log('[AppSecurityService] Screen recording disabled');
    } catch (error) {
      console.error('[AppSecurityService] Failed to disable screen recording:', error);
    }
  }

  private async disableKeyboardAutocomplete(): Promise<void> {
    try {
      console.log('[AppSecurityService] disableKeyboardAutocomplete called');
      await SecureStore.setItemAsync('keyboard_autocomplete_disabled', 'true');
      console.log('[AppSecurityService] Keyboard autocomplete disabled');
    } catch (error) {
      console.error('[AppSecurityService] Failed to disable keyboard autocomplete:', error);
    }
  }

  public async isCopyPasteDisabled(): Promise<boolean> {
    try {
      console.log('[AppSecurityService] Checking if copy/paste disabled');
      const disabled = await SecureStore.getItemAsync('copy_paste_disabled');
      console.log('[AppSecurityService] copy_paste_disabled value:', disabled);
      return disabled === 'true';
    } catch (error) {
      console.error('[AppSecurityService] Error checking copy/paste disabled:', error);
      return false;
    }
  }

  public async isScreenshotsDisabled(): Promise<boolean> {
    try {
      console.log('[AppSecurityService] Checking if screenshots disabled');
      const disabled = await SecureStore.getItemAsync('screenshots_disabled');
      console.log('[AppSecurityService] screenshots_disabled value:', disabled);
      return disabled === 'true';
    } catch (error) {
      console.error('[AppSecurityService] Error checking screenshots disabled:', error);
      return false;
    }
  }

  public async isBackupDisabled(): Promise<boolean> {
    try {
      console.log('[AppSecurityService] Checking if backup disabled');
      const disabled = await SecureStore.getItemAsync('app_backup_disabled');
      console.log('[AppSecurityService] app_backup_disabled value:', disabled);
      return disabled === 'true';
    } catch (error) {
      console.error('[AppSecurityService] Error checking backup disabled:', error);
      return false;
    }
  }

  public getSecureTextInputProps(): Record<string, any> {
    console.log('[AppSecurityService] getSecureTextInputProps called');
    return {
      contextMenuHidden: true,
      selectTextOnFocus: false,
      autoCorrect: false,
      autoCapitalize: 'none',
      spellCheck: false,
      onSelectionChange: () => false,
      onLongPress: () => false,
    };
  }

  public showSecurityWarning(message: string): void {
    console.log('[AppSecurityService] showSecurityWarning:', message);
    Alert.alert('Security Warning', message, [{ text: 'OK' }], { cancelable: false });
  }

  public async clearClipboard(): Promise<void> {
    try {
      console.log('[AppSecurityService] clearClipboard called');
      await Clipboard.setStringAsync('');
      console.log('[AppSecurityService] Clipboard cleared');
    } catch (error) {
      console.error('[AppSecurityService] Failed to clear clipboard:', error);
    }
  }

  public async secureSetStringAsync(text: string): Promise<void> {
    console.log('[AppSecurityService] secureSetStringAsync called');
    if (await this.isCopyPasteDisabled()) {
      console.warn('Copy operation blocked for security');
      throw new Error('Copy operation is disabled for security reasons');
    }
    await Clipboard.setStringAsync(text); // Proper await and no return
  }

  public async secureGetStringAsync(): Promise<string> {
    console.log('[AppSecurityService] secureGetStringAsync called');
    if (await this.isCopyPasteDisabled()) {
      console.warn('Paste operation blocked for security');
      throw new Error('Paste operation is disabled for security reasons');
    }
    return Clipboard.getStringAsync();
  }

  // public createSecureTextInput(InputComponent: React.ComponentType<any>): FC<any> {
  //   return (props: any) => {
  //     const secureProps = this.getSecureTextInputProps();
  //     return <InputComponent {...props} {...secureProps} />;
  //   };
  // }
  
  

  public async checkSecurityViolations(): Promise<string[]> {
    console.log('[AppSecurityService] Checking security violations...');
    const violations: string[] = [];

    if (SECURITY_CONFIG.APP_SECURITY.COPY_PASTE_DISABLED && !(await this.isCopyPasteDisabled())) {
      console.warn('[AppSecurityService] Copy/paste is not properly disabled');
      violations.push('Copy/paste is not properly disabled');
    }
    if (SECURITY_CONFIG.APP_SECURITY.SCREENSHOT_DISABLED && !(await this.isScreenshotsDisabled())) {
      console.warn('[AppSecurityService] Screenshots are not properly disabled');
      violations.push('Screenshots are not properly disabled');
    }
    if (SECURITY_CONFIG.APP_SECURITY.BACKUP_DISABLED && !(await this.isBackupDisabled())) {
      console.warn('[AppSecurityService] App backup is not properly disabled');
      violations.push('App backup is not properly disabled');
    }

    console.log('[AppSecurityService] Violations found:', violations);
    return violations;
  }

  public async resetSecuritySettings(): Promise<void> {
    try {
      console.log('[AppSecurityService] Resetting security settings...');
      await SecureStore.deleteItemAsync('copy_paste_disabled');
      await SecureStore.deleteItemAsync('screenshots_disabled');
      await SecureStore.deleteItemAsync('app_backup_disabled');
      await SecureStore.deleteItemAsync('screen_recording_disabled');
      await SecureStore.deleteItemAsync('keyboard_autocomplete_disabled');
      console.log('[AppSecurityService] Security settings reset');
    } catch (error) {
      console.error('[AppSecurityService] Failed to reset security settings:', error);
    }
  }
}

export const appSecurityService = AppSecurityService.getInstance();

// Utility exports
export const initializeAppSecurity = async (): Promise<void> => {
  console.log('[appSecurityService] initializeAppSecurity called');
  return appSecurityService.initialize();
};

export const isCopyPasteDisabled = async (): Promise<boolean> => {
  console.log('[appSecurityService] isCopyPasteDisabled called');
  return appSecurityService.isCopyPasteDisabled();
};

export const isScreenshotsDisabled = async (): Promise<boolean> => {
  console.log('[appSecurityService] isScreenshotsDisabled called');
  return appSecurityService.isScreenshotsDisabled();
};

export const isBackupDisabled = async (): Promise<boolean> => {
  console.log('[appSecurityService] isBackupDisabled called');
  return appSecurityService.isBackupDisabled();
};

export const getSecureTextInputProps = (): Record<string, any> => {
  console.log('[appSecurityService] getSecureTextInputProps called');
  return appSecurityService.getSecureTextInputProps();
};

export const showSecurityWarning = (message: string): void => {
  console.log('[appSecurityService] showSecurityWarning called');
  appSecurityService.showSecurityWarning(message);
};

export const clearClipboard = async (): Promise<void> => {
  console.log('[appSecurityService] clearClipboard called');
  return appSecurityService.clearClipboard();
};

export const secureSetStringAsync = async (text: string): Promise<void> => {
  console.log('[appSecurityService] secureSetStringAsync called');
  return appSecurityService.secureSetStringAsync(text);
};

export const secureGetStringAsync = async (): Promise<string> => {
  console.log('[appSecurityService] secureGetStringAsync called');
  return appSecurityService.secureGetStringAsync();
};

// export const createSecureTextInput = <T extends object>(TextInputComponent: ComponentType<T>): FC<T> => {
//   console.log('[appSecurityService] createSecureTextInput called');
//   return appSecurityService.createSecureTextInput(TextInputComponent);
// };

export const checkSecurityViolations = async (): Promise<string[]> => {
  console.log('[appSecurityService] checkSecurityViolations called');
  return appSecurityService.checkSecurityViolations();
};
