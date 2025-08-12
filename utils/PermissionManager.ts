import { Platform, Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, Permission } from 'react-native-permissions';
import { SECURITY_CONFIG } from './securityConfig';

export class PermissionManager {
  private static instance: PermissionManager;
  
  static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  // Check if permission is granted
  async checkPermission(permission: Permission): Promise<boolean> {
    try {
      const result = await check(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  // Request single permission
  async requestPermission(permission: Permission): Promise<boolean> {
    try {
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  }

  // Request all required permissions
  async requestAllRequiredPermissions(): Promise<boolean> {
    const results: boolean[] = [];

    for (const permission of SECURITY_CONFIG.PERMISSIONS.REQUIRED) {
      const granted = await this.requestPermission(permission as Permission);
      results.push(granted);
    }

    return results.every(result => result === true);
  }

  // Check all required permissions
  async checkAllRequiredPermissions(): Promise<{ [key: string]: boolean }> {
    const results: { [key: string]: boolean } = {};
    
    for (const permission of SECURITY_CONFIG.PERMISSIONS.REQUIRED) {
      results[permission] = await this.checkPermission(permission as Permission);
    }
    
    return results;
  }

  // Check if app has minimum required permissions to function
  async hasMinimumPermissions(): Promise<boolean> {
    const criticalPermissions = [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.CAMERA',
    ];

    for (const permission of criticalPermissions) {
      const granted = await this.checkPermission(permission as Permission);
      if (!granted) return false;
    }

    return true;
  }

  // Get permission status summary
  async getPermissionStatus(): Promise<{
    granted: string[];
    denied: string[];
    blocked: string[];
  }> {
    const status = {
      granted: [] as string[],
      denied: [] as string[],
      blocked: [] as string[],
    };

    for (const permission of SECURITY_CONFIG.PERMISSIONS.REQUIRED) {
      try {
        const result = await check(permission as Permission);
        switch (result) {
          case RESULTS.GRANTED:
            status.granted.push(permission);
            break;
          case RESULTS.DENIED:
            status.denied.push(permission);
            break;
          case RESULTS.BLOCKED:
            status.blocked.push(permission);
            break;
        }
      } catch (error) {
        status.denied.push(permission);
      }
    }

    return status;
  }

  // Show explanation for permission (simplified)
  private showPermissionExplanation(permission: string): void {
    const descriptions: { [key: string]: string } = {
      'android.permission.INTERNET': 'Internet access is required for app functionality and security updates',
      'android.permission.ACCESS_NETWORK_STATE': 'Network state access helps verify secure connections',
      'android.permission.CAMERA': 'Camera access is needed for document scanning and fraud detection',
      'android.permission.READ_EXTERNAL_STORAGE': 'File access is required to scan documents for security threats',
      'android.permission.WRITE_EXTERNAL_STORAGE': 'File writing is needed to save security reports and logs',
      'android.permission.ACCESS_FINE_LOCATION': 'Precise location helps provide location-based security alerts',
      'android.permission.ACCESS_COARSE_LOCATION': 'Approximate location is used for regional security features',
    };
    
    const description = descriptions[permission] || 'This permission is required for app security features';
    
    Alert.alert(
      'Permission Required',
      description,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => this.openAppSettings() }
      ]
    );
  }

  // Open app settings
  openAppSettings(): void {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  }

  // Request permissions with explanations
  async requestPermissionsWithExplanation(): Promise<boolean> {
    const results: boolean[] = [];

    for (const permission of SECURITY_CONFIG.PERMISSIONS.REQUIRED) {
      const granted = await this.requestPermission(permission as Permission);
      results.push(granted);
      
      if (!granted) {
        this.showPermissionExplanation(permission);
      }
    }

    return results.every(result => result === true);
  }
}

export default PermissionManager.getInstance();
