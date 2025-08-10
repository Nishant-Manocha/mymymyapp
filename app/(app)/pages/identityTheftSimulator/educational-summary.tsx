import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Shield,
  TriangleAlert as AlertTriangle,
  CircleCheck as CheckCircle,
  BookOpen,
  Chrome as Home,
} from "lucide-react-native";

export default function EducationalSummaryScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Shield size={48} color="#38A169" />
        <Text style={styles.title}>Educational Summary</Text>
        <Text style={styles.subtitle}>Learn to Protect Yourself</Text>
      </View>

      <View style={styles.section}>
        <AlertTriangle size={24} color="#F56565" />
        <Text style={styles.sectionTitle}>What You Just Witnessed:</Text>
        <Text style={styles.content}>
          This simulation demonstrated how easily identity theft can occur
          through a chain of seemingly innocent actions:
        </Text>
        <Text style={styles.bulletPoint}>
          • Sharing personal information on fake contests
        </Text>
        <Text style={styles.bulletPoint}>
          • Falling for fake bank verification calls
        </Text>
        <Text style={styles.bulletPoint}>
          • SIM cloning using your identity documents
        </Text>
        <Text style={styles.bulletPoint}>
          • Multiple loans taken in your name
        </Text>
        <Text style={styles.bulletPoint}>
          • Financial damage worth lakhs of rupees
        </Text>
      </View>

      <View style={styles.section}>
        <CheckCircle size={24} color="#38A169" />
        <Text style={styles.sectionTitle}>How to Protect Yourself:</Text>

        <View style={styles.protectionItem}>
          <Text style={styles.protectionTitle}>📄 Document Safety</Text>
          <Text style={styles.protectionText}>
            Never share Aadhaar, PAN, or other ID documents on unverified
            websites, even for contests or job applications.
          </Text>
        </View>

        <View style={styles.protectionItem}>
          <Text style={styles.protectionTitle}>📞 Phone Call Verification</Text>
          <Text style={styles.protectionText}>
            Banks never ask for sensitive information over phone. Always hang up
            and call the official number directly.
          </Text>
        </View>

        <View style={styles.protectionItem}>
          <Text style={styles.protectionTitle}>📱 SIM Security</Text>
          <Text style={styles.protectionText}>
            If your phone suddenly loses network, immediately contact your
            carrier. Set up a PIN/password for SIM-related requests.
          </Text>
        </View>

        <View style={styles.protectionItem}>
          <Text style={styles.protectionTitle}>💳 Credit Monitoring</Text>
          <Text style={styles.protectionText}>
            Regularly check your credit score and loan history. Set up alerts
            for any new credit applications.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <BookOpen size={24} color="#4299E1" />
        <Text style={styles.sectionTitle}>Red Flags to Watch For:</Text>
        <Text style={styles.redFlag}>
          🚩 Unsolicited calls about prizes or winnings
        </Text>
        <Text style={styles.redFlag}>
          🚩 Requests for immediate document submission
        </Text>
        <Text style={styles.redFlag}>
          🚩 Pressure to act quickly without verification time
        </Text>
        <Text style={styles.redFlag}>
          🚩 Asking for OTPs or banking details over phone
        </Text>
        <Text style={styles.redFlag}>
          🚩 Unofficial email addresses or phone numbers
        </Text>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Real-World Impact</Text>
        <Text style={styles.stat}>
          ₹1,200+ Crores lost to identity theft in India annually
        </Text>
        <Text style={styles.stat}>
          85% of victims never recover their full losses
        </Text>
        <Text style={styles.stat}>
          Average time to detect fraud: 6-12 months
        </Text>
      </View>

      <View style={styles.emergencyBox}>
        <AlertTriangle size={20} color="#F56565" />
        <Text style={styles.emergencyTitle}>If You Become a Victim:</Text>
        <Text style={styles.emergencyStep}>
          1. Contact your bank and freeze all accounts immediately
        </Text>
        <Text style={styles.emergencyStep}>
          2. File a police complaint (cyber crime cell)
        </Text>
        <Text style={styles.emergencyStep}>
          3. Inform credit bureaus (CIBIL, Experian)
        </Text>
        <Text style={styles.emergencyStep}>
          4. Contact mobile carrier to secure your SIM
        </Text>

        <Text style={styles.emergencyStep}>
          5. Monitor all financial statements closely
        </Text>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/(app)/(tabs)")}
      >
        <Home size={20} color="#FFFFFF" />
        <Text style={styles.homeButtonText}>Return to Home</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Share this knowledge with family and friends to protect them from
          identity theft.
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    marginTop: 4,
  },
  section: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginTop: 8,
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 15,
    color: "#4A5568",
    marginBottom: 6,
    paddingLeft: 8,
  },
  protectionItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F0FFF4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9AE6B4",
  },
  protectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#276749",
    marginBottom: 8,
  },
  protectionText: {
    fontSize: 14,
    color: "#276749",
    lineHeight: 20,
  },
  redFlag: {
    fontSize: 15,
    color: "#C53030",
    marginBottom: 8,
    lineHeight: 22,
  },
  statsBox: {
    backgroundColor: "#2D3748",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  stat: {
    fontSize: 14,
    color: "#E2E8F0",
    marginBottom: 8,
    textAlign: "center",
  },
  emergencyBox: {
    backgroundColor: "#FED7D7",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F56565",
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#C53030",
    marginTop: 8,
    marginBottom: 12,
  },
  emergencyStep: {
    fontSize: 14,
    color: "#C53030",
    marginBottom: 6,
    lineHeight: 20,
  },
  homeButton: {
    backgroundColor: "#38A169",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    backgroundColor: "#E6FFFA",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#38B2AC",
  },
  footerText: {
    fontSize: 14,
    color: "#234E52",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
});
