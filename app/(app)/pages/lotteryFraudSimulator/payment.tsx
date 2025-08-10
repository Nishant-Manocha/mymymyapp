import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  CreditCard,
  Gift,
  TriangleAlert as AlertTriangle,
  Lock,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react-native";

export default function PaymentScreen() {
  const [selectedFee, setSelectedFee] = useState(1999);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  React.useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const fees = [
    { amount: 499, label: "Processing Fee", popular: false },
    { amount: 1999, label: "Express Processing", popular: true },
    { amount: 2999, label: "VIP Fast Track", popular: false },
  ];

  const showFeeAlert = () => {
    Alert.alert(
      "🚨 Advance Fee Fraud Alert",
      "Legitimate lotteries NEVER ask for upfront fees. This is the core of advance fee fraud - once you pay, scammers disappear with your money!",
      [{ text: "Got it!", style: "default" }]
    );
  };

  const handlePayment = () => {
    setShowGiftCard(true);
    Alert.alert(
      "Payment Method",
      "For security reasons, we only accept payments via Gift Cards. This prevents fraudulent transactions.",
      [{ text: "Continue", style: "default" }]
    );
  };

  const handleGiftCardSubmit = () => {
    if (!giftCardCode) {
      Alert.alert(
        "Error",
        "Please enter the gift card code to complete payment."
      );
      return;
    }

    Alert.alert(
      "Gift Card Scam Complete!",
      "In a real scam, the scammer would immediately redeem this gift card code. Gift cards are untraceable and non-refundable - perfect for scammers!",
      [
        {
          text: "Continue to Support",
          onPress: () => router.push("/pages/lotteryFraudSimulator/support"),
          style: "default",
        },
      ]
    );
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#059669", "#10B981", "#34D399"]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <CreditCard size={56} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>Processing Fee Required</Text>
            <Text style={styles.subtitle}>
              Final step to claim your ₹10,00,000 prize
            </Text>
          </View>

          <Animated.View
            style={[styles.urgencyBar, { transform: [{ scale: pulseAnim }] }]}
          >
            <Clock size={20} color="#EF4444" />
            <Text style={styles.urgencyText}>⏰ Claim expires in 18:23:45</Text>
          </Animated.View>

          <View style={styles.warningCard}>
            <AlertTriangle size={28} color="#F59E0B" />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>
                ⚠️ Advance Fee Fraud Simulation
              </Text>
              <Text style={styles.warningText}>
                This demonstrates how scammers trick victims into paying upfront
                fees. Real lotteries NEVER charge winners!
              </Text>
            </View>
          </View>

          <View style={styles.prizeCard}>
            <Gift size={40} color="#059669" />
            <View style={styles.prizeContent}>
              <Text style={styles.prizeTitle}>Your Prize: ₹10,00,000</Text>
              <Text style={styles.prizeSubtext}>
                Processing fee: ₹{selectedFee.toLocaleString()}
              </Text>
              <Text style={styles.netAmount}>
                Net amount: ₹{(1000000 - selectedFee).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.feeCard}>
            <Text style={styles.feeTitle}>💳 Select Processing Fee</Text>
            <Text style={styles.feeSubtext}>
              Government tax and processing charges as per Income Tax Act
            </Text>

            {fees.map((fee) => (
              <TouchableOpacity
                key={fee.amount}
                style={[
                  styles.feeOption,
                  selectedFee === fee.amount && styles.feeOptionSelected,
                  fee.popular && styles.feeOptionPopular,
                ]}
                onPress={() => setSelectedFee(fee.amount)}
              >
                <View style={styles.feeOptionContent}>
                  <Text style={styles.feeAmount}>₹{fee.amount}</Text>
                  <Text style={styles.feeLabel}>{fee.label}</Text>
                  {fee.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>RECOMMENDED</Text>
                    </View>
                  )}
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedFee === fee.amount && styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.reasonsCard}>
            <Text style={styles.reasonsTitle}>❓ Why is a fee required?</Text>
            <Text style={styles.reason}>
              • Government tax compliance (18% GST)
            </Text>
            <Text style={styles.reason}>
              • Bank transfer processing charges
            </Text>
            <Text style={styles.reason}>
              • Legal documentation and verification
            </Text>
            <Text style={styles.reason}>
              • Insurance and security protocols
            </Text>
            <View style={styles.scamNote}>
              <Text style={styles.scamNoteText}>
                ⚠️ These are FAKE reasons used by scammers to justify illegal
                fees
              </Text>
            </View>
          </View>

          {!showGiftCard ? (
            <>
              <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
              >
                <LinearGradient
                  colors={["#059669", "#047857"]}
                  style={styles.payGradient}
                >
                  <Lock size={20} color="#FFFFFF" />
                  <Text style={styles.payButtonText}>
                    PAY ₹{selectedFee} & CLAIM PRIZE
                  </Text>
                  <ArrowRight size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.scamButton}
                onPress={showFeeAlert}
              >
                <AlertTriangle size={16} color="#EF4444" />
                <Text style={styles.scamButtonText}>
                  🚨 Learn About Advance Fee Fraud
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.giftCardSection}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.95)",
                  "rgba(255, 255, 255, 0.9)",
                ]}
                style={styles.giftCardGradient}
              >
                <Text style={styles.giftCardTitle}>🎁 Pay with Gift Card</Text>
                <Text style={styles.giftCardSubtext}>
                  For your security, we accept payments via Amazon/Google Play
                  gift cards only
                </Text>

                <View style={styles.giftCardSteps}>
                  <Text style={styles.stepTitle}>📋 How to pay:</Text>
                  <Text style={styles.step}>
                    1. Buy ₹{selectedFee} Amazon gift card from nearby store
                  </Text>
                  <Text style={styles.step}>
                    2. Scratch the silver coating to reveal code
                  </Text>
                  <Text style={styles.step}>
                    3. Enter the 16-digit code below
                  </Text>
                  <Text style={styles.step}>
                    4. Your prize will be processed instantly!
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Gift Card Code *</Text>
                  <TextInput
                    style={styles.codeInput}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    placeholderTextColor="#9CA3AF"
                    value={giftCardCode}
                    onChangeText={setGiftCardCode}
                    autoCapitalize="characters"
                    maxLength={19}
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitCodeButton}
                  onPress={handleGiftCardSubmit}
                >
                  <LinearGradient
                    colors={["#DC2626", "#B91C1C"]}
                    style={styles.submitGradient}
                  >
                    <Text style={styles.submitCodeText}>
                      SUBMIT CODE & CLAIM ₹10L
                    </Text>
                    <ArrowRight size={20} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.giftCardWarning}>
                  <AlertTriangle size={24} color="#EF4444" />
                  <Text style={styles.giftCardWarningText}>
                    🚨 Gift Card Scam: Once you share the code, scammers can
                    instantly redeem it. This money is gone forever!
                  </Text>
                </View>
              </LinearGradient>
            </View>
          )}

          <View style={styles.trustSection}>
            <Text style={styles.trustTitle}>🛡️ Why trust us?</Text>
            <View style={styles.trustGrid}>
              <Text style={styles.trustItem}>✅ 50,000+ happy winners</Text>
              <Text style={styles.trustItem}>
                🔒 SSL encrypted transactions
              </Text>
              <Text style={styles.trustItem}>
                🏆 Government certified lottery
              </Text>
              <Text style={styles.trustItem}>💯 100% money-back guarantee</Text>
            </View>
            <Text style={styles.trustNote}>
              ⚠️ All fake trust signals used by scammers
            </Text>
          </View>

          <View style={styles.testimonial}>
            <Text style={styles.testimonialText}>
              "I paid the small fee and got my full prize the same day! Best
              decision ever!" - Amit K.
            </Text>
            <Text style={styles.fakeLabel}>↑ Fake testimonial</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 12,
    borderRadius: 12,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#D1FAE5",
    textAlign: "center",
    fontWeight: "500",
  },
  urgencyBar: {
    backgroundColor: "#FEE2E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
    borderWidth: 2,
    borderColor: "#EF4444",
  },
  urgencyText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "700",
  },
  warningCard: {
    backgroundColor: "rgba(254, 243, 199, 0.95)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  warningContent: {
    flex: 1,
    marginLeft: 16,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 18,
  },
  prizeCard: {
    backgroundColor: "rgba(236, 253, 245, 0.95)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#22C55E",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  prizeContent: {
    marginLeft: 20,
    flex: 1,
  },
  prizeTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#059669",
    marginBottom: 4,
  },
  prizeSubtext: {
    fontSize: 14,
    color: "#DC2626",
    marginBottom: 4,
    fontWeight: "600",
  },
  netAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  feeCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  feeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  feeSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center",
  },
  feeOption: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  feeOptionSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#EBF8FF",
  },
  feeOptionPopular: {
    borderColor: "#059669",
    backgroundColor: "#F0FDF4",
  },
  feeOptionContent: {
    flex: 1,
  },
  feeAmount: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 4,
  },
  feeLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  popularBadge: {
    backgroundColor: "#059669",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  popularText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
  radioButtonSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#3B82F6",
  },
  reasonsCard: {
    backgroundColor: "rgba(243, 244, 246, 0.95)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  reasonsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  reason: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
    lineHeight: 20,
  },
  scamNote: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  scamNoteText: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "600",
  },
  payButton: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  payGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    gap: 12,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  scamButton: {
    backgroundColor: "#FEE2E2",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 8,
    borderWidth: 2,
    borderColor: "#EF4444",
  },
  scamButtonText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
  giftCardSection: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  giftCardGradient: {
    padding: 24,
  },
  giftCardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
  },
  giftCardSubtext: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  giftCardSteps: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  step: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  codeInput: {
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 2,
    fontWeight: "600",
  },
  submitCodeButton: {
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 16,
    gap: 12,
  },
  submitCodeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  giftCardWarning: {
    backgroundColor: "#FEE2E2",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  giftCardWarningText: {
    flex: 1,
    fontSize: 12,
    color: "#DC2626",
    lineHeight: 16,
    fontWeight: "600",
  },
  trustSection: {
    backgroundColor: "rgba(240, 253, 244, 0.95)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  trustTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  trustGrid: {
    gap: 8,
    marginBottom: 12,
  },
  trustItem: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "500",
  },
  trustNote: {
    fontSize: 11,
    color: "#EF4444",
    fontWeight: "600",
    textAlign: "center",
  },
  testimonial: {
    backgroundColor: "rgba(243, 244, 246, 0.95)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  testimonialText: {
    fontSize: 14,
    color: "#4B5563",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  fakeLabel: {
    fontSize: 11,
    color: "#EF4444",
    fontWeight: "600",
  },
});
