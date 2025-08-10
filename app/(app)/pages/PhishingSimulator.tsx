import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Shield,
  MessageSquare,
  Mail,
  Brain,
  ChevronRight,
  Star,
  CircleCheck as CheckCircle,
  TriangleAlert as AlertTriangle,
} from "lucide-react-native";
import SMSSimulation from "../../../components/SMSSimulation";
import EmailSimulation from "../../../components/EmailSimulation";
import PhishingPage from "../../../components/PhishingPage";
import EducationalWarning from "../../../components/EducationalWarning";
import DebitSimulation from "../../../components/DebitSimulation";
import QuizSimulation from "../../../components/QuizSimulation";
import SecurityTips from "../../../components/SecurityTips";
import { router } from "expo-router";

type Step =
  | "intro"
  | "sms"
  | "email"
  | "phishing"
  | "warning"
  | "debit"
  | "quiz"
  | "tips";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [userData, setUserData] = useState({
    account: "",
    otp: "",
    password: "",
  });

  const resetSimulation = () => {
    setCurrentStep("intro");
    setUserData({ account: "", otp: "", password: "" });
    router.push("/(app)/(tabs)");
  };

  if (currentStep === "intro") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1E293B" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.heroSection}>
              <View style={styles.iconContainer}>
                <Shield size={64} color="#FFFFFF" strokeWidth={2} />
              </View>
              <Text style={styles.heroTitle}>Phishing Awareness Simulator</Text>
              <Text style={styles.heroSubtitle}>
                Master cybersecurity through interactive learning
              </Text>
            </View>

            <View style={styles.badgeContainer}>
              <View style={styles.educationalBadge}>
                <Star size={16} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.badgeText}>Educational Purpose Only</Text>
              </View>
            </View>
          </View>

          <View style={styles.featuresSection}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <AlertTriangle size={48} color="#F59E0B" strokeWidth={2} />
              </View>
              <Text style={styles.featureTitle}>
                🛡️ Learn to Recognize Threats
              </Text>
              <Text style={styles.featureDescription}>
                Master the art of spotting suspicious messages, emails, and
                websites before they can deceive you. Your awareness is your
                strongest defense.
              </Text>
            </View>

            <View style={styles.benefitsGrid}>
              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <CheckCircle size={32} color="#10B981" strokeWidth={2} />
                </View>
                <Text style={styles.benefitTitle}>Safe Practice</Text>
                <Text style={styles.benefitDescription}>
                  Experience realistic scenarios in a completely secure
                  environment
                </Text>
              </View>

              <View style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <Shield size={32} color="#3B82F6" strokeWidth={2} />
                </View>
                <Text style={styles.benefitTitle}>Stay Protected</Text>
                <Text style={styles.benefitDescription}>
                  Learn proven techniques to defend against real cyber threats
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.disclaimerCard}>
            <View style={styles.disclaimerIcon}>
              <AlertTriangle size={24} color="#F59E0B" strokeWidth={2} />
            </View>
            <Text style={styles.disclaimerTitle}>Important Safety Notice</Text>
            <View style={styles.disclaimerList}>
              <View style={styles.disclaimerItem}>
                <CheckCircle size={16} color="#10B981" strokeWidth={2} />
                <Text style={styles.disclaimerText}>
                  Completely safe educational simulation
                </Text>
              </View>
              <View style={styles.disclaimerItem}>
                <CheckCircle size={16} color="#10B981" strokeWidth={2} />
                <Text style={styles.disclaimerText}>
                  No real data transmitted or stored
                </Text>
              </View>
              <View style={styles.disclaimerItem}>
                <CheckCircle size={16} color="#10B981" strokeWidth={2} />
                <Text style={styles.disclaimerText}>
                  All banking interfaces are fake demos
                </Text>
              </View>
              <View style={styles.disclaimerItem}>
                <CheckCircle size={16} color="#10B981" strokeWidth={2} />
                <Text style={styles.disclaimerText}>
                  Educational cybersecurity purpose only
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.trainingSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Choose Your Training Module
              </Text>
              <Text style={styles.sectionSubtitle}>
                Select an interactive cybersecurity training to begin your
                learning journey
              </Text>
            </View>

            <View style={styles.appGrid}>
              <TouchableOpacity
                style={[styles.trainingCard, styles.smsCard]}
                onPress={() => setCurrentStep("sms")}
              >
                <View style={styles.cardHeader}>
                  <MessageSquare size={32} color="#FFFFFF" strokeWidth={2} />
                  <ChevronRight size={20} color="#FFFFFF" strokeWidth={2} />
                </View>
                <Text style={styles.cardTitle}>SMS Security</Text>
                <Text style={styles.cardSubtitle}>Interactive Mobile Demo</Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>Beginner Friendly</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.trainingCard, styles.emailCard]}
                onPress={() => setCurrentStep("email")}
              >
                <View style={styles.cardHeader}>
                  <Mail size={32} color="#FFFFFF" strokeWidth={2} />
                  <ChevronRight size={20} color="#FFFFFF" strokeWidth={2} />
                </View>
                <Text style={styles.cardTitle}>Email Shield</Text>
                <Text style={styles.cardSubtitle}>Advanced Email Training</Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>Intermediate</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.trainingCard, styles.quizCard]}
                onPress={() => setCurrentStep("quiz")}
              >
                <View style={styles.cardHeader}>
                  <Brain size={32} color="#FFFFFF" strokeWidth={2} />
                  <ChevronRight size={20} color="#FFFFFF" strokeWidth={2} />
                </View>
                <Text style={styles.cardTitle}>Brain Trainer</Text>
                <Text style={styles.cardSubtitle}>Knowledge Assessment</Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>Test Your Skills</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentStep === "sms") {
    return <SMSSimulation onNext={() => setCurrentStep("phishing")} />;
  }

  if (currentStep === "email") {
    return <EmailSimulation onNext={() => setCurrentStep("phishing")} />;
  }

  if (currentStep === "phishing") {
    return (
      <PhishingPage
        onSubmit={(data) => {
          setUserData(data);
          setCurrentStep("warning");
        }}
      />
    );
  }

  if (currentStep === "warning") {
    return (
      <EducationalWarning
        onNext={() => setCurrentStep("debit")}
        userData={userData}
      />
    );
  }

  if (currentStep === "debit") {
    return <DebitSimulation onNext={() => setCurrentStep("tips")} />;
  }

  if (currentStep === "quiz") {
    return <QuizSimulation onComplete={() => setCurrentStep("tips")} />;
  }

  if (currentStep === "tips") {
    return <SecurityTips onRestart={resetSimulation} />;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 26,
  },
  badgeContainer: {
    alignItems: "center",
  },
  educationalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#334155",
    gap: 8,
  },
  badgeText: {
    fontSize: 14,
    color: "#F59E0B",
    fontWeight: "600",
  },
  featuresSection: {
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  featureIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 26,
  },
  benefitsGrid: {
    flexDirection: "row",
    gap: 20,
  },
  benefitCard: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  benefitIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  benefitDescription: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 22,
    textAlign: "center",
  },
  disclaimerCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  disclaimerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  disclaimerList: {
    gap: 12,
    width: "100%",
  },
  disclaimerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  disclaimerText: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 22,
    flex: 1,
  },
  trainingSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 24,
  },
  appGrid: {
    gap: 20,
  },
  trainingCard: {
    borderRadius: 20,
    padding: 28,
    minHeight: 180,
    justifyContent: "space-between",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  smsCard: {
    backgroundColor: "#3B82F6",
  },
  emailCard: {
    backgroundColor: "#10B981",
  },
  quizCard: {
    backgroundColor: "#F59E0B",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 16,
  },
  cardBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  cardBadgeText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
