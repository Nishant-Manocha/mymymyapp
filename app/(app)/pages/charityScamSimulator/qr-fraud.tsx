import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import {
  ArrowLeft,
  QrCode,
  Smartphone,
  CircleAlert as AlertCircle,
} from "lucide-react-native";

export default function QRFraudScreen() {
  const [scannedQR, setScannedQR] = useState(false);
  const [showPaymentInterface, setShowPaymentInterface] = useState(false);

  const handleQRScan = () => {
    setScannedQR(true);
    setTimeout(() => {
      setShowPaymentInterface(true);
    }, 1000);
  };

  const handlePayment = () => {
    router.push({
      pathname: "/pages/charityScamSimulator/scam-result",
      params: {
        type: "qr",
        amount: "500",
        title: "UPI QR Code Fraud",
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UPI QR Code Donation</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Quick Donation via UPI</Text>
          <Text style={styles.subtitle}>
            Scan the QR code below to make a quick donation of ₹500 for the
            medical emergency case.
          </Text>

          <View style={styles.charityInfo}>
            <Text style={styles.charityTitle}>
              Children's Medical Aid Foundation
            </Text>
            <Text style={styles.charityDescription}>
              Emergency fund for 5-year-old Anaya's cancer treatment
            </Text>
            <View style={styles.amountDisplay}>
              <Text style={styles.amountText}>Amount: ₹500</Text>
            </View>
          </View>

          <View style={styles.qrContainer}>
            <View style={styles.qrCode}>
              <QrCode size={120} color="#1F2937" />
              <Text style={styles.qrLabel}>Scan to Pay ₹500</Text>
            </View>

            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleQRScan}
              disabled={scannedQR}
            >
              <Smartphone size={20} color="#FFFFFF" />
              <Text style={styles.scanButtonText}>
                {scannedQR ? "QR Scanned ✓" : "Tap to Scan QR Code"}
              </Text>
            </TouchableOpacity>
          </View>

          {scannedQR && (
            <View style={styles.scanResult}>
              <Text style={styles.scanResultText}>
                ✅ QR Code scanned successfully!
              </Text>
              <Text style={styles.merchantInfo}>
                Merchant: Children Medical Foundation{"\n"}
                UPI ID: donate@childrenaid.com{"\n"}
                Amount: ₹500
              </Text>
            </View>
          )}

          {showPaymentInterface && (
            <View style={styles.paymentInterface}>
              <Text style={styles.paymentTitle}>UPI Payment</Text>

              <View style={styles.paymentDetails}>
                <Text style={styles.paymentLabel}>Pay To:</Text>
                <Text style={styles.paymentValue}>
                  Children Medical Foundation
                </Text>

                <Text style={styles.paymentLabel}>UPI ID:</Text>
                <Text style={styles.paymentValue}>donate@childrenaid.com</Text>

                <Text style={styles.paymentLabel}>Amount:</Text>
                <Text style={styles.paymentValueAmount}>₹500</Text>
              </View>

              <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
              >
                <Text style={styles.payButtonText}>Pay ₹500</Text>
              </TouchableOpacity>

              <View style={styles.securityNote}>
                <AlertCircle size={16} color="#3B82F6" />
                <Text style={styles.securityText}>
                  Payment secured by UPI protocol
                </Text>
              </View>
            </View>
          )}

          <View style={styles.warningCard}>
            <AlertCircle size={24} color="#F59E0B" />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>QR Code Safety Tips</Text>
              <Text style={styles.warningText}>
                • Always verify the merchant name and UPI ID{"\n"}• Check if the
                organization is registered{"\n"}• Be cautious of QR codes from
                unknown sources{"\n"}• Look for official verification badges
                {"\n"}• Avoid scanning QR codes from social media images
              </Text>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            This is a simulated UPI QR scam for educational purposes
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 24,
  },
  charityInfo: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  charityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  charityDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  amountDisplay: {
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  qrContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrCode: {
    alignItems: "center",
    marginBottom: 20,
  },
  qrLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 12,
  },
  scanButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  scanResult: {
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  scanResultText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#15803D",
    marginBottom: 8,
  },
  merchantInfo: {
    fontSize: 14,
    color: "#166534",
    lineHeight: 20,
  },
  paymentInterface: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  paymentDetails: {
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 12,
  },
  paymentValue: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  paymentValueAmount: {
    fontSize: 20,
    color: "#1F2937",
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  securityText: {
    fontSize: 12,
    color: "#3B82F6",
    marginLeft: 6,
  },
  warningCard: {
    backgroundColor: "#FFFBEB",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  warningContent: {
    marginLeft: 12,
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});
