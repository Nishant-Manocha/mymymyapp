import React from "react";
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
  Shield,
  CircleCheck as CheckCircle,
  TriangleAlert as AlertTriangle,
  Eye,
} from "lucide-react-native";

export default function EducationScreen() {
  const legitimatePlatforms = [
    {
      name: "GiveIndia",
      description: "India's largest donation platform with verified NGOs",
      verification: "12A and 80G certified organizations",
    },
    {
      name: "Ketto",
      description: "Crowdfunding platform with medical and social causes",
      verification: "KYC verified campaigns with document validation",
    },
    {
      name: "Milaap",
      description: "Medical crowdfunding with transparency features",
      verification: "Real-time updates and fund utilization reports",
    },
    {
      name: "Fundrazr",
      description: "Social fundraising with community verification",
      verification: "Bank account verification and social validation",
    },
  ];

  const verificationSteps = [
    {
      title: "Check Registration",
      description:
        "Verify charity registration number on official government websites",
      icon: "📋",
    },
    {
      title: "Research Online",
      description:
        "Search for reviews, complaints, and ratings on multiple platforms",
      icon: "🔍",
    },
    {
      title: "Contact Directly",
      description:
        "Call or visit the organization directly to verify the campaign",
      icon: "📞",
    },
    {
      title: "Check Transparency",
      description:
        "Look for detailed fund utilization reports and regular updates",
      icon: "📊",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scam Prevention Guide</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Shield size={48} color="#10B981" />
            <Text style={styles.heroTitle}>Stay Safe While Donating</Text>
            <Text style={styles.heroSubtitle}>
              Learn how to identify legitimate charities and avoid donation
              scams
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚨 Common Scam Tactics</Text>

            <View style={styles.scamTactic}>
              <AlertTriangle size={20} color="#EF4444" />
              <View style={styles.tacticContent}>
                <Text style={styles.tacticTitle}>Emotional Manipulation</Text>
                <Text style={styles.tacticDescription}>
                  Heart-wrenching stories with urgent deadlines to pressure
                  immediate donations
                </Text>
              </View>
            </View>

            <View style={styles.scamTactic}>
              <AlertTriangle size={20} color="#EF4444" />
              <View style={styles.tacticContent}>
                <Text style={styles.tacticTitle}>Fake Documentation</Text>
                <Text style={styles.tacticDescription}>
                  Forged medical reports, fake registration certificates, and
                  stolen photos
                </Text>
              </View>
            </View>

            <View style={styles.scamTactic}>
              <AlertTriangle size={20} color="#EF4444" />
              <View style={styles.tacticContent}>
                <Text style={styles.tacticTitle}>Urgency Pressure</Text>
                <Text style={styles.tacticDescription}>
                  Limited time offers and countdown timers to prevent careful
                  verification
                </Text>
              </View>
            </View>

            <View style={styles.scamTactic}>
              <AlertTriangle size={20} color="#EF4444" />
              <View style={styles.tacticContent}>
                <Text style={styles.tacticTitle}>False Progress</Text>
                <Text style={styles.tacticDescription}>
                  Fake donation counters and fabricated supporter comments
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✅ Verification Steps</Text>
            {verificationSteps.map((step, index) => (
              <View key={index} style={styles.verificationStep}>
                <Text style={styles.stepIcon}>{step.icon}</Text>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔒 Legitimate Platforms</Text>
            <Text style={styles.sectionSubtitle}>
              These platforms have verification processes and accountability
              measures:
            </Text>
            {legitimatePlatforms.map((platform, index) => (
              <View key={index} style={styles.platformCard}>
                <CheckCircle size={20} color="#10B981" />
                <View style={styles.platformContent}>
                  <Text style={styles.platformName}>{platform.name}</Text>
                  <Text style={styles.platformDescription}>
                    {platform.description}
                  </Text>
                  <Text style={styles.platformVerification}>
                    {platform.verification}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Red Flags Checklist</Text>

            <View style={styles.checklistItem}>
              <Text style={styles.checklistText}>
                ❌ No contact information or vague details
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.checklistText}>
                ❌ Pressure for immediate donation
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.checklistText}>
                ❌ Spelling/grammar mistakes in content
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.checklistText}>
                ❌ No registration or tax exemption details
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.checklistText}>
                ❌ Generic photos or stolen images
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.checklistText}>
                ❌ No transparency about fund usage
              </Text>
            </View>
            <View style={styles.checklistItem}>
              <Text style={styles.checklistText}>
                ❌ Requests for cryptocurrency payments
              </Text>
            </View>
          </View>

          <View style={styles.emergencyTips}>
            <Eye size={24} color="#3B82F6" />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>
                Emergency Donation Guidelines
              </Text>
              <Text style={styles.emergencyText}>
                During disasters or urgent situations:{"\n\n"}• Donate to
                established relief organizations{"\n"}• Avoid newly created
                campaign pages{"\n"}• Verify news through multiple sources{"\n"}
                • Use official disaster relief websites{"\n"}• Consider donating
                to local government funds
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push("/pages/charityScamSimulator")}
          >
            <Text style={styles.homeButtonText}>Back to Scenarios</Text>
          </TouchableOpacity>
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
  heroSection: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 12,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 24,
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  scamTactic: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  tacticContent: {
    marginLeft: 12,
    flex: 1,
  },
  tacticTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  tacticDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  verificationStep: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  stepIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  platformCard: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  platformContent: {
    marginLeft: 12,
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  platformDescription: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 4,
  },
  platformVerification: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "500",
  },
  checklistItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  checklistText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  emergencyTips: {
    backgroundColor: "#F0F9FF",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  emergencyContent: {
    marginLeft: 12,
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
  homeButton: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
