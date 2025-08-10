import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import {
  Shield,
  TriangleAlert as AlertTriangle,
  Eye,
  BookOpen,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const scenarios = [
    {
      id: "medical",
      title: "Medical Emergency Scam",
      description: "Child hospital bill emotional manipulation",
      icon: "🏥",
      route: "/pages/charityScamSimulator/medical-emergency",
    },
    {
      id: "disaster",
      title: "Disaster Relief Fraud",
      description: "Fake earthquake/flood relief funds",
      icon: "🌊",
      route: "/pages/charityScamSimulator/disaster-relief",
    },

    {
      id: "qr",
      title: "UPI QR Code Fraud",
      description: "Malicious QR code payment scams",
      icon: "📱",
      route: "/pages/charityScamSimulator/qr-fraud",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* <Shield size={48} color="#3B82F6" /> */}
          <Text style={styles.title}>Help or Hoax?</Text>
          <Text style={styles.subtitle}>
            Charity & Crowdfunding Scam Simulation
          </Text>
        </View>

        <View style={styles.warningCard}>
          <AlertTriangle size={24} color="#F97316" />
          <Text style={styles.warningText}>Educational Purpose Only</Text>
          <Text style={styles.warningSubtext}>
            This app simulates common charity scams to help you recognize and
            avoid them in real life.
          </Text>
        </View>

        <View style={styles.scenariosSection}>
          <Text style={styles.sectionTitle}>Learning Scenarios</Text>
          {scenarios.map((scenario) => (
            <TouchableOpacity
              key={scenario.id}
              style={styles.scenarioCard}
              onPress={() => router.push(scenario.route)}
            >
              <Text style={styles.scenarioIcon}>{scenario.icon}</Text>
              <View style={styles.scenarioContent}>
                <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                <Text style={styles.scenarioDescription}>
                  {scenario.description}
                </Text>
              </View>
              <Eye size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => router.push("/pages/charityScamSimulator/education")}
      >
        <BookOpen size={20} color="#FFFFFF" />
        <Text style={styles.infoButtonText}>Learn About Scam Prevention</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  warningCard: {
    backgroundColor: "#FEF3C7",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  warningText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400E",
    marginTop: 6,
    flex: 1,
  },
  warningSubtext: {
    fontSize: 14,
    color: "#92400E",
    marginTop: 4,
    textAlign: "center",
    flex: 1,
  },
  scenariosSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  scenarioCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scenarioIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  scenarioContent: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  scenarioDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  infoButton: {
    backgroundColor: "#3B82F6",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 0,
  },
  infoButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
