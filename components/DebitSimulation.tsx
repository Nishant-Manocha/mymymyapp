import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DebitSimulationProps {
  onNext: () => void;
}

const { width } = Dimensions.get('window');

const DebitSimulation = ({ onNext }: DebitSimulationProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showPanic, setShowPanic] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 1000);
    const timer2 = setTimeout(() => setShowPanic(true), 3000);
    const timer3 = setTimeout(() => onNext(), 8000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onNext]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.phoneFrame}>
        <View style={styles.phone}>
          {/* Status Bar */}
          <View style={styles.statusBar}>
            <Text style={styles.time}>9:47</Text>
            <View style={styles.statusIcons}>
              <Ionicons name="wifi" size={12} color="#000" />
              <Text style={styles.signal}>●●●</Text>
              <Ionicons name="battery-full" size={12} color="#000" />
              <Text style={styles.battery}>95%</Text>
            </View>
          </View>

          {showPanic && (
            <View style={styles.content}>
              <View style={styles.panicCard}>
                <View style={styles.panicHeader}>
                  <Ionicons name="warning" size={32} color="#DC2626" />
                  <Text style={styles.panicTitle}>😱 The Panic Sets In</Text>
                </View>
                <Text style={styles.panicDescription}>
                  This is the moment victims realize they've been scammed. 
                  ₹24,000 is gone, and it's often very difficult to recover.
                </Text>
              </View>

              <View style={styles.responseCard}>
                <Text style={styles.responseTitle}>Typical Victim Response:</Text>
                <View style={styles.responseList}>
                  <View style={styles.responseItem}>
                    <View style={[styles.responseDot, { backgroundColor: '#DC2626' }]} />
                    <Text style={styles.responseText}>Immediately calls the bank</Text>
                  </View>
                  <View style={styles.responseItem}>
                    <View style={[styles.responseDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={styles.responseText}>Reports to cyber crime</Text>
                  </View>
                  <View style={styles.responseItem}>
                    <View style={[styles.responseDot, { backgroundColor: '#EAB308' }]} />
                    <Text style={styles.responseText}>Blocks all cards and accounts</Text>
                  </View>
                  <View style={styles.responseItem}>
                    <View style={[styles.responseDot, { backgroundColor: '#6B7280' }]} />
                    <Text style={styles.responseText}>Money recovery: Often unsuccessful</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Educational Overlay */}
          <View style={styles.educationalOverlay}>
            <View style={styles.simulationBadge}>
              <Text style={styles.simulationBadgeText}>🎓 SIMULATION</Text>
            </View>
            <Text style={styles.overlayDescription}>
              This represents the devastating moment when victims realize they've lost money to a scam.
            </Text>
            
            <View style={styles.loadingContainer}>
              {showPanic ? (
                <Text style={styles.nextText}>Proceeding to protection tips...</Text>
              ) : (
                <Text style={styles.loadingText}>Loading...</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  phoneFrame: {
    backgroundColor: '#000',
    borderRadius: 32,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  phone: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    width: width * 0.8,
    height: 600,
    overflow: 'hidden',
    position: 'relative',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signal: {
    fontSize: 10,
    color: '#000',
  },
  battery: {
    fontSize: 10,
    color: '#000',
  },
  content: {
    padding: 16,
    gap: 16,
    flex: 1,
  },
  panicCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  panicHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  panicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginTop: 8,
    textAlign: 'center',
  },
  panicDescription: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },
  responseCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  responseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  responseList: {
    gap: 8,
  },
  responseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  responseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  responseText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  educationalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  simulationBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  simulationBadgeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  overlayDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  nextText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
});

export default DebitSimulation;