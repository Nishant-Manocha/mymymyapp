import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  Mail,
  Calendar,
  Clock,
  TriangleAlert as AlertTriangle,
  Eye,
  ArrowRight,
} from "lucide-react-native";

interface EmailSimulationProps {
  onNext: () => void;
}

const EmailSimulation = ({ onNext }: EmailSimulationProps) => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView style={styles.scrollView}>
        {/* Email Client Interface */}
        <View style={styles.emailClient}>
          {/* Email Header */}
          <View style={styles.emailHeader}>
            <View style={styles.headerLeft}>
              <Mail size={24} color="#3B82F6" strokeWidth={2} />
              <Text style={styles.headerTitle}>Gmail</Text>
            </View>
            <Text style={styles.headerRight}>Inbox (1)</Text>
          </View>

          {/* Email Content */}
          <View style={styles.emailContent}>
            <View style={styles.emailCard}>
              {/* Email Header Info */}
              <View style={styles.emailInfo}>
                <View style={styles.emailSubject}>
                  <Text style={styles.subjectText}>
                    🚨 Urgent: Account Verification Required
                  </Text>
                  <View style={styles.suspiciousBadge}>
                    <Text style={styles.suspiciousBadgeText}>SUSPICIOUS</Text>
                  </View>
                </View>
                <Text style={styles.senderEmail}>
                  noreply@punjabandsindbank.in
                </Text>
                <View style={styles.emailMeta}>
                  <View style={styles.metaItem}>
                    <Calendar size={12} color="#666" strokeWidth={2} />
                    <Text style={styles.metaText}>Today</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={12} color="#666" strokeWidth={2} />
                    <Text style={styles.metaText}>3:42 PM</Text>
                  </View>
                </View>
              </View>

              {/* Email Body */}
              <View style={styles.emailBody}>
                <Text style={styles.emailTitle}>
                  🚨 Urgent: Account Verification Required
                </Text>
                <Text style={styles.emailText}>Dear Valued Customer,</Text>
                <Text style={styles.emailText}>
                  We have detected unauthorized login attempts on your Punjab &
                  Sind Bank account. To prevent further misuse, please verify
                  your identity within 12 hours by clicking the button below:
                </Text>
                <Text style={styles.warningText}>
                  Failure to verify may result in account suspension.
                </Text>
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={() =>
                    alert("This would redirect to a fake PSB page!")
                  }
                >
                  <Text style={styles.verifyButtonText}>👉 Verify Now</Text>
                </TouchableOpacity>
                <View style={styles.signature}>
                  <Text style={styles.signatureText}>Sincerely,</Text>
                  <Text style={styles.signatureText}>
                    Punjab & Sind Bank Security Team
                  </Text>
                  <Text style={styles.signatureText}>
                    www.punjabandsindbank.co.in
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Educational Analysis */}
        <View style={styles.analysisCard}>
          <View style={styles.analysisHeader}>
            <View style={styles.analysisTitleContainer}>
              <AlertTriangle size={20} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.analysisTitleText}>Educational Analysis</Text>
            </View>
            <View style={styles.simulationBadge}>
              <Text style={styles.simulationBadgeText}>SIMULATION</Text>
            </View>
          </View>

          {!showAnalysis ? (
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={() => setShowAnalysis(true)}
            >
              <Eye size={16} color="#374151" strokeWidth={2} />
              <Text style={styles.analyzeButtonText}>
                Analyze This Phishing Email
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.analysisContent}>
              <View style={styles.analysisSection}>
                <Text style={styles.sectionTitle}>🚩 Red Flags Found:</Text>
                <Text style={styles.flagItem}>
                  • Fake domain: punjabandsindbank.in (suspicious)
                </Text>
                <Text style={styles.flagItem}>
                  • Urgency tactics: "URGENT", "immediate verification"
                </Text>
                <Text style={styles.flagItem}>
                  • Generic greeting: "Dear Valued Customer"
                </Text>
                <Text style={styles.flagItem}>
                  • Suspicious button: Asking to click to "verify"
                </Text>
              </View>

              <View style={styles.analysisSection}>
                <Text style={styles.sectionTitle}>✅ How to Verify:</Text>
                <Text style={styles.verifyItem}>
                  • Check official PSB domain (psbindia.com)
                </Text>
                <Text style={styles.verifyItem}>
                  • Call PSB customer service: 1800-11-2345
                </Text>
                <Text style={styles.verifyItem}>
                  • Login through official app/website
                </Text>
                <Text style={styles.verifyItem}>
                  • Never click links in suspicious emails
                </Text>
              </View>

              <TouchableOpacity style={styles.continueButton} onPress={onNext}>
                <ArrowRight size={30} color="#FFF" strokeWidth={2} />
                <Text style={styles.continueButtonText}>
                  Continue to Bank Page Simulation
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  scrollView: {
    flex: 1,
  },
  emailClient: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    overflow: "hidden",
  },
  emailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  headerRight: {
    fontSize: 15,
    color: "#6B7280",
  },
  emailContent: {
    padding: 28,
  },
  emailCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    overflow: "hidden",
  },
  emailInfo: {
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  emailSubject: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  subjectText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  suspiciousBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  suspiciousBadgeText: {
    fontSize: 11,
    color: "#FFF",
    fontWeight: "600",
  },
  senderEmail: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 12,
  },
  emailMeta: {
    flexDirection: "row",
    gap: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
  },
  emailBody: {
    padding: 28,
  },
  emailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4444",
    marginBottom: 20,
  },
  emailText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 16,
  },
  warningText: {
    fontSize: 15,
    color: "#EF4444",
    fontWeight: "600",
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 28,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyButtonText: {
    fontSize: 17,
    color: "#FFF",
    fontWeight: "600",
  },
  signature: {
    gap: 6,
  },
  signatureText: {
    fontSize: 13,
    color: "#6B7280",
  },
  analysisCard: {
    backgroundColor: "#1E293B",
    margin: 20,
    padding: 28,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  analysisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  analysisTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  analysisTitleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  simulationBadge: {
    backgroundColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  simulationBadgeText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
  },
  analyzeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  analyzeButtonText: {
    fontSize: 17,
    color: "#374151",
    fontWeight: "600",
  },
  analysisContent: {
    gap: 20,
  },
  analysisSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  flagItem: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 22,
  },
  verifyItem: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 22,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    padding: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 12,
    // gap: 0,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 17,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default EmailSimulation;
