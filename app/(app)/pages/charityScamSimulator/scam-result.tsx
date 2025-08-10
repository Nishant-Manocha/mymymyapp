import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  TriangleAlert as AlertTriangle,
  Circle as XCircle,
  Chrome as Home,
  BookOpen,
  Shield,
} from "lucide-react-native";

export default function ScamResultScreen() {
  const params = useLocalSearchParams();
  const { type, amount, title } = params;

  const getScamDetails = () => {
    switch (type) {
      case "medical":
        return {
          mainWarning: "You just fell for a medical emergency scam!",
          consequences: [
            "Your ₹" + amount + " donation never reached any child",
            "The emotional story about Anaya was completely fabricated",
            "Your payment details may have been captured by fraudsters",
            "The fake charity will likely contact you for more donations",
            "Your personal information could be sold to other scammers",
          ],
          howItWorks: [
            "Scammers create emotional stories with stock photos",
            "Fake progress bars and donor counts create urgency",
            "Medical documents are forged or stolen from real cases",
            "Multiple fake campaigns run simultaneously",
            "Funds disappear into criminal accounts",
          ],
        };
      case "disaster":
        return {
          mainWarning: "You were tricked by a disaster relief scam!",
          consequences: [
            "Your ₹" + amount + " went to criminals, not disaster victims",
            "The Uttarakhand flood scenario was fake or exaggerated",
            "Trust indicators were fabricated to appear legitimate",
            "Real disaster victims received no help from your donation",
            "Your generosity was exploited for criminal gain",
          ],
          howItWorks: [
            "Scammers exploit real disasters with fake relief campaigns",
            "Urgent language and time pressure prevent careful verification",
            "Fake registration numbers and certifications are displayed",
            "Real disaster photos are stolen and reused",
            "Multiple fake websites are created for the same disaster",
          ],
        };
      case "qr":
        return {
          mainWarning: "You scanned a malicious QR code!",
          consequences: [
            "Your ₹500 payment went to a fake merchant account",
            'The UPI ID "donate@childrenaid.com" was fraudulent',
            "No legitimate charity received your donation",
            "Your UPI transaction history is now known to scammers",
            "Additional fraudulent QR codes may be sent to you",
          ],
          howItWorks: [
            "Fake QR codes are generated with criminal UPI IDs",
            "Legitimate charity names are used to fool victims",
            "QR codes are shared through social media and messaging",
            "Payment apps cannot verify the legitimacy of merchants",
            "Once scanned, payments are processed immediately",
          ],
        };
      case "comparison":
        return {
          mainWarning: "You identified the fake donation website!",
          consequences: [
            "Good job! You avoided falling for the scam",
            "The fake website had multiple red flags you spotted",
            "Your awareness helped you make the right choice",
            "You protected your money and personal information",
            "You can help others by sharing this knowledge",
          ],
          howItWorks: [
            "Fake charity websites copy legitimate organizations",
            "Poor security (no SSL) is a major red flag",
            "Lack of registration details indicates fraud",
            "Excessive urgency and emotional manipulation",
            "No transparency about fund usage or impact",
          ],
        };
      default:
        return {
          mainWarning: "Scam detected!",
          consequences: ["Unknown scam type"],
          howItWorks: ["Unknown mechanism"],
        };
    }
  };

  const scamDetails = getScamDetails();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.resultHeader}>
            {type === "comparison" ? (
              <Shield size={64} color="#10B981" />
            ) : (
              <XCircle size={64} color="#EF4444" />
            )}
            <Text
              style={[
                styles.resultTitle,
                type === "comparison"
                  ? styles.successTitle
                  : styles.failureTitle,
              ]}
            >
              {type === "comparison" ? "Well Done!" : "Scam Alert!"}
            </Text>
            <Text style={styles.resultSubtitle}>{scamDetails.mainWarning}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {type === "comparison"
                ? "✅ You Avoided:"
                : "❌ What Just Happened:"}
            </Text>
            {scamDetails.consequences.map((consequence, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{consequence}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔍 How This Scam Works:</Text>
            {scamDetails.howItWorks.map((mechanism, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{mechanism}</Text>
              </View>
            ))}
          </View>

          <View style={styles.protectionTips}>
            <Text style={styles.protectionTitle}>
              🛡️ How to Protect Yourself:
            </Text>
            <Text style={styles.protectionText}>
              • Always verify charity registration numbers{"\n"}• Look for
              secure websites (https://) with contact details{"\n"}• Research
              the organization online before donating{"\n"}• Be skeptical of
              urgent emotional appeals{"\n"}• Use official charity websites
              directly{"\n"}• Check charity ratings on sites like GuideStar
              {"\n"}• Never scan QR codes from unverified sources{"\n"}• Be wary
              of excessive emotional manipulation
            </Text>
          </View>

          <View style={styles.realityCheck}>
            <AlertTriangle size={24} color="#F59E0B" />
            <View style={styles.realityContent}>
              <Text style={styles.realityTitle}>Reality Check</Text>
              <Text style={styles.realityText}>
                {type === "comparison"
                  ? "Your vigilance paid off! By recognizing the red flags, you protected yourself and can help others avoid similar scams."
                  : "This was a simulation, but millions of people lose money to similar scams every year. Real victims often lose their savings and the intended beneficiaries never receive help."}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => router.push("/pages/charityScamSimulator")}
            >
              <Home size={20} color="#FFFFFF" />
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.learnButton}
              onPress={() => router.push("/education")}
            >
              <BookOpen size={20} color="#3B82F6" />
              <Text style={styles.learnButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
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
  content: {
    padding: 20,
  },
  resultHeader: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  successTitle: {
    color: "#10B981",
  },
  failureTitle: {
    color: "#EF4444",
  },
  resultSubtitle: {
    fontSize: 18,
    color: "#374151",
    textAlign: "center",
    lineHeight: 26,
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
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    color: "#6B7280",
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
    lineHeight: 24,
  },
  protectionTips: {
    backgroundColor: "#F0F9FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  protectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 12,
  },
  protectionText: {
    fontSize: 16,
    color: "#1E40AF",
    lineHeight: 24,
  },
  realityCheck: {
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  realityContent: {
    marginLeft: 12,
    flex: 1,
  },
  realityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 8,
  },
  realityText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  actionButtons: {
    gap: 12,
  },
  homeButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  learnButton: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  learnButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
