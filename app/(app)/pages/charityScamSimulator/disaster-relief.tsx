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
import { ArrowLeft, MapPin, Users, Clock } from "lucide-react-native";

export default function DisasterReliefScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const donationAmounts = [200, 500, 1000, 2500, 5000];

  const handleDonate = () => {
    if (selectedAmount) {
      router.push({
        pathname: "/pages/charityScamSimulator/scam-result",
        params: {
          type: "disaster",
          amount: selectedAmount.toString(),
          title: "Disaster Relief Scam",
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
        <Text style={styles.headerTitle}>Emergency Relief</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.emergencyBadge}>
            <Text style={styles.emergencyText}>🚨 EMERGENCY RELIEF</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Uttarakhand Flood Emergency Relief Fund
          </Text>

          <View style={styles.locationInfo}>
            <MapPin size={16} color="#EF4444" />
            <Text style={styles.locationText}>Kedarnath, Uttarakhand</Text>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.timeText}>2 hours ago</Text>
          </View>

          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>⚡ BREAKING NEWS</Text>
            <Text style={styles.alertText}>
              Massive cloudbursts and flash floods have devastated Kedarnath and
              surrounding areas. Thousands of pilgrims and locals are stranded
              without food, water, or shelter.
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>5,000+</Text>
              <Text style={styles.statLabel}>People Affected</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>₹12L</Text>
              <Text style={styles.statLabel}>Raised So Far</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>48 hrs</Text>
              <Text style={styles.statLabel}>Critical Window</Text>
            </View>
          </View>

          <Text style={styles.situationTitle}>Current Situation</Text>
          <Text style={styles.situationText}>
            • 🏘️ 15 villages completely cut off from main roads{"\n"}• 🍞 Food
            supplies running out in affected areas{"\n"}• 💊 Medical emergency -
            no access to hospitals{"\n"}• 🏠 Temporary shelters urgently needed
            {"\n"}• 📱 Communication networks disrupted{"\n\n"}
            The State Government and NDRF teams are working round the clock, but
            they need immediate financial support to provide relief materials,
            food packets, and medical aid.
            {"\n\n"}⏰ Every minute counts. Your donation will directly reach
            the affected families through our verified local partners on ground.
          </Text>

          <View style={styles.trustIndicators}>
            <Text style={styles.trustTitle}>Verified Relief Partner</Text>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✅</Text>
              <Text style={styles.trustText}>
                Registered with Uttarakhand Relief Commission
              </Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✅</Text>
              <Text style={styles.trustText}>
                Direct transfer to affected families
              </Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✅</Text>
              <Text style={styles.trustText}>
                Real-time updates on fund utilization
              </Text>
            </View>
          </View>

          <Text style={styles.donateTitle}>Make an Emergency Donation</Text>
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
            <Text style={styles.donateButtonText}>
              🚨 DONATE NOW - EMERGENCY RELIEF
            </Text>
          </TouchableOpacity>

          <View style={styles.urgencyNote}>
            <Text style={styles.urgencyText}>
              ⚠️ Donations processed immediately. Relief materials dispatched
              within 6 hours.
            </Text>
          </View>

          <Text style={styles.disclaimer}>
            This is a simulated disaster relief scam for educational purposes
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
  emergencyBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    padding: 12,
    borderRadius: 8,
  },
  emergencyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    lineHeight: 32,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
  },
  timeText: {
    fontSize: 14,
    color: "#6B7280",
  },
  alertCard: {
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#991B1B",
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    color: "#7F1D1D",
    lineHeight: 20,
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
    textAlign: "center",
  },
  situationTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  situationText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 24,
  },
  trustIndicators: {
    backgroundColor: "#F0F9FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  trustTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 12,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  trustIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  trustText: {
    fontSize: 14,
    color: "#1E40AF",
    flex: 1,
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
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  selectedAmountText: {
    color: "#EF4444",
  },
  donateButton: {
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  donateButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  donateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  urgencyNote: {
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  urgencyText: {
    fontSize: 12,
    color: "#92400E",
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});
