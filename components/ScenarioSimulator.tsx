import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Clock,
  Target,
  CircleCheck as CheckCircle,
  Circle as XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Brain,
  TrendingUp,
  TriangleAlert as AlertTriangle,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
// import { set } from "mongoose";
// import { Scenario, ScenarioChoice, scenarios } from '../data/scenarios';
import { apiCall } from "../utils/api";
import API from "../api/api";

const { width } = Dimensions.get("window");

interface ScenarioSimulatorProps {
  scenarioId?: string;
  onComplete;
  onExit?: () => void;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  scenarioId,
  onComplete,
  onExit,
}) => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch scenario data from the server or local storage
    const fetchScenario = async () => {
      try {
        const response = await API.get(`/scenarios/${scenarioId}`);

        // Assuming your API returns data in response.data
        const data = response.data;
        console.log("Fetched scenario data:", data.scenario);
        setCurrentScenario(data.scenario);
        setTimeLeft(data.timeLimit || null);
        setStartTime(new Date());
      } catch (error) {
        console.error("Failed to fetch scenario:", error);
        Alert.alert("Error", "Failed to load scenario data");
      }
    };
    fetchScenario();
  }, [scenarioId]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTimeSpent(
          Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  const handleTimeUp = () => {
    Alert.alert(
      "Time's Up!",
      "You didn't make a decision in time. In real life, delayed decisions can also have consequences.",
      [{ text: "OK", onPress: () => setShowResult(true) }]
    );
  };

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    // setShowResult(true);
  };

  const handleRestart = () => {
    setSelectedChoice(null);
    setShowResult(false);
    setTimeLeft(currentScenario?.timeLimit || null);
    setStartTime(new Date());
    setTimeSpent(0);
  };

  useEffect(() => {
    if (onComplete && selectedChoice && currentScenario) {
      const result = {
        scenarioId,
        choiceId: selectedChoice.id,
        timeSpent,
      };
      onComplete(result).then((response) => {
        if (response) {
          console.log("Scenario completion response:", response);
          setShowResult(true);
        }
      });
    }
  }, [selectedChoice]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "#10b981";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fraud-detection":
        return <AlertTriangle size={20} color="#ef4444" />;
      case "investment":
        return <TrendingUp size={20} color="#3b82f6" />;
      case "budgeting":
        return <Target size={20} color="#10b981" />;
      case "insurance":
        return <CheckCircle size={20} color="#8b5cf6" />;
      case "retirement":
        return <Clock size={20} color="#f59e0b" />;
      default:
        return <Brain size={20} color="#6b7280" />;
    }
  };

  if (!currentScenario) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AlertTriangle size={48} color="#ef4444" />
          <Text style={styles.errorTitle}>Scenario Not Found</Text>
          <Text style={styles.errorDescription}>
            The requested scenario could not be loaded.
          </Text>
          {onExit && (
            <TouchableOpacity style={styles.exitButton} onPress={onExit}>
              <Text style={styles.exitButtonText}>Go Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (showResult && selectedChoice) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={
            selectedChoice.isCorrect
              ? ["#f0fdf4", "#dcfce7"]
              : ["#fef2f2", "#fee2e2"]
          }
          style={styles.resultContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.resultHeader}>
              <View
                style={[
                  styles.resultIcon,
                  {
                    backgroundColor: selectedChoice.isCorrect
                      ? "#10b981"
                      : "#ef4444",
                  },
                ]}
              >
                {selectedChoice.isCorrect ? (
                  <CheckCircle size={32} color="#ffffff" />
                ) : (
                  <XCircle size={32} color="#ffffff" />
                )}
              </View>
              <Text
                style={[
                  styles.resultTitle,
                  { color: selectedChoice.isCorrect ? "#166534" : "#dc2626" },
                ]}
              >
                {selectedChoice.isCorrect
                  ? "Great Decision!"
                  : "Learning Opportunity"}
              </Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  {selectedChoice.points} /{" "}
                  {Math.max(...currentScenario.choices.map((c) => c.points))}{" "}
                  points
                </Text>
              </View>
            </View>

            <View style={styles.resultContent}>
              <View style={styles.choiceSection}>
                <Text style={styles.sectionTitle}>Your Choice:</Text>
                <Text style={styles.choiceText}>{selectedChoice.text}</Text>
              </View>

              <View style={styles.consequenceSection}>
                <Text style={styles.sectionTitle}>What Happened:</Text>
                <Text style={styles.consequenceText}>
                  {selectedChoice.consequence}
                </Text>
              </View>

              <View style={styles.explanationSection}>
                <Text style={styles.sectionTitle}>Why This Matters:</Text>
                <Text style={styles.explanationText}>
                  {selectedChoice.explanation}
                </Text>
              </View>

              <View style={styles.learningSection}>
                <Text style={styles.sectionTitle}>Learning Objective:</Text>
                <Text style={styles.learningText}>
                  {currentScenario.learningObjective}
                </Text>
              </View>

              {!selectedChoice.isCorrect && (
                <View style={styles.betterChoiceSection}>
                  <Text style={styles.sectionTitle}>Better Approach:</Text>
                  {currentScenario.choices
                    .filter((c) => c.isCorrect)
                    .map((choice, index) => (
                      <View key={choice.id} style={styles.betterChoice}>
                        <CheckCircle size={16} color="#10b981" />
                        <Text style={styles.betterChoiceText}>
                          {choice.text}
                        </Text>
                      </View>
                    ))}
                </View>
              )}
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={handleRestart}
              >
                <RotateCcw size={20} color="#6b7280" />
                <Text style={styles.restartButtonText}>Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => router.push("/pages/ScenarioHub")}
              >
                <Trophy size={20} color="#ffffff" />
                <Text style={styles.completeButtonText}>Complete</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1e293b", "#334155"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.categoryBadge}>
                {getCategoryIcon(currentScenario.category)}
                <Text style={styles.categoryText}>
                  {currentScenario.category.replace("-", " ").toUpperCase()}
                </Text>
              </View>

              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor: getDifficultyColor(
                      currentScenario.difficulty
                    ),
                  },
                ]}
              >
                <Text style={styles.difficultyText}>
                  {currentScenario.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.scenarioTitle}>{currentScenario.title}</Text>
            <Text style={styles.scenarioDescription}>
              {currentScenario.description}
            </Text>

            {timeLeft !== null && (
              <View style={styles.timerContainer}>
                <Clock size={16} color="#f59e0b" />
                <Text
                  style={[
                    styles.timerText,
                    timeLeft <= 10 && styles.timerWarning,
                  ]}
                >
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </Text>
              </View>
            )}
          </View>

          {/* Situation */}
          <View style={styles.situationCard}>
            <Text style={styles.situationTitle}>The Situation</Text>
            <Text style={styles.situationText}>
              {currentScenario.situation}
            </Text>
          </View>

          {/* Choices */}
          <View style={styles.choicesContainer}>
            <Text style={styles.choicesTitle}>What would you do?</Text>
            {currentScenario.choices.map((choice, index) => (
              <TouchableOpacity
                key={choice.id}
                style={styles.choiceButton}
                onPress={() => handleChoiceSelect(choice)}
                activeOpacity={0.8}
              >
                <View style={styles.choiceContent}>
                  <View style={styles.choiceNumber}>
                    <Text style={styles.choiceNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.choiceButtonText}>{choice.text}</Text>
                  <ArrowRight size={20} color="#6b7280" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Learning Objective */}
          <View style={styles.objectiveCard}>
            <Brain size={20} color="#3b82f6" />
            <View style={styles.objectiveContent}>
              <Text style={styles.objectiveTitle}>Learning Goal</Text>
              <Text style={styles.objectiveText}>
                {currentScenario.learningObjective}
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  scenarioTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    lineHeight: 34,
  },
  scenarioDescription: {
    fontSize: 16,
    color: "#cbd5e1",
    lineHeight: 24,
    marginBottom: 16,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    gap: 8,
  },
  timerText: {
    fontSize: 16,
    color: "#f59e0b",
    fontWeight: "600",
  },
  timerWarning: {
    color: "#ef4444",
  },
  situationCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  situationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 12,
  },
  situationText: {
    fontSize: 16,
    color: "#e2e8f0",
    lineHeight: 24,
  },
  choicesContainer: {
    marginBottom: 24,
  },
  choicesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  choiceButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  choiceContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  choiceNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  choiceNumberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  choiceButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    lineHeight: 22,
  },
  objectiveCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  objectiveContent: {
    flex: 1,
    marginLeft: 12,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#60a5fa",
    marginBottom: 4,
  },
  objectiveText: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  exitButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    flex: 1,
  },
  resultHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  resultIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scoreContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  resultContent: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  choiceSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  choiceText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 22,
  },
  consequenceSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  consequenceText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 22,
  },
  explanationSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  explanationText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 22,
  },
  learningSection: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  learningText: {
    fontSize: 16,
    color: "#1e40af",
    lineHeight: 22,
    fontWeight: "500",
  },
  betterChoiceSection: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  betterChoice: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  betterChoiceText: {
    flex: 1,
    fontSize: 14,
    color: "#059669",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  restartButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b7280",
  },
  completeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
