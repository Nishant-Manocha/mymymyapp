import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { initializeSecurity, performSecurityCheck, SecurityStatus } from '../utils/securityManager';

interface SecurityContextType {
  isSecurityInitialized: boolean;
  securityStatus: SecurityStatus | null;
  refreshSecurityStatus: () => Promise<void>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [isSecurityInitialized, setIsSecurityInitialized] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize security services
  const initializeSecurityServices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Initializing security services...');
      
      // Initialize security manager
      await initializeSecurity();
      setIsSecurityInitialized(true);

      // Perform initial security check
      const status = await performSecurityCheck();
      setSecurityStatus(status);

      if (!status.isSecure) {
        console.warn('Security violations detected:', status.violations);
        Alert.alert(
          'Security Warning',
          'Security violations detected. Some features may be limited.',
          [{ text: 'OK' }]
        );
      }

      console.log('Security services initialized successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Security initialization failed';
      setError(errorMessage);
      console.error('Security initialization failed:', errorMessage);
      
      Alert.alert(
        'Security Error',
        'Failed to initialize security services. The app may not function properly.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh security status
  const refreshSecurityStatus = async () => {
    try {
      const status = await performSecurityCheck();
      setSecurityStatus(status);
    } catch (err) {
      console.error('Failed to refresh security status:', err);
    }
  };

  // Initialize on component mount
  useEffect(() => {
    initializeSecurityServices();
  }, []);

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ 
          marginTop: 16, 
          fontSize: 16, 
          color: '#333',
          textAlign: 'center'
        }}>
          Initializing Security Services...
        </Text>
        <Text style={{ 
          marginTop: 8, 
          fontSize: 14, 
          color: '#666',
          textAlign: 'center',
          paddingHorizontal: 32
        }}>
          Please wait while we secure your application
        </Text>
      </View>
    );
  }

  // Show error screen if initialization failed
  if (error) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 32
      }}>
        <Text style={{ 
          fontSize: 18, 
          color: '#d32f2f',
          textAlign: 'center',
          marginBottom: 16
        }}>
          Security Initialization Failed
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: '#666',
          textAlign: 'center',
          marginBottom: 24
        }}>
          {error}
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: '#666',
          textAlign: 'center'
        }}>
          Please restart the application or contact support if the problem persists.
        </Text>
      </View>
    );
  }

  // Provide security context
  const contextValue: SecurityContextType = {
    isSecurityInitialized,
    securityStatus,
    refreshSecurityStatus,
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

// Hook to use security context
export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

// Security status indicator component
export const SecurityStatusIndicator: React.FC = () => {
  const { securityStatus } = useSecurity();

  if (!securityStatus) return null;

  const getStatusColor = () => {
    if (securityStatus.isSecure) return '#4caf50';
    if (securityStatus.violations.length > 0) return '#ff9800';
    return '#f44336';
  };

  const getStatusText = () => {
    if (securityStatus.isSecure) return 'Secure';
    if (securityStatus.violations.length > 0) return 'Warning';
    return 'Insecure';
  };

  return (
    <View style={{
      position: 'absolute',
      top: 50,
      right: 16,
      backgroundColor: getStatusColor(),
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      zIndex: 1000,
    }}>
      <Text style={{
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      }}>
        {getStatusText()}
      </Text>
    </View>
  );
};

export default SecurityProvider;
