import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Shield,
  DollarSign,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Trophy,
  Target,
} from "lucide-react-native";
import API from "../api/api";
// import { Quiz, getUserProgress } from "../data/quizData";

interface QuizCardProps {
  quiz;
  onPress: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onPress }) => {
  // const isCompleted = progress[quiz.id]?.completed || false;
  // const score = progress[quiz.id]?.score || 0;
  // const attempts = progress[quiz.id]?.attempts || 0;
  const [completedQuizzes, setCompletedQuizzes] = React.useState<string[]>([]);
  const [score, setScore] = React.useState<number>(0);

  useEffect(() => {
    // Load completed quizzes from local storage or server
    const loadCompletedQuizzes = async () => {
      try {
        const response = await API.get(
          `${process.env.SERVER_URL}/progress?type=quiz`
        );
        const data = await response.data;
        if (data.progress) {
          setCompletedQuizzes(data.progress.map((item) => item.quizId));

          data.progress.map((item) => {
            item.quizId === quiz._id && setScore(item.score / 20);
          });
        }
      } catch (error) {
        console.error("Failed to load completed quizzes:", error);
      }
    };

    loadCompletedQuizzes();
  }, []);

  const isCompleted = completedQuizzes.includes(quiz._id);

  const CategoryIcon = quiz.category === "fraud" ? Shield : DollarSign;

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return {
          color: "#10b981",
          bg: "#d1fae5",
          gradient: ["#10b981", "#34d399"],
          icon: Target,
        };
      case "intermediate":
        return {
          color: "#f59e0b",
          bg: "#fef3c7",
          gradient: ["#f59e0b", "#fbbf24"],
          icon: Zap,
        };
      case "advanced":
        return {
          color: "#ef4444",
          bg: "#fee2e2",
          gradient: ["#ef4444", "#f87171"],
          icon: Trophy,
        };
      default:
        return {
          color: "#6b7280",
          bg: "#f3f4f6",
          gradient: ["#6b7280", "#9ca3af"],
          icon: Star,
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(quiz.difficulty);
  const DifficultyIcon = difficultyConfig.icon;

  const getScoreColor = (score: number) => {
    if (score >= 4) return "#10b981";
    if (score >= 3) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.completedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Completion Glow Effect */}
      {isCompleted && <View style={styles.completionGlow} />}

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.categorySection}>
          <View
            style={[
              styles.categoryIcon,
              quiz.category === "fraud"
                ? styles.fraudIcon
                : styles.financialIcon,
            ]}
          >
            <CategoryIcon size={16} color="#ffffff" />
          </View>
          <View
            style={[
              styles.categoryBadge,
              quiz.category === "fraud"
                ? styles.fraudBadge
                : styles.financialBadge,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                quiz.category === "fraud"
                  ? styles.fraudText
                  : styles.financialText,
              ]}
            >
              {quiz.category === "fraud"
                ? "Fraud Protection"
                : "Financial Mastery"}
            </Text>
          </View>
        </View>

        {isCompleted && (
          <View style={styles.completionBadge}>
            <View
              style={[
                styles.scoreContainer,
                { backgroundColor: getScoreColor(score) },
              ]}
            >
              <CheckCircle size={14} color="#ffffff" />
              <Text style={styles.scoreText}>{score}/5</Text>
            </View>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>{quiz.title}</Text>
        <Text style={styles.description}>{quiz.description}</Text>
      </View>

      {/* Meta Information */}
      <View style={styles.metaSection}>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyConfig.bg },
          ]}
        >
          <DifficultyIcon size={12} color={difficultyConfig.color} />
          <Text
            style={[styles.difficultyText, { color: difficultyConfig.color }]}
          >
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Clock size={12} color="#6b7280" />
          <Text style={styles.timeText}>{quiz.estimatedTime} min</Text>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.questionCount}>5 Questions</Text>
          {isCompleted ? (
            <Text style={[styles.statusText, { color: getScoreColor(score) }]}>
              Best: {score}/5 ({Math.round((score / 5) * 100)}%)
            </Text>
          ) : (
            <Text style={styles.statusText}>Ready to start</Text>
          )}
        </View>

        <View
          style={[
            styles.actionButton,
            isCompleted ? styles.retakeButton : styles.startButton,
          ]}
        >
          {isCompleted ? (
            <>
              <Trophy size={14} color="#6366f1" />
              <Text style={styles.retakeButtonText}>Retake</Text>
            </>
          ) : (
            <>
              <Zap size={14} color="#ffffff" />
              <Text style={styles.startButtonText}>Start</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    position: "relative",
    overflow: "hidden",
  },
  completedCard: {
    borderColor: "#10b981",
    borderWidth: 1,
  },
  completionGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "140%",
    backgroundColor: "#10b981",
    opacity: 0.07,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  categorySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  fraudIcon: {
    backgroundColor: "#ef4444",
  },
  financialIcon: {
    backgroundColor: "#6366f1",
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  fraudBadge: {
    backgroundColor: "#fee2e2",
  },
  financialBadge: {
    backgroundColor: "#e0e7ff",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  fraudText: {
    color: "#dc2626",
  },
  financialText: {
    color: "#4338ca",
  },
  completionBadge: {
    alignItems: "flex-end",
    gap: 4,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
  attemptsText: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
  },
  content: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  metaSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerInfo: {
    flex: 1,
  },
  questionCount: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  startButton: {
    backgroundColor: "#6366f1",
  },
  retakeButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  retakeButtonText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default QuizCard;
