import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Gift,
  Star,
  Clock,
  CircleAlert as AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function WinnerScreen() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
  });
  const [pulseAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse animation for urgent elements
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      pulseAnimation.stop();
    };
  }, []);

  const showScamAlert = () => {
    Alert.alert(
      "🚨 Scam Tactic Alert",
      "This page uses URGENCY and FAKE TIME LIMITS to pressure victims into quick decisions. Real lotteries don't have urgent claim deadlines!",
      [{ text: "Got it!", style: "default" }]
    );
  };

  const proceedToDetails = () => {
    router.push("/pages/lotteryFraudSimulator/details");
  };

  const goBack = () => {
    router.back();
  };

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#059669", "#10B981", "#34D399"]}
        style={styles.gradient}
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
                      outputRange: [-50, 0],
                    }),
                  },
                ],
                opacity: slideAnim,
              },
            ]}
          >
            <View style={styles.giftContainer}>
              <Gift size={80} color="#FFFFFF" />
              <View style={styles.sparkles}>
                <Text style={styles.sparkle}>✨</Text>
                <Text style={styles.sparkle}>✨</Text>
                <Text style={styles.sparkle}>✨</Text>
              </View>
            </View>
            <Text style={styles.title}>🎉 YOU'RE A WINNER! 🎉</Text>
            <Text style={styles.prizeAmount}>₹10,00,000</Text>
            <Text style={styles.subtitle}>MEGA JACKPOT LOTTERY</Text>
          </Animated.View>

          <Animated.View
            style={[styles.urgencyCard, { transform: [{ scale: pulseAnim }] }]}
          >
            <LinearGradient
              colors={["#FEE2E2", "#FECACA"]}
              style={styles.urgencyGradient}
            >
              <Clock size={32} color="#EF4444" />
              <View style={styles.urgencyContent}>
                <Text style={styles.urgencyTitle}>⏰ CLAIM DEADLINE</Text>
                <View style={styles.timeContainer}>
                  <View style={styles.timeBox}>
                    <Text style={styles.timeNumber}>
                      {formatTime(timeLeft.hours)}
                    </Text>
                    <Text style={styles.timeLabel}>HRS</Text>
                  </View>
                  <Text style={styles.timeSeparator}>:</Text>
                  <View style={styles.timeBox}>
                    <Text style={styles.timeNumber}>
                      {formatTime(timeLeft.minutes)}
                    </Text>
                    <Text style={styles.timeLabel}>MIN</Text>
                  </View>
                  <Text style={styles.timeSeparator}>:</Text>
                  <View style={styles.timeBox}>
                    <Text style={styles.timeNumber}>
                      {formatTime(timeLeft.seconds)}
                    </Text>
                    <Text style={styles.timeLabel}>SEC</Text>
                  </View>
                </View>
                <Text style={styles.urgencySubtext}>
                  Don't lose your prize!
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} color="#FCD34D" fill="#FCD34D" />
            ))}
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>🏆 Prize Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Lottery ID:</Text>
                <Text style={styles.detailValue}>MLT-2024-789456</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Draw Date:</Text>
                <Text style={styles.detailValue}>15th January 2024</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Winning Numbers:</Text>
                <Text style={styles.detailValue}>7-14-23-31-45-52</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Prize Category:</Text>
                <Text style={styles.detailValue}>First Prize</Text>
              </View>
            </View>
          </View>

          <View style={styles.processCard}>
            <Text style={styles.cardTitle}>📋 Claim Process</Text>
            <View style={styles.stepsList}>
              <View style={styles.stepCompleted}>
                <View style={styles.stepIcon}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.stepTextCompleted}>
                  Prize notification sent
                </Text>
              </View>
              <View style={styles.stepActive}>
                <View style={styles.stepIconActive}>
                  <Text style={styles.stepNumber}>2</Text>
                </View>
                <Text style={styles.stepTextActive}>Enter your details</Text>
              </View>
              <View style={styles.stepPending}>
                <View style={styles.stepIconPending}>
                  <Text style={styles.stepNumber}>3</Text>
                </View>
                <Text style={styles.stepTextPending}>Pay processing fee</Text>
              </View>
              <View style={styles.stepPending}>
                <View style={styles.stepIconPending}>
                  <Text style={styles.stepNumber}>4</Text>
                </View>
                <Text style={styles.stepTextPending}>
                  Verify with gift card
                </Text>
              </View>
              <View style={styles.stepPending}>
                <View style={styles.stepIconPending}>
                  <Text style={styles.stepNumber}>5</Text>
                </View>
                <Text style={styles.stepTextPending}>Receive your prize</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.claimButton}
            onPress={proceedToDetails}
          >
            <LinearGradient
              colors={["#DC2626", "#B91C1C"]}
              style={styles.claimGradient}
            >
              <Text style={styles.claimButtonText}>CLAIM YOUR ₹10L NOW!</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.warningButton}
            onPress={showScamAlert}
          >
            <AlertCircle size={20} color="#EF4444" />
            <Text style={styles.warningButtonText}>
              🚨 Spot the Scam Tactics
            </Text>
          </TouchableOpacity>

          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialTitle}>💬 Recent Winner Says:</Text>
            <Text style={styles.testimonialText}>
              "I couldn't believe it! The process was so simple and I received
              my money the same day!" - Rajesh K.
            </Text>
            <View style={styles.fakeLabel}>
              <Text style={styles.fakeLabelText}>⚠️ FAKE TESTIMONIAL</Text>
              <Text style={styles.fakeLabelSubtext}>
                Scammers use fake reviews to build trust
              </Text>
            </View>
          </View>

          <View style={styles.legalSection}>
            <Text style={styles.legalTitle}>
              🏛️ Official Lottery Commission
            </Text>
            <Text style={styles.legalSubtext}>
              Licensed & Regulated • Instant Payouts • 100% Secure
            </Text>
            <Text style={styles.legalWarning}>
              ⚠️ Fake authority claims to appear legitimate
            </Text>
          </View>
        </ScrollView>
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
    marginBottom: 32,
  },
  giftContainer: {
    position: "relative",
    marginBottom: 16,
  },
  sparkles: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  sparkle: {
    fontSize: 20,
    position: "absolute",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  prizeAmount: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FEF3C7",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#D1FAE5",
    fontWeight: "600",
    textAlign: "center",
  },
  urgencyCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  urgencyGradient: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  urgencyContent: {
    flex: 1,
  },
  urgencyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#DC2626",
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  timeBox: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 50,
  },
  timeNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  timeLabel: {
    fontSize: 10,
    color: "#FEE2E2",
    fontWeight: "600",
  },
  timeSeparator: {
    fontSize: 24,
    fontWeight: "800",
    color: "#DC2626",
    marginHorizontal: 8,
  },
  urgencySubtext: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "600",
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  detailsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsGrid: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
  },
  processCard: {
    backgroundColor: "rgba(240, 253, 244, 0.95)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#22C55E",
  },
  stepsList: {
    gap: 16,
  },
  stepCompleted: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepPending: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepIcon: {
    backgroundColor: "#22C55E",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  stepIconActive: {
    backgroundColor: "#3B82F6",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  stepIconPending: {
    backgroundColor: "#D1D5DB",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  stepNumber: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  stepTextCompleted: {
    fontSize: 15,
    color: "#15803D",
    fontWeight: "600",
    flex: 1,
  },
  stepTextActive: {
    fontSize: 15,
    color: "#1D4ED8",
    fontWeight: "700",
    flex: 1,
  },
  stepTextPending: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
    flex: 1,
  },
  claimButton: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  claimGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    gap: 12,
  },
  claimButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  warningButton: {
    backgroundColor: "rgba(254, 226, 226, 0.9)",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 8,
    borderWidth: 2,
    borderColor: "#EF4444",
  },
  warningButtonText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
  testimonialCard: {
    backgroundColor: "rgba(243, 244, 246, 0.95)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  testimonialTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 14,
    color: "#4B5563",
    fontStyle: "italic",
    marginBottom: 12,
    lineHeight: 20,
  },
  fakeLabel: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  fakeLabelText: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "700",
    marginBottom: 2,
  },
  fakeLabelSubtext: {
    fontSize: 11,
    color: "#DC2626",
  },
  legalSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(231, 221, 221, 0.33)",
    borderRadius: 16,
  },
  legalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  legalSubtext: {
    fontSize: 14,
    color: "#D1FAE5",
    textAlign: "center",
    marginBottom: 8,
  },
  legalWarning: {
    fontSize: 12,
    color: "#FEE2E2",
    fontWeight: "500",
    textAlign: "center",
  },
});
