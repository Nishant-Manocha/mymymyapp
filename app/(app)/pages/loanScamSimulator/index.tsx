import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Building2, Phone, Mail, CreditCard, Zap } from "lucide-react-native";

export default function LoanMessageScreen() {
  const handleApplyNow = () => {
    router.push("/pages/loanScamSimulator/application");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Building2 size={32} color="#ffffff" />
        <Text style={styles.headerTitle}>Quick Cash Finance Ltd.</Text>
        <Text style={styles.headerSubtitle}>
          Your Trusted Financial Partner
        </Text>
      </View>

      <View style={styles.messageContainer}>
        <View style={styles.urgentBadge}>
          <Zap size={16} color="#ffffff" />
          <Text style={styles.urgentText}>🔥 LIMITED TIME OFFER!</Text>
        </View>

        <Text style={styles.congratsTitle}>🎉 CONGRATULATIONS!</Text>
        <Text style={styles.messageText}>
          You have been PRE-APPROVED for a Home Loan of up to
        </Text>
        <Text style={styles.loanAmount}>₹25,00,000</Text>

        <View style={styles.offerDetails}>
          <View style={styles.offerItem}>
            <Text style={styles.offerLabel}>Interest Rate:</Text>
            <Text style={styles.offerValue}>Just 3.5% per annum*</Text>
          </View>
          <View style={styles.offerItem}>
            <Text style={styles.offerLabel}>Monthly EMI:</Text>
            <Text style={styles.offerValue}>Starting ₹8,500 only</Text>
          </View>
          <View style={styles.offerItem}>
            <Text style={styles.offerLabel}>Processing Fee:</Text>
            <Text style={styles.offerValue}>
              ₹1,999 only (Normally ₹25,000)
            </Text>
          </View>
          <View style={styles.offerItem}>
            <Text style={styles.offerLabel}>Approval Time:</Text>
            <Text style={styles.offerValue}>Instant - Within 2 hours!</Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Why Choose Us?</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>✅ 100% Approval Guaranteed</Text>
            <Text style={styles.featureItem}>
              ✅ No Credit Score Check Required
            </Text>
            <Text style={styles.featureItem}>✅ Minimal Documentation</Text>
            <Text style={styles.featureItem}>✅ Same Day Disbursement</Text>
            <Text style={styles.featureItem}>✅ No Hidden Charges</Text>
          </View>
        </View>

        <View style={styles.urgencyContainer}>
          <Text style={styles.urgencyTitle}>
            ⏰ HURRY! Offer Valid Till Midnight
          </Text>
          <Text style={styles.urgencyText}>
            This exclusive pre-approved offer is available for the next few
            hours only. Don't miss this golden opportunity to secure your dream
            home!
          </Text>
        </View>

        <TouchableOpacity style={styles.applyButton} onPress={handleApplyNow}>
          <Text style={styles.applyButtonText}>
            APPLY NOW - GET INSTANT APPROVAL
          </Text>
        </TouchableOpacity>

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Phone size={16} color="#2563eb" />
            <Text style={styles.contactText}>+91 98765 43210</Text>
          </View>
          <View style={styles.contactItem}>
            <Mail size={16} color="#2563eb" />
            <Text style={styles.contactText}>loans@quickcashfinance.com</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          *Terms and conditions apply. Interest rates subject to approval.
        </Text>
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
    backgroundColor: "#2563eb",
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#bfdbfe",
    marginTop: 4,
  },
  messageContainer: {
    padding: 20,
  },
  urgentBadge: {
    backgroundColor: "#dc2626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  urgentText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16a34a",
    textAlign: "center",
    marginBottom: 12,
  },
  messageText: {
    fontSize: 18,
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  loanAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#dc2626",
    textAlign: "center",
    marginBottom: 24,
  },
  offerDetails: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  offerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  offerLabel: {
    fontSize: 16,
    color: "#6b7280",
    flex: 1,
  },
  offerValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    textAlign: "right",
  },
  featuresContainer: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 12,
    textAlign: "center",
  },
  featuresList: {
    alignItems: "flex-start",
  },
  featureItem: {
    fontSize: 16,
    color: "#1e3a8a",
    marginBottom: 8,
    lineHeight: 24,
  },
  urgencyContainer: {
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#f59e0b",
  },
  urgencyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#92400e",
    textAlign: "center",
    marginBottom: 8,
  },
  urgencyText: {
    fontSize: 16,
    color: "#92400e",
    textAlign: "center",
    lineHeight: 22,
  },
  applyButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    fontSize: 14,
    color: "#2563eb",
    marginLeft: 6,
  },
  disclaimer: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});
