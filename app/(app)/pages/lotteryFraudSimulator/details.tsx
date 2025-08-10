import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  User,
  Lock,
  TriangleAlert as AlertTriangle,
  Shield,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react-native";

export default function DetailsScreen() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    aadhar: "",
    pan: "",
  });
  const [showSensitive, setShowSensitive] = useState(true);
  const [slideAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const showKYCAlert = () => {
    Alert.alert(
      "🚨 KYC Fraud Alert",
      "Scammers collect personal information to commit identity theft. Legitimate lotteries don't need Aadhar/PAN for prize claims!",
      [{ text: "Got it!", style: "default" }]
    );
  };

  const handleSubmit = () => {
    const { name, phone, email, aadhar, pan } = formData;
    if (!name || !phone || !email || !aadhar || !pan) {
      Alert.alert(
        "Error",
        "Please fill all required fields to proceed with verification."
      );
      return;
    }

    Alert.alert(
      "Data Collected!",
      "In a real scam, this information would be used for identity theft. The scammer now has your personal details and can impersonate you.",
      [
        {
          text: "Continue Simulation",
          onPress: () => router.push("/pages/lotteryFraudSimulator/payment"),
          style: "default",
        },
      ]
    );
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3B82F6", "#1D4ED8", "#1E40AF"]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
          >
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Animated.View
              style={[
                styles.header,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-30, 0],
                      }),
                    },
                  ],
                  opacity: slideAnim,
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <User size={56} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>KYC Verification Required</Text>
              <Text style={styles.subtitle}>
                Complete your profile to claim ₹10,00,000
              </Text>
            </Animated.View>

            <View style={styles.securityBadge}>
              <Shield size={24} color="#059669" />
              <Text style={styles.securityText}>
                🔒 100% Secure • SSL Protected
              </Text>
            </View>

            <View style={styles.warningCard}>
              <AlertTriangle size={28} color="#F59E0B" />
              <View style={styles.warningContent}>
                <Text style={styles.warningTitle}>⚠️ Educational Notice</Text>
                <Text style={styles.warningText}>
                  This form simulates data collection tactics used by scammers.
                  Never share personal documents with unknown sources!
                </Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>📋 Personal Information</Text>
              <Text style={styles.formSubtitle}>
                As per RBI guidelines, we need to verify your identity before
                prize disbursement
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.name}
                  onChangeText={(value) => updateField("name", value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+91 9876543210"
                  placeholderTextColor="#9CA3AF"
                  value={formData.phone}
                  onChangeText={(value) => updateField("phone", value)}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your.email@gmail.com"
                  placeholderTextColor="#9CA3AF"
                  value={formData.email}
                  onChangeText={(value) => updateField("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Address</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Complete address for prize delivery"
                  placeholderTextColor="#9CA3AF"
                  value={formData.address}
                  onChangeText={(value) => updateField("address", value)}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.sensitiveSection}>
                <View style={styles.sensitiveHeader}>
                  <Lock size={24} color="#DC2626" />
                  <Text style={styles.sensitiveTitle}>
                    🔐 Identity Verification
                  </Text>
                  <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setShowSensitive(!showSensitive)}
                  >
                    {showSensitive ? (
                      <EyeOff size={20} color="#DC2626" />
                    ) : (
                      <Eye size={20} color="#DC2626" />
                    )}
                  </TouchableOpacity>
                </View>

                {showSensitive && (
                  <>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Aadhar Number *</Text>
                      <TextInput
                        style={[styles.input, styles.sensitiveInput]}
                        placeholder="1234 5678 9012"
                        placeholderTextColor="#9CA3AF"
                        value={formData.aadhar}
                        onChangeText={(value) => updateField("aadhar", value)}
                        keyboardType="number-pad"
                        maxLength={12}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>PAN Number *</Text>
                      <TextInput
                        style={[styles.input, styles.sensitiveInput]}
                        placeholder="ABCDE1234F"
                        placeholderTextColor="#9CA3AF"
                        value={formData.pan}
                        onChangeText={(value) => updateField("pan", value)}
                        autoCapitalize="characters"
                        maxLength={10}
                      />
                    </View>
                  </>
                )}
              </View>

              <View style={styles.trustIndicators}>
                <View style={styles.trustItem}>
                  <Text style={styles.trustIcon}>🔒</Text>
                  <Text style={styles.trustText}>Bank-level security</Text>
                </View>
                <View style={styles.trustItem}>
                  <Text style={styles.trustIcon}>✅</Text>
                  <Text style={styles.trustText}>Government approved</Text>
                </View>
                <View style={styles.trustItem}>
                  <Text style={styles.trustIcon}>🛡️</Text>
                  <Text style={styles.trustText}>Data encrypted</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <LinearGradient
                  colors={["#3B82F6", "#1D4ED8"]}
                  style={styles.submitGradient}
                >
                  <Text style={styles.submitButtonText}>VERIFY & CONTINUE</Text>
                  <ArrowRight size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.scamButton}
                onPress={showKYCAlert}
              >
                <AlertTriangle size={16} color="#EF4444" />
                <Text style={styles.scamButtonText}>
                  🚨 Learn About KYC Fraud
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.disclaimerCard}>
              <Text style={styles.disclaimerTitle}>
                ❓ Why do we need this?
              </Text>
              <View style={styles.reasonsList}>
                <Text style={styles.reason}>
                  • Identity verification for tax purposes
                </Text>
                <Text style={styles.reason}>
                  • Compliance with money laundering laws
                </Text>
                <Text style={styles.reason}>
                  • Secure prize delivery to verified address
                </Text>
                <Text style={styles.reason}>
                  • Bank transfer setup for prize amount
                </Text>
              </View>
              <View style={styles.scamNote}>
                <Text style={styles.scamNoteText}>
                  ⚠️ These are FAKE reasons. Real lotteries use different
                  verification methods.
                </Text>
              </View>
            </View>

            <View style={styles.testimonialMini}>
              <Text style={styles.testimonialText}>
                "Verification took just 2 minutes and I got my money!" - Priya
                S.
              </Text>
              <Text style={styles.fakeNote}>
                ↑ Fake testimonial to build trust
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
    color: "#DBEAFE",
    textAlign: "center",
    fontWeight: "500",
  },
  securityBadge: {
    backgroundColor: "rgba(236, 253, 245, 0.95)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  securityText: {
    color: "#059669",
    fontSize: 16,
    fontWeight: "700",
  },
  warningCard: {
    backgroundColor: "rgba(254, 243, 199, 0.95)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  formSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 28,
    lineHeight: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  sensitiveSection: {
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#FECACA",
  },
  sensitiveHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  sensitiveTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
    flex: 1,
  },
  toggleButton: {
    padding: 8,
  },
  sensitiveInput: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  trustIndicators: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingVertical: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
  },
  trustItem: {
    alignItems: "center",
    flex: 1,
  },
  trustIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  trustText: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "600",
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 16,
    marginTop: 8,
    shadowColor: "#3B82F6",
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
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  scamButton: {
    backgroundColor: "#FEE2E2",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: "#EF4444",
  },
  scamButtonText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
  disclaimerCard: {
    backgroundColor: "rgba(249, 250, 251, 0.95)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  reasonsList: {
    gap: 8,
    marginBottom: 16,
  },
  reason: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  scamNote: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  scamNoteText: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "600",
  },
  testimonialMini: {
    backgroundColor: "rgba(243, 244, 246, 0.95)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  testimonialText: {
    fontSize: 14,
    color: "#4B5563",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 8,
  },
  fakeNote: {
    fontSize: 11,
    color: "#EF4444",
    fontWeight: "600",
  },
});
