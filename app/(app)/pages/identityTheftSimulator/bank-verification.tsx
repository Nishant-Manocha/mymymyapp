import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Phone,
  PhoneCall,
  TriangleAlert as AlertTriangle,
  ArrowRight,
} from "lucide-react-native";

export default function BankVerificationScreen() {
  const router = useRouter();
  const [callReceived, setCallReceived] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setCallReceived(true);
      startRingAnimation();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const startRingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {!callReceived ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Processing Your Application...</Text>
          <Text style={styles.subtitle}>
            Your details are being verified with our banking partner
          </Text>
          <View style={styles.dotsContainer}>
            <Text style={styles.dots}>•••</Text>
          </View>
        </View>
      ) : (
        <View style={styles.callContainer}>
          <Animated.View style={[styles.phoneIcon, animatedStyle]}>
            <PhoneCall size={48} color="#FFFFFF" />
          </Animated.View>

          <Text style={styles.callTitle}>Incoming Call</Text>
          <Text style={styles.bankName}>State Bank of India</Text>
          <Text style={styles.phoneNumber}>+91 98765-43210</Text>

          <View style={styles.callInfo}>
            <Text style={styles.callText}>
              "Congratulations! Your contest application has been approved. We
              need to verify your banking details to transfer the ₹1,00,000
              prize money."
            </Text>
          </View>

          <View style={styles.suspiciousBox}>
            <AlertTriangle size={20} color="#F6AD55" />
            <Text style={styles.suspiciousText}>Red Flags in this call:</Text>
            <Text style={styles.flagItem}>
              • Unsolicited call about prize money
            </Text>
            <Text style={styles.flagItem}>
              • Asking for banking details over phone
            </Text>
            <Text style={styles.flagItem}>
              • Creating urgency to act quickly
            </Text>
          </View>

          <TouchableOpacity
            style={styles.answerButton}
            onPress={() =>
              router.push("/pages/identityTheftSimulator/sim-cloning")
            }
          >
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.answerButtonText}>Answer Call</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            In reality, banks never ask for sensitive information over phone
            calls
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A202C",
    padding: 20,
    justifyContent: "center",
  },
  loadingContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#A0AEC0",
    textAlign: "center",
    lineHeight: 24,
  },
  dotsContainer: {
    marginTop: 30,
  },
  dots: {
    fontSize: 24,
    color: "#4299E1",
    fontWeight: "bold",
  },
  callContainer: {
    alignItems: "center",
  },
  phoneIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#38A169",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  callTitle: {
    fontSize: 18,
    color: "#A0AEC0",
    marginBottom: 8,
  },
  bankName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 18,
    color: "#4299E1",
    marginBottom: 30,
  },
  callInfo: {
    backgroundColor: "#2D3748",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  callText: {
    fontSize: 16,
    color: "#E2E8F0",
    lineHeight: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
  suspiciousBox: {
    backgroundColor: "#322D22",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F6AD55",
    marginBottom: 30,
    alignItems: "center",
  },
  suspiciousText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F6AD55",
    marginTop: 8,
    marginBottom: 12,
  },
  flagItem: {
    fontSize: 12,
    color: "#F6AD55",
    marginBottom: 4,
    textAlign: "center",
  },
  answerButton: {
    backgroundColor: "#38A169",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  answerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: "#718096",
    textAlign: "center",
    fontStyle: "italic",
  },
});
