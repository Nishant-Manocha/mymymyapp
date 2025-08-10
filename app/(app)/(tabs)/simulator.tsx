import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Easing,
  Animated,
} from "react-native";
import {
  TriangleAlert,
  DollarSign,
  Smartphone,
  Users,
  Zap,
  ChevronRight,
  Eye,
  Hexagon,
  Star,
  Sparkles,
  Lock,
} from "lucide-react-native";
import ChatbotButton from "../../../components/ChatbotButton";
import ChatbotPopup from "../../../components/ChatbotPopup";
import { PSBColors, PSBShadows, PSBSpacing } from "../../../utils/PSBColors";
// import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

interface SimulatorModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: "fraud" | "financial";
  route: string;
  image: any;
}

const simulatorModules: SimulatorModule[] = [
  {
    id: "ponzi-scheme-simulator",
    title: "Ponzi Scheme Simulator",
    description: "Detect and prevent investment-based fraud.",
    icon: TriangleAlert,
    category: "fraud",
    route: "/pages/PonziSimulator",
    image: require("../../../assets/ponzi.png"),
  },
  {
    id: "charity-scam-simulator",
    title: "Charity Scam Simulator",
    description: "Learn to recognize charity scams effectively.",
    icon: DollarSign,
    category: "fraud",
    route: "/pages/charityScamSimulator",
    image: require("../../../assets/charity.png"),
  },
  {
    id: "identity-theft",
    title: "Identity Theft Simulation",
    description: "Master identity theft prevention strategies.",
    icon: Users,
    category: "fraud",
    route: "/pages/identityTheftSimulator",
    image: require("../../../assets/identity.png"),
  },
  {
    id: "phishing-simulation",
    title: "Phishing Simulation",
    description: "Prevent phishing attacks in real-world scenarios.",
    icon: Smartphone,
    category: "fraud",
    route: "/pages/PhishingSimulator",
    image: require("../../../assets/phishing.png"),
  },
  {
    id: "lottery-fraud-simulator",
    title: "Lottery Fraud Simulation",
    description: "Uncover deceptive lottery scam tactics.",
    icon: TriangleAlert,
    category: "fraud",
    route: "/pages/lotteryFraudSimulator",
    image: require("../../../assets/lottery.png"),
  },
  {
    id: "loan-fraud-simulator",
    title: "Loan Fraud Simulation",
    description: "Analyze fraudulent loan transactions.",
    icon: DollarSign,
    category: "fraud",
    route: "/pages/loanScamSimulator",
    image: require("../../../assets/loan.png"),
  },
];

const FloatingParticle: React.FC<{ delay: number; color: string }> = ({
  delay,
  color,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: -20,
              duration: 2000 + Math.random() * 1000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.8,
              duration: 1000,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: 0,
              duration: 2000 + Math.random() * 1000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 1000,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    setTimeout(animate, delay);
  }, []);

  return (
    <Animated.View
      style={[
        styles.floatingParticle,
        {
          backgroundColor: color,
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    />
  );
};

const ModuleCard: React.FC<{ module: SimulatorModule }> = ({ module }) => {
  const IconComponent = module.icon;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(module.route)}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image source={module.image} style={styles.cardImage} />
      </View>
      <View style={styles.cardRight}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{module.title}</Text>
          <Text style={styles.cardDescription}>{module.description}</Text>
        </View>
        <View style={styles.cardRightBottom}>
          <IconComponent size={20} color={PSBColors.primary.green} />
          <ChevronRight size={20} color={PSBColors.text.secondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function SimulatorsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const heroScaleAnim = useRef(new Animated.Value(0.95)).current;
  const [isPopupVisible, setPopupVisible] = useState(false);
  const fraudModules = simulatorModules.filter((m) => m.category === "fraud");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(),
      [];
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={PSBColors.primary.green}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#004025", "#00563F", "#006057"]}
          style={styles.heroHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroOverlay} />
          <FloatingParticle delay={0} color="rgba(255, 215, 0, 0.6)" />
          <FloatingParticle delay={1000} color="rgba(138, 43, 226, 0.4)" />
          <FloatingParticle delay={2000} color="rgba(0, 191, 255, 0.5)" />

          <Animated.View
            style={[
              styles.heroContent,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: heroScaleAnim },
                ],
              },
            ]}
          >
            <View style={styles.brandContainer}>
              <View style={styles.logoSection}>
                <LinearGradient
                  colors={["#FFD700", "#FFA500", "#FF6B35"]}
                  style={styles.logoContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Zap size={36} color="#FFFFFF" strokeWidth={3} />
                  <View style={styles.logoGlow} />
                </LinearGradient>
                <View style={styles.sparkleField}>
                  <Sparkles
                    size={16}
                    color="#FFD700"
                    style={[styles.sparkle, { top: -8, right: -8 }]}
                  />
                  <Star
                    size={12}
                    color="#FFFFFF"
                    style={[styles.sparkle, { bottom: -6, left: -6 }]}
                  />
                  <Hexagon
                    size={10}
                    color="#FFA500"
                    style={[styles.sparkle, { top: 10, right: 15 }]}
                  />
                </View>
              </View>

              <View style={styles.brandTextContainer}>
                <Text style={styles.brandTitle}>Simulation Academy</Text>
                <Text style={styles.brandSubtitle}>
                  Master the art of fraud detection with our interactive
                  simulators.
                </Text>
                <View style={styles.brandFeatures}>
                  <View style={styles.featurePill}>
                    <Lock size={12} color="#10B981" strokeWidth={2} />
                    <Text style={styles.featureText}>Enterprise Security</Text>
                  </View>
                  <View style={styles.featurePill}>
                    <Eye size={12} color="#3B82F6" strokeWidth={2} />
                    <Text style={styles.featureText}>AI Analytics</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* 
            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Professional Tools</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>99.9%</Text>
                <Text style={styles.statLabel}>Accuracy Rate</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Availability</Text>
              </View>
            </View> */}
          </Animated.View>
        </LinearGradient>

        {/* <Text style={styles.sectionTitle}>Fraud Detection Modules</Text> */}
        <View style={styles.cardList}>
          {fraudModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </View>
      </ScrollView>

      <ChatbotButton onPress={() => setPopupVisible(true)} />
      <ChatbotPopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PSBColors.background.secondary,
  },
  // heroHeader: {
  //   backgroundColor: PSBColors.primary.green,
  //   paddingTop: 50,
  //   paddingBottom: 30,
  //   paddingHorizontal: PSBSpacing.lg,
  // },
  // heroContent: {
  //   alignItems: "center",
  // },
  // brandContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 16,
  // },
  // logoContainer: {
  //   width: 56,
  //   height: 56,
  //   borderRadius: 28,
  //   backgroundColor: PSBColors.primary.gold,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 14,
  //   ...PSBShadows.lg,
  // },
  // brandTitle: {
  //   fontSize: 24,
  //   fontWeight: "800",
  //   color: PSBColors.text.inverse,
  //   letterSpacing: -0.3,
  // },
  // brandSubtitle: {
  //   fontSize: 14,
  //   color: PSBColors.text.inverse,
  //   fontWeight: "500",
  // },
  scrollContainer: {
    paddingBottom: 40,
    // paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: PSBColors.text.primary,
    marginBottom: 16,
  },
  cardList: {
    gap: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    ...PSBShadows.md,
    alignSelf: "center",
    padding: 12,
    gap: 12,
    elevation: 3,
    width: width - 32,
    minHeight: 120,
  },
  imageWrapper: {
    width: "40%",
    aspectRatio: 4 / 3, // or 4/3 if needed
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "transparent", // no background to avoid contrast
    padding: 0,
    margin: 0,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // you can switch to "contain" if still overflows
  },
  cardRight: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardTextContainer: {
    flexShrink: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: PSBColors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: PSBColors.text.secondary,
    lineHeight: 18,
  },
  cardRightBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  heroHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
    position: "relative",
    overflow: "hidden",
    marginBottom: 20,
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  particle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    top: "20%",
    right: "15%",
  },
  heroContent: {
    alignItems: "center",
    zIndex: 1,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoSection: {
    position: "relative",
    marginBottom: 24,
  },
  logoContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 15,
    position: "relative",
  },
  logoGlow: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 48,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    zIndex: -1,
  },
  sparkleField: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    top: -18,
    left: -18,
  },
  sparkle: {
    position: "absolute",
  },
  brandTextContainer: {
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    marginBottom: 8,
    textAlign: "center",
  },
  brandSubtitle: {
    fontSize: 16,
    color: "#E2E8F0",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  brandFeatures: {
    flexDirection: "row",
    gap: 12,
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    gap: 6,
  },
  featureText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  heroStats: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#CBD5E1",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 10,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  floatingParticle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    top: "20%",
    left: "20%",
  },
});
