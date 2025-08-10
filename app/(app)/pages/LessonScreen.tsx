import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import AudioPlayer from "../../../components/AudioPlayer";

const LessonScreen: React.FC = ({ route, navigation }: any) => {
  const { lesson, language } = route.params || {};

  if (!lesson) {
    navigation.goBack();
    return null;
  }

  const handleTakeQuiz = () => {
    navigation.navigate("Quiz", { lesson, language });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
      case "शुरुआती":
        return "#059669";
      case "intermediate":
      case "मध्यम":
        return "#d97706";
      case "advanced":
      case "उन्नत":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  return (
    <LinearGradient colors={["#f0f9ff", "#e0f2fe"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <ArrowLeft size={20} color="#1e40af" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.title} numberOfLines={2}>
                {lesson.title}
              </Text>
              <View style={styles.metaContainer}>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.metaText}>{lesson.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <BookOpen size={16} color="#6b7280" />
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: getDifficultyColor(lesson.difficulty),
                      },
                    ]}
                  >
                    <Text style={styles.badgeText}>{lesson.difficulty}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Description Card */}
          <View style={styles.descriptionCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.6)"]}
              style={styles.cardGradient}
            >
              <Text style={styles.cardTitle}>About This Lesson</Text>
              <Text style={styles.description}>{lesson.description}</Text>
            </LinearGradient>
          </View>

          {/* Audio Player */}
          <View style={styles.audioContainer}>
            <AudioPlayer audioSrc={lesson.audioUrl} title={lesson.title} />
          </View>

          {/* Quiz Section */}
          <View style={styles.quizCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.6)"]}
              style={styles.cardGradient}
            >
              <View style={styles.quizContent}>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>Ready for the Quiz?</Text>
                  <Text style={styles.quizDescription}>
                    Test your understanding with a quick quiz to reinforce your
                    learning.
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.quizButton}
                  onPress={handleTakeQuiz}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#3b82f6", "#1d4ed8"]}
                    style={styles.quizButtonGradient}
                  >
                    <ArrowRight
                      size={16}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.quizButtonText}>Take Quiz</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(30, 64, 175, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerContent: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 32,
  },
  metaContainer: { flexDirection: "row", alignItems: "center" },
  metaItem: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  metaText: { fontSize: 12, color: "#6b7280", marginLeft: 4 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 4,
  },
  badgeText: { fontSize: 10, color: "white", fontWeight: "600" },
  descriptionCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginBottom: 24,
  },
  cardGradient: { padding: 24 },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  description: { fontSize: 14, color: "#6b7280", lineHeight: 22 },
  audioContainer: { marginBottom: 24 },
  quizCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginBottom: 24,
  },
  quizContent: { alignItems: "center" },
  quizInfo: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 18,
  },
  quizButton: { borderRadius: 12, overflow: "hidden", marginBottom: 8 },
  quizButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  quizButtonText: { fontSize: 16, fontWeight: "600", color: "white" },
});

export default LessonScreen;
