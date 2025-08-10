import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Smartphone,
  Wifi,
  Shield,
  TriangleAlert as AlertTriangle,
  ArrowRight,
  CircleCheck as CheckCircle,
} from "lucide-react-native";

export default function SimCloningScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Gathering your phone information...",
    "Requesting duplicate SIM from carrier...",
    "Cloning your phone number...",
    "Redirecting all OTPs and calls...",
    "Gaining access to your accounts...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Smartphone size={40} color="#F56565" />
        <Text style={styles.title}>SIM Cloning in Progress</Text>
        <Text style={styles.subtitle}>Your identity is being compromised</Text>
      </View>

      <View style={styles.processContainer}>
        <Text style={styles.processTitle}>Scammer's Process:</Text>

        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View
              style={[
                styles.stepIcon,
                index <= currentStep
                  ? styles.stepIconActive
                  : styles.stepIconInactive,
              ]}
            >
              {index < currentStep ? (
                <CheckCircle size={16} color="#38A169" />
              ) : (
                <Text style={styles.stepNumber}>{index + 1}</Text>
              )}
            </View>
            <Text
              style={[
                styles.stepText,
                index <= currentStep
                  ? styles.stepTextActive
                  : styles.stepTextInactive,
              ]}
            >
              {step}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.explanationBox}>
        <Shield size={24} color="#4299E1" />
        <Text style={styles.explanationTitle}>How SIM Cloning Works:</Text>
        <Text style={styles.explanationText}>
          1. Scammers use your personal information (name, address, ID numbers)
          to request a duplicate SIM from your mobile carrier
        </Text>
        <Text style={styles.explanationText}>
          2. They claim you've lost your original SIM card
        </Text>
        <Text style={styles.explanationText}>
          3. Once approved, they receive a new SIM with your number
        </Text>
        <Text style={styles.explanationText}>
          4. All your calls, SMS, and OTPs now go to their device
        </Text>
      </View>

      <View style={styles.impactBox}>
        <AlertTriangle size={24} color="#F56565" />
        <Text style={styles.impactTitle}>Immediate Impact:</Text>
        <Text style={styles.impactItem}>
          📱 Your phone loses network connectivity
        </Text>
        <Text style={styles.impactItem}>
          💳 Bank OTPs redirected to scammer
        </Text>
        <Text style={styles.impactItem}>
          🔐 Two-factor authentication bypassed
        </Text>
        <Text style={styles.impactItem}>
          📧 Email and social media accounts at risk
        </Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("/pages/identityTheftSimulator/loan-fraud")}
      >
        <Text style={styles.continueButtonText}>See What Happens Next</Text>
        <ArrowRight size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.preventionTip}>
        <Wifi size={20} color="#38A169" />
        <Text style={styles.preventionText}>
          Prevention: Contact your carrier immediately if you lose network
          connectivity unexpectedly
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#F56565",
    marginTop: 4,
  },
  processContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  processTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  stepIconActive: {
    backgroundColor: "#E6FFFA",
    borderWidth: 2,
    borderColor: "#38A169",
  },
  stepIconInactive: {
    backgroundColor: "#F7FAFC",
    borderWidth: 2,
    borderColor: "#CBD5E0",
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: "#718096",
  },
  stepText: {
    flex: 1,
    fontSize: 15,
  },
  stepTextActive: {
    color: "#2D3748",
    fontWeight: "500",
  },
  stepTextInactive: {
    color: "#A0AEC0",
  },
  explanationBox: {
    backgroundColor: "#E6F3FF",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4299E1",
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B6CB0",
    marginTop: 8,
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 14,
    color: "#2B6CB0",
    lineHeight: 20,
    marginBottom: 8,
  },
  impactBox: {
    backgroundColor: "#FED7D7",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F56565",
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#C53030",
    marginTop: 8,
    marginBottom: 12,
  },
  impactItem: {
    fontSize: 14,
    color: "#C53030",
    lineHeight: 22,
    marginBottom: 6,
  },
  continueButton: {
    backgroundColor: "#F56565",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  preventionTip: {
    backgroundColor: "#E6FFFA",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#38B2AC",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  preventionText: {
    fontSize: 14,
    color: "#234E52",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
