import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  TriangleAlert as AlertTriangle,
  Shield,
  Eye,
} from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AlertTriangle size={48} color="#FF6B6B" />
        <Text style={styles.title}>The Data Leak</Text>
        <Text style={styles.subtitle}>When Oversharing Costs You</Text>
      </View>

      <View style={styles.warningBox}>
        <Shield size={24} color="#FF9500" />
        <Text style={styles.warningText}>Educational Simulation Only</Text>
        <Text style={styles.warningSubtext}>
          This app demonstrates how identity theft occurs to raise awareness
          about cybersecurity threats.
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Experience a realistic simulation of how personal data can be misused
          through various fraud methods:
        </Text>

        <View style={styles.methodsList}>
          <Text style={styles.methodItem}>• KYC Spoofing</Text>
          <Text style={styles.methodItem}>• SIM Card Cloning</Text>
          <Text style={styles.methodItem}>• Fake Customer Care</Text>
          <Text style={styles.methodItem}>• Identity-based Loan Fraud</Text>
          <Text style={styles.methodItem}>• Fake PAN/Aadhaar Misuse</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push("/pages/identityTheftSimulator/simulation")}
      >
        <Eye size={20} color="#FFFFFF" />
        <Text style={styles.startButtonText}>Start Simulation</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        Remember: Never share personal documents with unverified sources in real
        life.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    marginTop: 8,
    textAlign: "center",
  },
  warningBox: {
    backgroundColor: "#FFF3CD",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFEAA7",
    alignItems: "center",
    marginBottom: 30,
  },
  warningText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#856404",
    marginTop: 8,
  },
  warningSubtext: {
    fontSize: 14,
    color: "#856404",
    textAlign: "center",
    marginTop: 4,
  },
  content: {
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  methodsList: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  methodItem: {
    fontSize: 15,
    color: "#2D3748",
    marginBottom: 8,
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: "#3182CE",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: "#718096",
    textAlign: "center",
    fontStyle: "italic",
  },
});
