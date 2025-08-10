import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Wifi, Battery, Clock, Smartphone, TriangleAlert as AlertTriangle, Eye } from 'lucide-react-native';

interface SMSSimulationProps {
  onNext: () => void;
}

const { width } = Dimensions.get('window');

const SMSSimulation = ({ onNext }: SMSSimulationProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />
      <View style={styles.phoneFrame}>
        <View style={styles.phone}>
          {/* Status Bar */}
          <View style={styles.statusBar}>
            <Text style={styles.time}>9:41</Text>
            <View style={styles.statusIcons}>
              <Wifi size={12} color="#000" strokeWidth={2} />
              <Text style={styles.signal}>●●●</Text>
              <Battery size={12} color="#000" strokeWidth={2} />
              <Text style={styles.battery}>100%</Text>
            </View>
          </View>

          {/* Messages Header */}
          <View style={styles.messagesHeader}>
            <Text style={styles.messagesTitle}>Messages</Text>
          </View>

          {/* Message Thread */}
          <View style={styles.messageThread}>
            <View style={styles.messageContainer}>
              <View style={styles.avatarContainer}>
                <Smartphone size={16} color="#666" strokeWidth={2} />
              </View>
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.senderName}>PSB-Alert</Text>
                  <Text style={styles.phoneNumber}>+91-9876543210</Text>
                </View>
                <View style={styles.messageBubble}>
                  <Text style={styles.messageText}>
                    [PSB-Alert]: Dear Customer, we have temporarily locked your account due to unusual login attempts.
                    {'\n\n'}
                    Verify immediately at: http://psbverify-alerts.online
                    {'\n\n'}
                    - Punjab & Sind Bank Security Team
                  </Text>
                </View>
                <View style={styles.messageTime}>
                  <Clock size={12} color="#999" strokeWidth={2} />
                  <Text style={styles.timeText}>2 minutes ago</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Educational Overlay */}
          <View style={styles.educationalOverlay}>
            <View style={styles.overlayHeader}>
              <View style={styles.simulationBadge}>
                <AlertTriangle size={16} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.simulationBadgeText}>SIMULATION</Text>
              </View>
            </View>
            <Text style={styles.overlayDescription}>
              This is a fake SMS designed to demonstrate phishing tactics.
            </Text>

            {!showDetails && (
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => setShowDetails(true)}
              >
                <Eye size={16} color="#374151" strokeWidth={2} />
                <Text style={styles.detailsButtonText}>What makes this suspicious?</Text>
              </TouchableOpacity>
            )}

            {showDetails && (
              <View style={styles.detailsCard}>
                <View style={styles.detailsHeader}>
                  <AlertTriangle size={20} color="#DC2626" strokeWidth={2} />
                  <Text style={styles.detailsTitle}>Red Flags Detected</Text>
                </View>
                <View style={styles.flagsList}>
                  <View style={styles.flagItem}>
                    <View style={styles.flagDot} />
                    <Text style={styles.flagText}>Suspicious URL (not official PSB domain)</Text>
                  </View>
                  <View style={styles.flagItem}>
                    <View style={styles.flagDot} />
                    <Text style={styles.flagText}>Creates urgency and panic</Text>
                  </View>
                  <View style={styles.flagItem}>
                    <View style={styles.flagDot} />
                    <Text style={styles.flagText}>Asks to "verify details" via link</Text>
                  </View>
                  <View style={styles.flagItem}>
                    <View style={styles.flagDot} />
                    <Text style={styles.flagText}>Generic greeting "Dear Customer"</Text>
                  </View>
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.nextButton} onPress={onNext}>
              <Text style={styles.nextButtonText}>Click the Suspicious Link (Safe Simulation)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  phoneFrame: {
    backgroundColor: '#1E293B',
    borderRadius: 40,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 24,
  },
  phone: {
    backgroundColor: '#FFF',
    borderRadius: 32,
    width: width * 0.8,
    height: 640,
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
  messagesHeader: {
    backgroundColor: '#007AFF',
    padding: 16,
  },
  messagesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  messageThread: {
    padding: 16,
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  phoneNumber: {
    fontSize: 12,
    color: '#666',
  },
  messageBubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    maxWidth: '90%',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  messageTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  educationalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlayHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  simulationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  simulationBadgeText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '600',
  },
  overlayDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  flagsList: {
    gap: 12,
  },
  flagItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  flagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
    marginTop: 6,
  },
  flagText: {
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 18,
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SMSSimulation;