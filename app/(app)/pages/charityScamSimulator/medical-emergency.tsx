import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Heart, Clock, Share2 } from "lucide-react-native";

export default function MedicalEmergencyScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const donationAmounts = [100, 500, 1000, 2000, 5000];

  const handleDonate = () => {
    if (selectedAmount) {
      router.push({
        pathname: "/pages/charityScamSimulator/scam-result",
        params: {
          type: "medical",
          amount: selectedAmount.toString(),
          title: "Medical Emergency Scam",
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Case</Text>
        <TouchableOpacity>
          <Share2 size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.urgentBadge}>
            <Clock size={16} color="#FFFFFF" />
            <Text style={styles.urgentText}>URGENT</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Help 5-Year-Old Anaya Fight Cancer 💔
          </Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: "67%" }]} />
            </View>
            <Text style={styles.progressText}>
              ₹3,35,000 raised of ₹5,00,000 goal
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>1,247</Text>
              <Text style={styles.statLabel}>Donors</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>2 days</Text>
              <Text style={styles.statLabel}>Left</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>₹1,65,000</Text>
              <Text style={styles.statLabel}>Still needed</Text>
            </View>
          </View>

          <Text style={styles.storyTitle}>Anaya's Story</Text>
          <Text style={styles.storyText}>
            Our little angel Anaya was diagnosed with acute lymphoblastic
            leukemia just 3 months ago. She needs immediate chemotherapy
            treatment at Apollo Hospital, but the cost is beyond our reach.
            {"\n\n"}
            As a daily wage worker, I earn only ₹400 per day. The doctors say we
            have very little time left for the treatment to be effective. Every
            rupee counts and every moment matters.
            {"\n\n"}
            Please help us save our daughter. She hasn't even started school yet
            and dreams of becoming a doctor to help other children like her.
            Your donation, no matter how small, will bring us closer to giving
            Anaya the life she deserves.
            {"\n\n"}
            🙏 Time is running out. Please donate now and share this with your
            friends and family.
          </Text>

          <View style={styles.documentsSection}>
            <Text style={styles.documentsTitle}>Medical Documents</Text>
            <View style={styles.documentItem}>
              <Text style={styles.documentText}>
                📄 Medical Report - Apollo Hospital
              </Text>
            </View>
            <View style={styles.documentItem}>
              <Text style={styles.documentText}>
                💰 Treatment Cost Estimate
              </Text>
            </View>
            <View style={styles.documentItem}>
              <Text style={styles.documentText}>🆔 Aadhar Card - Patient</Text>
            </View>
          </View>

          <Text style={styles.donateTitle}>Choose Donation Amount</Text>
          <View style={styles.amountGrid}>
            {donationAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && styles.selectedAmount,
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text
                  style={[
                    styles.amountText,
                    selectedAmount === amount && styles.selectedAmountText,
                  ]}
                >
                  ₹{amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.donateButton,
              !selectedAmount && styles.donateButtonDisabled,
            ]}
            onPress={handleDonate}
            disabled={!selectedAmount}
          >
            <Heart size={20} color="#FFFFFF" />
            <Text style={styles.donateButtonText}>Donate Now - Save Anaya</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            This is a simulated scam scenario for educational purposes
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  imageContainer: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 250,
  },
  urgentBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  urgentText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
    lineHeight: 32,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#10B981",
  },
  progressText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  storyText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 24,
  },
  documentsSection: {
    marginBottom: 24,
  },
  documentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  documentItem: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  documentText: {
    fontSize: 14,
    color: "#374151",
  },
  donateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  amountButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAmount: {
    backgroundColor: "#EBF8FF",
    borderColor: "#3B82F6",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  selectedAmountText: {
    color: "#3B82F6",
  },
  donateButton: {
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  donateButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  donateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});
