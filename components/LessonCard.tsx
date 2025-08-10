import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Play, CheckCircle, Clock, BookOpen } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { isLessonCompleted } from "../data/lessonsData";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

interface LessonCardProps {
  lesson: Lesson;
  onStart: (lesson: Lesson) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onStart }) => {
  const isCompleted = isLessonCompleted(lesson.id);

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
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.6)"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {lesson.title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {lesson.description}
            </Text>
          </View>
          {isCompleted && (
            <CheckCircle
              size={24}
              color="#059669"
              style={styles.completedIcon}
            />
          )}
        </View>

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
                { backgroundColor: getDifficultyColor(lesson.difficulty) },
              ]}
            >
              <Text style={styles.badgeText}>{lesson.difficulty}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onStart(lesson)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#3b82f6", "#1d4ed8"]}
            style={styles.buttonGradient}
          >
            <Play size={16} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>
              {isCompleted ? "Review Lesson" : "Start Lesson"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginBottom: 16,
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  completedIcon: {
    marginLeft: 8,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 4,
  },
  badgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default LessonCard;
