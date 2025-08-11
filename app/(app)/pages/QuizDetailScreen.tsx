import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  Award,
  Zap,
  Target,
  Trophy,
  Sparkles,
} from "lucide-react-native";

import { saveQuizResult } from "../../../data/quizData";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import API from "../../../api/api";

const QuizDetailScreen = () => {
  const { quizId } = useLocalSearchParams();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const res = await API.get(`/quizzes/${quizId}`);
      const data = res.data;
      console.log("Fetched quiz data:", data);
      setQuiz(data?.quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      Alert.alert("Error", "Failed to load quiz. Please try again later.");
    }
  };

  fetchQuiz();
}, [quizId]);



  console.log("Quiz ID:", quiz);
  // const quiz = quizzes.find((q) => q.id === quizId);

  if (!quiz) {
    return null;
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      API.post(`/quizzes/${quiz._id}/submit`, { answers: newAnswers });
      const score = newAnswers.reduce((total, answer, index) => {
        return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
      }, 0);

      saveQuizResult(quiz.id, score);
      setShowResults(true);

      Alert.alert(
        "Quiz Completed!",
        `You scored ${score} out of ${quiz.questions.length}`,
        [{ text: "OK" }]
      );
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    return answers.reduce((total, answer, index) => {
      return total + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80)
      return "🎉 Outstanding! You're a true expert at protecting yourself from these threats.";
    if (percentage >= 60)
      return "👍 Great work! Review the explanations to master this topic completely.";
    return "💪 Keep going! Every expert was once a beginner. Try again to build your skills.";
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <View style={styles.resultsIconContainer}>
                {percentage >= 80 ? (
                  <Trophy size={48} color="#f59e0b" />
                ) : percentage >= 60 ? (
                  <Target size={48} color="#6366f1" />
                ) : (
                  <Zap size={48} color="#10b981" />
                )}
                <Sparkles
                  size={20}
                  color="#fbbf24"
                  style={styles.sparkleIcon}
                />
              </View>
              <Text style={styles.resultsTitle}>
                {percentage >= 80
                  ? "Excellent Work!"
                  : percentage >= 60
                  ? "Great Progress!"
                  : "Keep Learning!"}
              </Text>
              <View style={styles.scoreContainer}>
                <View
                  style={[
                    styles.scoreBadge,
                    {
                      backgroundColor:
                        percentage >= 80
                          ? "#10b981"
                          : percentage >= 60
                          ? "#6366f1"
                          : "#f59e0b",
                    },
                  ]}
                >
                  <Text style={styles.scoreBadgeText}>
                    {score}/{quiz.questions.length}
                  </Text>
                </View>
                <View
                  style={[
                    styles.percentageBadge,
                    {
                      backgroundColor:
                        percentage >= 80
                          ? "#dcfce7"
                          : percentage >= 60
                          ? "#e0e7ff"
                          : "#fef3c7",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.percentageText,
                      {
                        color:
                          percentage >= 80
                            ? "#166534"
                            : percentage >= 60
                            ? "#3730a3"
                            : "#92400e",
                      },
                    ]}
                  >
                    {percentage}%
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.resultsContent}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.scoreMessage}>{getScoreMessage(score)}</Text>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewTitle}>Review Your Answers:</Text>
                {quiz.questions.map((question, index) => (
                  <View key={question.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      {answers[index] === question.correctAnswer ? (
                        <CheckCircle size={20} color="#22c55e" />
                      ) : (
                        <XCircle size={20} color="#ef4444" />
                      )}
                      <View style={styles.reviewContent}>
                        <Text style={styles.reviewQuestion}>
                          {question.question}
                        </Text>
                        <Text style={styles.reviewAnswer}>
                          Your answer: {question.options[answers[index]]}
                        </Text>
                        {answers[index] !== question.correctAnswer && (
                          <Text style={styles.reviewCorrect}>
                            Correct: {question.options[question.correctAnswer]}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View style={[styles.actionButtons, { paddingHorizontal: 4 }]}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={restartQuiz}
                >
                  <RotateCcw size={16} color="#1a4b8c" />
                  <Text style={styles.secondaryButtonText}>Retake Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => router.push("/pages/QuizzesScreen")}
                >
                  <Home size={16} color="#ffffff" />
                  <Text style={styles.primaryButtonText}>Back to Quizzes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={["#6366f1", "#8b5cf6"]}
            style={styles.headerGradient}
          >
            <View style={styles.headerGradient}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </Text>
                <View
                  style={[
                    styles.categoryBadge,
                    quiz.category === "fraud"
                      ? styles.fraudCategoryBadge
                      : styles.financialCategoryBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryBadgeText,
                      quiz.category === "fraud"
                        ? styles.fraudCategoryText
                        : styles.financialCategoryText,
                    ]}
                  >
                    {quiz.category === "fraud"
                      ? "Fraud Protection"
                      : "Financial Mastery"}
                  </Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption,
                  showExplanation && styles.disabledOption,
                ]}
                onPress={() => handleAnswerSelect(index)}
                disabled={showExplanation}
              >
                <Text style={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}.
                </Text>
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === index && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View style={styles.explanationCard}>
            <View style={styles.explanationHeader}>
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle size={20} color="#22c55e" />
              ) : (
                <XCircle size={20} color="#ef4444" />
              )}
              <Text
                style={[
                  styles.explanationResult,
                  selectedAnswer === question.correctAnswer
                    ? styles.correctResult
                    : styles.incorrectResult,
                ]}
              >
                {selectedAnswer === question.correctAnswer
                  ? "Correct!"
                  : "Incorrect"}
              </Text>
            </View>
            <Text style={styles.explanationText}>{question.explanation}</Text>
            {selectedAnswer !== question.correctAnswer && (
              <Text style={styles.correctAnswerText}>
                Correct answer:{" "}
                {String.fromCharCode(65 + question.correctAnswer)}.{" "}
                {question.options[question.correctAnswer]}
              </Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Back to Quizzes</Text>
          </TouchableOpacity>

          {!showExplanation ? (
            <TouchableOpacity
              style={[
                styles.primaryButton,
                selectedAnswer === null && styles.disabledButton,
              ]}
              onPress={handleShowExplanation}
              disabled={selectedAnswer === null}
            >
              <Text style={styles.primaryButtonText}>Show Explanation</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleNextQuestion}
            >
              <Text style={styles.primaryButtonText}>
                {currentQuestion < quiz.questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    overflow: "hidden",
  },
  headerGradient: {
    // backgroundColor: "#6366f1",
    // background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    padding: 20,
    // paddingBottom: 32,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
    letterSpacing: 0.9,
    textAlign: "center",
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fraudCategoryBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  financialCategoryBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  fraudCategoryText: {
    color: "#fca5a5",
  },
  financialCategoryText: {
    color: "#6ee7b7",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  questionCard: {
    backgroundColor: "#ffffff",
    margin: 24,
    // marginTop: -16,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  questionText: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedOption: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginRight: 12,
    minWidth: 28,
  },
  optionText: {
    fontSize: 16,
    color: "#1f2937",
    flex: 1,
    lineHeight: 24,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  explanationCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  explanationResult: {
    fontSize: 16,
    fontWeight: "700",
  },
  correctResult: {
    color: "#10b981",
  },
  incorrectResult: {
    color: "#ef4444",
  },
  explanationText: {
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 22,
    marginBottom: 12,
  },
  correctAnswerText: {
    fontSize: 15,
    color: "#10b981",
    lineHeight: 22,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#6366f1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 0,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  secondaryButtonText: {
    color: "#6366f1",
    fontSize: 16,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.6,
  },
  resultsContainer: {
    padding: 32,
  },
  resultsHeader: {
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  resultsIconContainer: {
    position: "relative",
    marginBottom: 20,
  },
  sparkleIcon: {
    position: "absolute",
    top: -8,
    right: -8,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 20,
    textAlign: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  scoreBadge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  percentageBadge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  scoreBadgeText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "800",
  },
  resultsContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  scoreMessage: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    fontWeight: "500",
  },
  reviewSection: {
    marginBottom: 32,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  reviewItem: {
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fafbfc",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewQuestion: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 22,
  },
  reviewAnswer: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  reviewCorrect: {
    fontSize: 13,
    color: "#10b981",
    fontWeight: "600",
  },
});

export default QuizDetailScreen;
