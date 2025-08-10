import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  TriangleAlert as AlertTriangle,
  Shield,
  Eye,
  Play,
  BookOpen,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [showPopup, setShowPopup] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
      return () => clearTimeout(timer);
    }, 2000);

    // Pulse animation for warning elements
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      clearTimeout(timer);
      pulseAnimation.stop();
    };
  }, []);

  const handleDismissPopup = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowPopup(false);
      Alert.alert(
        "Educational Note",
        "This was a simulated scam popup. Real scams use urgent language and fake urgency to pressure victims. Never click on unexpected prize notifications!",
        [{ text: "Got it!", style: "default" }]
      );
    });
  };

  const startSimulation = () => {
    router.push("/pages/lotteryFraudSimulator/winner");
  };

  const goToEducation = () => {
    router.push("/education");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#1F2937", "#374151", "#4B5563"]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.iconContainer,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Shield size={64} color="#EF4444" />
            </Animated.View>
            <Text style={styles.title}>Lottery Scam{"\n"}Simulator</Text>
            <Text style={styles.subtitle}>Educational Anti-Fraud Tool</Text>
          </View>

          <View style={styles.warningCard}>
            <View style={styles.warningHeader}>
              <AlertTriangle size={28} color="#F97316" />
              <Text style={styles.warningTitle}>Educational Simulation</Text>
            </View>
            <Text style={styles.warningText}>
              This is a SAFE SIMULATION designed to educate users about lottery
              scams. No real money, prizes, or personal data collection is
              involved.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>How This Scam Works</Text>
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  Fake prize notification appears
                </Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  Victim enters personal details
                </Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  "Processing fee" required (₹500-2000)
                </Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <Text style={styles.stepText}>Gift card codes requested</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>5</Text>
                </View>
                <Text style={styles.stepText}>Support blocks victim</Text>
              </View>
            </View>
          </View>

          <View style={styles.instructionsCard}>
            <Eye size={32} color="#3B82F6" />
            <View style={styles.instructionsContent}>
              <Text style={styles.instructionsTitle}>
                Experience the Simulation
              </Text>
              <Text style={styles.instructionsText}>
                Navigate through the complete scam process to understand the
                tactics used to manipulate victims. Pay attention to
                psychological pressure techniques.
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={startSimulation}
            >
              <LinearGradient
                colors={["#EF4444", "#DC2626"]}
                style={styles.buttonGradient}
              >
                <Play size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Start Simulation</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={goToEducation}
            >
              <BookOpen size={20} color="#3B82F6" />
              <Text style={styles.secondaryButtonText}>Learn About Scams</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.triggerButton}
              onPress={() => setShowPopup(true)}
            >
              <Text style={styles.triggerButtonText}>Trigger Popup Demo</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>

        <Modal
          visible={showPopup}
          transparent={true}
          animationType="none"
          onRequestClose={handleDismissPopup}
        >
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.popupContainer,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <LinearGradient
                colors={["#059669", "#10B981"]}
                style={styles.popupGradient}
              >
                <Text style={styles.popupTitle}>🎉 CONGRATULATIONS! 🎉</Text>
                <Text style={styles.popupText}>
                  You've won ₹10,00,000 in the MEGA LOTTERY!
                </Text>
                <Text style={styles.popupSubtext}>
                  🚨 URGENT: Claim your prize NOW! Limited time offer!
                </Text>
                <View style={styles.popupButtons}>
                  <TouchableOpacity
                    style={styles.claimButton}
                    onPress={() => {
                      handleDismissPopup();
                      setTimeout(
                        () =>
                          router.push("/pages/lotteryFraudSimulator/winner"),
                        500
                      );
                    }}
                  >
                    <Text style={styles.claimButtonText}>CLAIM NOW!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dismissButton}
                    onPress={handleDismissPopup}
                  >
                    <Text style={styles.dismissButtonText}>Dismiss</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </Modal>
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
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 20,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#D1D5DB",
    fontWeight: "500",
  },
  warningCard: {
    backgroundColor: "rgba(254, 243, 199, 0.95)",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#92400E",
  },
  warningText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  infoCard: {
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
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepNumber: {
    backgroundColor: "#EF4444",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  stepText: {
    fontSize: 15,
    color: "#374151",
    flex: 1,
    fontWeight: "500",
  },
  instructionsCard: {
    backgroundColor: "rgba(235, 248, 255, 0.95)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  instructionsContent: {
    flex: 1,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 16,
    gap: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  secondaryButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
  },
  triggerButton: {
    backgroundColor: "rgba(107, 114, 128, 0.8)",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  triggerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  popupContainer: {
    width: width - 40,
    maxWidth: 400,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  popupGradient: {
    padding: 32,
    alignItems: "center",
  },
  popupTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  popupText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  popupSubtext: {
    fontSize: 14,
    color: "#FEE2E2",
    textAlign: "center",
    marginBottom: 28,
    fontWeight: "600",
  },
  popupButtons: {
    width: "100%",
    gap: 12,
  },
  claimButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  claimButtonText: {
    color: "#059669",
    fontSize: 16,
    fontWeight: "700",
  },
  dismissButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  dismissButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
