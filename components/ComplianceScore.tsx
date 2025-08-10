import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shield, CheckCircle, AlertCircle, XCircle } from 'lucide-react-native';

interface ComplianceItem {
  name: string;
  status: 'completed' | 'pending' | 'failed';
  score: number;
  description: string;
}

const complianceItems: ComplianceItem[] = [
  {
    name: 'Aadhaar-PAN Linked',
    status: 'completed',
    score: 20,
    description: 'Aadhaar successfully linked with PAN'
  },
  {
    name: 'KYC Verified',
    status: 'completed',
    score: 15,
    description: 'Know Your Customer verification completed'
  },
  {
    name: 'ITR Filed (Previous Year)',
    status: 'completed',
    score: 25,
    description: 'Income Tax Return filed for FY 2023-24'
  },
  {
    name: 'Advance Tax Paid',
    status: 'pending',
    score: 10,
    description: 'Q4 advance tax payment due'
  },
  {
    name: 'TDS Reconciliation Done',
    status: 'completed',
    score: 15,
    description: 'Form 26AS matched with Form 16'
  },
  {
    name: 'Form 16 Uploaded',
    status: 'pending',
    score: 10,
    description: 'Employer certificate pending upload'
  },
  {
    name: 'E-Verification Complete',
    status: 'failed',
    score: 15,
    description: 'ITR e-verification not completed'
  }
];

const ComplianceScore = () => {
  const totalScore = complianceItems.reduce((sum, item) => {
    return sum + (item.status === 'completed' ? item.score : 0);
  }, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#28a745" />;
      case 'pending':
        return <AlertCircle size={20} color="#ffc107" />;
      case 'failed':
        return <XCircle size={20} color="#dc3545" />;
      default:
        return <AlertCircle size={20} color="#6c757d" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { text: '✔ Completed', color: '#28a745', backgroundColor: '#d4edda' };
      case 'pending':
        return { text: '⚠ Pending', color: '#856404', backgroundColor: '#fff3cd' };
      case 'failed':
        return { text: '❗ Action Required', color: '#721c24', backgroundColor: '#f8d7da' };
      default:
        return { text: 'Unknown', color: '#6c757d', backgroundColor: '#e2e3e5' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Shield size={24} color="#0070ba" />
        <Text style={styles.title}>Tax Compliance Score</Text>
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.circularProgress}>
          <Text style={[styles.scoreText, { color: getScoreColor(totalScore) }]}>
            {totalScore}
          </Text>
          <Text style={styles.scoreSubtext}>out of 100</Text>
        </View>
        <Text style={styles.scoreDescription}>
          {totalScore >= 80 ? 'Excellent Compliance' : 
           totalScore >= 60 ? 'Good Compliance' : 
           'Needs Improvement'}
        </Text>
      </View>

      <View style={styles.itemsContainer}>
        {complianceItems.map((item, index) => {
          const badge = getStatusBadge(item.status);
          return (
            <View key={index} style={styles.complianceItem}>
              <View style={styles.itemLeft}>
                {getStatusIcon(item.status)}
                <View style={styles.itemText}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.scorePoints}>+{item.score} pts</Text>
                <View style={[styles.badge, { backgroundColor: badge.backgroundColor }]}>
                  <Text style={[styles.badgeText, { color: badge.color }]}>
                    {badge.text}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Improve Score</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>View Detailed Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.quickActionItem}>
          <AlertCircle size={16} color="#0070ba" />
          <Text style={styles.quickActionText}>Complete e-verification for ITR (+10 pts)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <AlertCircle size={16} color="#0070ba" />
          <Text style={styles.quickActionText}>Upload Form 16 (+15 pts)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <AlertCircle size={16} color="#0070ba" />
          <Text style={styles.quickActionText}>Pay advance tax (+10 pts)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  circularProgress: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreSubtext: {
    fontSize: 12,
    color: '#6c757d',
  },
  scoreDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemsContainer: {
    marginBottom: 24,
  },
  complianceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#6c757d',
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  scorePoints: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionButtons: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#0070ba',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  quickActions: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0070ba',
    marginBottom: 12,
  },
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#0070ba',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
});

export default ComplianceScore;