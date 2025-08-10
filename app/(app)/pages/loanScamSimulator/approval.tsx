import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import {
  CircleCheck as CheckCircle,
  CreditCard,
  Clock,
  Zap,
} from "lucide-react-native";

export default function ApprovalScreen() {
  const handlePayNow = () => {
    router.push("/pages/loanScamSimulator/payment");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CheckCircle size={60} color="#ffffff" />
        <Text style={styles.headerTitle}>LOAN APPROVED!</Text>
        <Text style={styles.headerSubtitle}>
          Congratulations! Your dream is now reality
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.approvalCard}>
          <Text style={styles.approvalTitle}>
            🎉 INSTANT APPROVAL CONFIRMED
          </Text>
          <Text style={styles.approvalAmount}>₹25,00,000</Text>
          <Text style={styles.approvalText}>has been approved for you!</Text>

          <View style={styles.loanDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Loan Amount:</Text>
              <Text style={styles.detailValue}>₹25,00,000</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Interest Rate:</Text>
              <Text style={styles.detailValue}>3.5% per annum</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Monthly EMI:</Text>
              <Text style={styles.detailValue}>₹8,500</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Loan Tenure:</Text>
              <Text style={styles.detailValue}>20 years</Text>
            </View>
          </View>
        </View>

        <View style={styles.urgentSection}>
          <View style={styles.urgentHeader}>
            <Clock size={24} color="#dc2626" />
            <Text style={styles.urgentTitle}>
              ⚡ URGENT: Complete Payment to Secure Loan
            </Text>
          </View>

          <Text style={styles.urgentDescription}>
            Your loan is approved but needs to be secured immediately! Pay the
            processing fee now to avoid losing this opportunity.
          </Text>

          <View style={styles.timerBox}>
            <Text style={styles.timerText}>
              ⏰ Offer expires in: 23:45 minutes
            </Text>
          </View>

          <View style={styles.feeDetails}>
            <Text style={styles.feeTitle}>Processing Fee Breakdown:</Text>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Documentation Fee:</Text>
              <Text style={styles.feeValue}>₹999</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Verification Fee:</Text>
              <Text style={styles.feeValue}>₹500</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Insurance Premium:</Text>
              <Text style={styles.feeValue}>₹500</Text>
            </View>
            <View style={[styles.feeRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>₹1,999</Text>
            </View>
          </View>

          <View style={styles.benefitsBox}>
            <Text style={styles.benefitsTitle}>
              ✅ What happens after payment:
            </Text>
            <Text style={styles.benefitItem}>
              • Loan amount credited within 2 hours
            </Text>
            <Text style={styles.benefitItem}>
              • Digital loan agreement sent via email
            </Text>
            <Text style={styles.benefitItem}>
              • EMI starts from next month only
            </Text>
            <Text style={styles.benefitItem}>• No additional charges ever</Text>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
            <CreditCard size={20} color="#ffffff" />
            <Text style={styles.payButtonText}>
              PAY ₹1,999 NOW - SECURE LOAN
            </Text>
            <Zap size={20} color="#ffffff" />
          </TouchableOpacity>

          <Text style={styles.secureText}>
            🔒 100% Secure Payment • SSL Encrypted
          </Text>
        </View>

        <View style={styles.testimonialBox}>
          <Text style={styles.testimonialTitle}>What our customers say:</Text>
          <Text style={styles.testimonialText}>
            "Got my loan in 2 hours after paying the processing fee. Amazing
            service!" - Rajesh K.
          </Text>
          <Text style={styles.testimonialText}>
            "No paperwork hassle, just paid online and got the money!" - Priya
            S.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#16a34a",
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#bbf7d0",
    marginTop: 4,
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  approvalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  approvalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 12,
    textAlign: "center",
  },
  approvalAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 8,
  },
  approvalText: {
    fontSize: 18,
    color: "#1f2937",
    marginBottom: 20,
  },
  loanDetails: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  urgentSection: {
    backgroundColor: "#fef2f2",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#dc2626",
  },
  urgentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  urgentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626",
    marginLeft: 8,
    flex: 1,
  },
  urgentDescription: {
    fontSize: 16,
    color: "#7f1d1d",
    marginBottom: 16,
    lineHeight: 22,
  },
  timerBox: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  timerText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  feeDetails: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  feeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  feeLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  feeValue: {
    fontSize: 14,
    color: "#1f2937",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc2626",
  },
  benefitsBox: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: "#1e3a8a",
    marginBottom: 4,
    lineHeight: 20,
  },
  payButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  secureText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  testimonialBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
  },
  testimonialTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
    fontStyle: "italic",
    lineHeight: 20,
  },
});
