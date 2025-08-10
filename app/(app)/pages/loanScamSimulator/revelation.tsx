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
  TriangleAlert as AlertTriangle,
  Circle as XCircle,
  Shield,
  RotateCcw,
  ArrowLeft,
} from "lucide-react-native";

export default function RevelationScreen() {
  const handleRestart = () => {
    router.replace("/(app)/(tabs)");
  };

  const redFlags = [
    "Guaranteed approval without credit checks",
    "Unusually low interest rates (3.5%)",
    "Upfront processing fee demanded",
    "No physical office address provided",
    "Pressure tactics with time limits",
    "WhatsApp document submission",
    "Instant approval without verification",
    "No proper banking license verification",
  ];

  const lessons = [
    "Never pay processing fees upfront for any loan",
    "Always verify lender's physical address and credentials",
    "Check for proper RBI registration and licenses",
    "Be suspicious of guaranteed approval claims",
    "Compare offers from multiple legitimate banks",
    "Read all terms and conditions carefully",
    "Never share sensitive documents via WhatsApp",
    "Take time to research - avoid pressure tactics",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <XCircle size={60} color="#ffffff" />
        <Text style={styles.headerTitle}>YOU'VE BEEN SCAMMED!</Text>
        <Text style={styles.headerSubtitle}>
          This was a loan scam simulation
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scamAlert}>
          <AlertTriangle size={40} color="#dc2626" />
          <View style={styles.scamAlertContent}>
            <Text style={styles.scamAlertTitle}>SIMULATION COMPLETE</Text>
            <Text style={styles.scamAlertText}>
              You just experienced a typical loan scam. In reality, you would
              have lost ₹1,999 and received no loan. The scammer would disappear
              with your money and personal information.
            </Text>
          </View>
        </View>

        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>💸 Real Impact of This Scam</Text>
          <View style={styles.impactList}>
            <Text style={styles.impactItem}>
              • Lost ₹1,999 with no loan received
            </Text>
            <Text style={styles.impactItem}>
              • Personal documents compromised
            </Text>
            <Text style={styles.impactItem}>• Identity theft risk</Text>
            <Text style={styles.impactItem}>
              • Emotional and financial stress
            </Text>
            <Text style={styles.impactItem}>
              • Damaged credit score from fake applications
            </Text>
          </View>
        </View>

        <View style={styles.redFlagsSection}>
          <Text style={styles.sectionTitle}>🚩 Red Flags You Missed</Text>
          <Text style={styles.sectionDescription}>
            Here are the warning signs that should have alerted you:
          </Text>
          {redFlags.map((flag, index) => (
            <View key={index} style={styles.redFlagItem}>
              <AlertTriangle size={16} color="#dc2626" />
              <Text style={styles.redFlagText}>{flag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.lessonsSection}>
          <Shield size={24} color="#16a34a" />
          <Text style={styles.sectionTitle}>🛡️ How to Protect Yourself</Text>
          <Text style={styles.sectionDescription}>
            Follow these guidelines to avoid loan scams:
          </Text>
          {lessons.map((lesson, index) => (
            <View key={index} style={styles.lessonItem}>
              <Text style={styles.lessonNumber}>{index + 1}.</Text>
              <Text style={styles.lessonText}>{lesson}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statisticsSection}>
          <Text style={styles.sectionTitle}>📊 Loan Scam Statistics</Text>
          <View style={styles.statsList}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>₹200+ Crores</Text>
              <Text style={styles.statLabel}>Lost to loan scams in 2023</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50,000+</Text>
              <Text style={styles.statLabel}>Indians scammed annually</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>₹4,000</Text>
              <Text style={styles.statLabel}>Average loss per victim</Text>
            </View>
          </View>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>🆘 Need Help?</Text>
          <Text style={styles.helpText}>
            If you've been a victim of a loan scam:
          </Text>
          <View style={styles.helpContacts}>
            <Text style={styles.helpContact}>📞 Cybercrime Helpline: 1930</Text>
            <Text style={styles.helpContact}>
              🌐 Report online: cybercrime.gov.in
            </Text>
            <Text style={styles.helpContact}>
              📧 RBI Complaints: complaints@rbi.org.in
            </Text>
            <Text style={styles.helpContact}>
              🏦 Contact your bank immediately
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <ArrowLeft size={20} color="#ffffff" />
          <Text style={styles.restartButtonText}>Go Back</Text>
        </TouchableOpacity>

        <View style={styles.educationNote}>
          <Text style={styles.educationText}>
            💡 Share this simulation with friends and family to help them
            recognize and avoid loan scams. Education is the best defense
            against financial fraud.
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
    backgroundColor: "#dc2626",
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 12,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fca5a5",
    marginTop: 4,
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  scamAlert: {
    backgroundColor: "#fef2f2",
    borderWidth: 2,
    borderColor: "#dc2626",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  scamAlertContent: {
    flex: 1,
    marginLeft: 16,
  },
  scamAlertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 8,
  },
  scamAlertText: {
    fontSize: 16,
    color: "#7f1d1d",
    lineHeight: 24,
  },
  impactSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 16,
    lineHeight: 22,
  },
  impactList: {
    paddingLeft: 8,
  },
  impactItem: {
    fontSize: 16,
    color: "#7f1d1d",
    marginBottom: 8,
    lineHeight: 22,
  },
  redFlagsSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  redFlagItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingLeft: 8,
  },
  redFlagText: {
    flex: 1,
    fontSize: 16,
    color: "#92400e",
    marginLeft: 12,
    lineHeight: 22,
  },
  lessonsSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingLeft: 8,
  },
  lessonNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16a34a",
    marginRight: 8,
    minWidth: 24,
  },
  lessonText: {
    flex: 1,
    fontSize: 16,
    color: "#15803d",
    lineHeight: 22,
  },
  statisticsSection: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statsList: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#1e3a8a",
    textAlign: "center",
    lineHeight: 16,
  },
  helpSection: {
    backgroundColor: "#16a34a",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  helpText: {
    fontSize: 16,
    color: "#dcfce7",
    marginBottom: 12,
  },
  helpContacts: {
    paddingLeft: 8,
  },
  helpContact: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 6,
    lineHeight: 20,
  },
  restartButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  restartButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  educationNote: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  educationText: {
    fontSize: 14,
    color: "#1e40af",
    textAlign: "center",
    lineHeight: 20,
  },
});
