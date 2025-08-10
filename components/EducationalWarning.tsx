import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EducationalWarningProps {
  onNext: () => void;
  userData: { account: string; otp: string; password: string };
}

const EducationalWarning = ({ onNext, userData }: EducationalWarningProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.warningIcon}>
            <Ionicons name="warning" size={32} color="#FFF" />
          </View>
          <Text style={styles.title}>⚠️ YOU'VE BEEN PHISHED!</Text>
          <View style={styles.simulationBadge}>
            <Text style={styles.simulationBadgeText}>This was a simulated phishing attack</Text>
          </View>
        </View>

        <View style={styles.whatHappenedCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="close-circle" size={20} color="#DC2626" />
            <Text style={styles.cardTitle}>What Just Happened?</Text>
          </View>
          <Text style={styles.cardDescription}>
            You just submitted your sensitive banking information to a <Text style={styles.bold}>fake website</Text>. 
            In a real phishing attack, criminals would now have:
          </Text>
          
          <View style={styles.dataGrid}>
            <View style={styles.dataCard}>
              <Ionicons name="card" size={32} color="#DC2626" style={styles.dataIcon} />
              <Text style={styles.dataTitle}>Your Account Number</Text>
              <Text style={styles.dataDescription}>
                They can use this to target you with more specific attacks
              </Text>
            </View>

            <View style={styles.dataCard}>
              <Ionicons name="eye" size={32} color="#DC2626" style={styles.dataIcon} />
              <Text style={styles.dataTitle}>Your Password</Text>
              <Text style={styles.dataDescription}>
                Complete access to your online banking account
              </Text>
            </View>

            <View style={styles.dataCard}>
              <Ionicons name="warning" size={32} color="#DC2626" style={styles.dataIcon} />
              <Text style={styles.dataTitle}>Your OTP</Text>
              <Text style={styles.dataDescription}>
                Ability to authorize transactions immediately
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.dataSubmittedCard}>
          <Text style={styles.dataSubmittedTitle}>The Data You Submitted (Simulated)</Text>
          <Text style={styles.dataSubmittedSubtitle}>This data was NOT actually transmitted anywhere</Text>
          <View style={styles.dataDisplay}>
            <Text style={styles.dataItem}>Account: {userData.account || '(not entered)'}</Text>
            <Text style={styles.dataItem}>Password: {'*'.repeat(userData.password.length) || '(not entered)'}</Text>
            <Text style={styles.dataItem}>OTP: {userData.otp || '(not entered)'}</Text>
          </View>
        </View>

        <View style={styles.consequencesCard}>
          <Text style={styles.consequencesTitle}>Real-World Consequences</Text>
          <View style={styles.consequencesList}>
            <Text style={styles.consequenceItem}>💰 Immediate unauthorized transactions</Text>
            <Text style={styles.consequenceItem}>🏦 Complete compromise of your bank account</Text>
            <Text style={styles.consequenceItem}>📱 Additional attacks using your personal information</Text>
            <Text style={styles.consequenceItem}>🔐 Potential identity theft</Text>
            <Text style={styles.consequenceItem}>💸 Financial losses that may be difficult to recover</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>See What Happens Next →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF2F2',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  warningIcon: {
    backgroundColor: '#DC2626',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  simulationBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  simulationBadgeText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  whatHappenedCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  cardDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  dataGrid: {
    gap: 16,
  },
  dataCard: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },
  dataIcon: {
    marginBottom: 8,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  dataDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  dataSubmittedCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dataSubmittedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  dataSubmittedSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  dataDisplay: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  dataItem: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#374151',
  },
  consequencesCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  consequencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 16,
  },
  consequencesList: {
    gap: 8,
  },
  consequenceItem: {
    fontSize: 16,
    color: '#92400E',
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default EducationalWarning;