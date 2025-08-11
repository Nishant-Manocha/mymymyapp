import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { getSSLPinningStatus } from '../utils/securityManager';
import { quickSSLPinningTest } from '../utils/testSSLPinning';

interface SSLPinningStatus {
  enabled: boolean;
  status: string;
  certificates?: Array<{
    filename: string;
    fingerprint: string;
  }>;
  error?: string;
}

export default function SSLPinningTest() {
  const [status, setStatus] = useState<SSLPinningStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkStatus = async () => {
    try {
      setIsLoading(true);
      const sslStatus = getSSLPinningStatus();
      setStatus(sslStatus);
    } catch (error) {
      console.error('Error checking SSL pinning status:', error);
      Alert.alert('Error', 'Failed to check SSL pinning status');
    } finally {
      setIsLoading(false);
    }
  };

  const runTest = async () => {
    try {
      setIsLoading(true);
      await quickSSLPinningTest();
      // Wait a bit for the test to complete, then check status
      setTimeout(checkStatus, 2000);
    } catch (error) {
      console.error('Error running SSL pinning test:', error);
      Alert.alert('Error', 'Failed to run SSL pinning test');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SSL Pinning Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        {status ? (
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Text style={styles.label}>Enabled:</Text>
              <Text style={[styles.value, { color: status.enabled ? '#4CAF50' : '#F44336' }]}>
                {status.enabled ? 'Yes' : 'No'}
              </Text>
            </View>
            
            <View style={styles.statusRow}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{status.status}</Text>
            </View>
            
            {status.error && (
              <View style={styles.statusRow}>
                <Text style={styles.label}>Error:</Text>
                <Text style={[styles.value, { color: '#F44336' }]}>{status.error}</Text>
              </View>
            )}
            
            {status.certificates && status.certificates.length > 0 && (
              <View style={styles.certificatesContainer}>
                <Text style={styles.label}>Certificates ({status.certificates.length}):</Text>
                {status.certificates.map((cert, index) => (
                  <View key={index} style={styles.certificateItem}>
                    <Text style={styles.certFilename}>{cert.filename}</Text>
                    <Text style={styles.certFingerprint} numberOfLines={1}>
                      {cert.fingerprint}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading status...</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={checkStatus}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Checking...' : 'Check Status'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.testButton, isLoading && styles.buttonDisabled]}
          onPress={runTest}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Running Test...' : 'Run SSL Pinning Test'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        <Text style={styles.infoText}>
          This component allows you to test the SSL pinning functionality of your FinGuard app.
        </Text>
        <Text style={styles.infoText}>
          • Check Status: Shows current SSL pinning configuration and loaded certificates
        </Text>
        <Text style={styles.infoText}>
          • Run Test: Executes a comprehensive test of the SSL pinning service
        </Text>
        <Text style={styles.infoText}>
          • Monitor the console logs for detailed debugging information
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  statusContainer: {
    gap: 8,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  certificatesContainer: {
    marginTop: 8,
  },
  certificateItem: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  certFilename: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  certFingerprint: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  testButton: {
    backgroundColor: '#4CAF50',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});