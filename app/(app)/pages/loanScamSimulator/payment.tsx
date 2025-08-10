import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { router } from "expo-router";
import {
  CreditCard,
  Shield,
  Clock,
  CircleCheck as CheckCircle,
} from "lucide-react-native";

export default function PaymentScreen() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    amount: "1999",
  });

  const handlePayment = () => {
    if (
      !paymentData.cardNumber ||
      !paymentData.expiryDate ||
      !paymentData.cvv
    ) {
      Alert.alert("Error", "Please fill all payment details");
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      router.push("/pages/loanScamSimulator/revelation");
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CreditCard size={40} color="#ffffff" />
        <Text style={styles.headerTitle}>Secure Payment</Text>
        <Text style={styles.headerSubtitle}>Complete your loan processing</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Processing Fee Amount</Text>
          <Text style={styles.amountValue}>₹1,999</Text>
          <Text style={styles.amountNote}>
            One-time payment • No hidden charges
          </Text>
        </View>

        <View style={styles.urgencyBanner}>
          <Clock size={20} color="#dc2626" />
          <Text style={styles.urgencyText}>
            ⚡ Pay within 15 minutes to secure your loan!
          </Text>
        </View>

        <View style={styles.paymentForm}>
          <Text style={styles.formTitle}>Payment Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              value={paymentData.cardNumber}
              onChangeText={(text) =>
                setPaymentData({ ...paymentData, cardNumber: text })
              }
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                value={paymentData.expiryDate}
                onChangeText={(text) =>
                  setPaymentData({ ...paymentData, expiryDate: text })
                }
                placeholder="MM/YY"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={paymentData.cvv}
                onChangeText={(text) =>
                  setPaymentData({ ...paymentData, cvv: text })
                }
                placeholder="123"
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              value={paymentData.cardHolder}
              onChangeText={(text) =>
                setPaymentData({ ...paymentData, cardHolder: text })
              }
              placeholder="Enter name as on card"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount to Pay</Text>
            <TextInput
              style={[styles.input, styles.amountInput]}
              value={paymentData.amount}
              onChangeText={(text) =>
                setPaymentData({ ...paymentData, amount: text })
              }
              placeholder="1999"
              keyboardType="numeric"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.securityInfo}>
          <Shield size={24} color="#16a34a" />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>
              🔒 Your payment is 100% secure
            </Text>
            <Text style={styles.securityDescription}>
              Protected by 256-bit SSL encryption. Your card details are safe
              with us.
            </Text>
          </View>
        </View>

        <View style={styles.guaranteeBox}>
          <CheckCircle size={20} color="#16a34a" />
          <Text style={styles.guaranteeText}>
            Money-back guarantee if loan is not disbursed within 24 hours!
          </Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>PAY ₹1,999 & GET LOAN</Text>
        </TouchableOpacity>

        <View style={styles.trustIndicators}>
          <Text style={styles.trustText}>✅ Trusted by 50,000+ customers</Text>
          <Text style={styles.trustText}>✅ RBI approved lender</Text>
          <Text style={styles.trustText}>✅ Instant loan disbursal</Text>
        </View>

        <Text style={styles.disclaimer}>
          By proceeding, you agree to our terms and conditions. This payment
          confirms your loan processing request.
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
  content: {
    padding: 20,
  },
  amountCard: {
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
  amountLabel: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 8,
  },
  amountNote: {
    fontSize: 14,
    color: "#16a34a",
    textAlign: "center",
  },
  urgencyBanner: {
    backgroundColor: "#fef2f2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dc2626",
  },
  urgencyText: {
    color: "#dc2626",
    fontWeight: "bold",
    marginLeft: 8,
  },
  paymentForm: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  amountInput: {
    backgroundColor: "#f9fafb",
    color: "#6b7280",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  securityText: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 14,
    color: "#15803d",
    lineHeight: 20,
  },
  guaranteeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  guaranteeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "600",
  },
  payButton: {
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
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  trustIndicators: {
    alignItems: "center",
    marginBottom: 20,
  },
  trustText: {
    fontSize: 14,
    color: "#16a34a",
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 18,
  },
});
