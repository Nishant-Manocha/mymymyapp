import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { markLessonCompleted } from "../../../data/lessonsData";

const QuizScreen: React.FC = ({ route, navigation }: any) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { lesson, language } = route.params || {};

  if (!lesson || !lesson.quiz) {
    navigation.goBack();
    return null;
  }

  const quiz = lesson.quiz;
  const totalQuestions = quiz.length;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      const correctAnswers = quiz.reduce((acc, question, index) => {
        return acc + (selectedAnswers[index] === question.correct ? 1 : 0);
      }, 0);

      setScore(correctAnswers);
      setShowResults(true);

      // Mark lesson as completed if passed
      if (correctAnswers >= Math.ceil(totalQuestions * 0.6)) {
        markLessonCompleted(lesson.id);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleBack = () => {
    navigation.navigate("Language");
  };

  const currentQ = quiz[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
  const passingScore = Math.ceil(totalQuestions * 0.6);
  const passed = score >= passingScore;

  if (showResults) {
    return (
      <LinearGradient colors={["#f0f9ff", "#e0f2fe"]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.resultsContainer}>
            <View style={styles.resultsCard}>
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.6)"]}
                style={styles.resultsGradient}
              >
                <View
                  style={[
                    styles.resultIcon,
                    {
                      backgroundColor: passed
                        ? "rgba(5, 150, 105, 0.2)"
                        : "rgba(220, 38, 38, 0.2)",
                    },
                  ]}
                >
                  {passed ? (
                    <Trophy size={40} color="#059669" />
                  ) : (
                    <XCircle size={40} color="#dc2626" />
                  )}
                </View>

                <Text style={styles.resultTitle}>
                  {passed ? "Congratulations!" : "Try Again!"}
                </Text>

                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreText}>
                    {score}/{totalQuestions}
                  </Text>
                  <Text style={styles.scoreDescription}>
                    {passed
                      ? "You have successfully completed this lesson!"
                      : `You need ${passingScore} correct answers to pass.`}
                  </Text>
                </View>

                <View style={styles.answersContainer}>
                  {quiz.map((question, index) => (
                    <View key={question.id} style={styles.answerRow}>
                      <Text style={styles.answerText}>
                        Question {index + 1}
                      </Text>
                      {selectedAnswers[index] === question.correct ? (
                        <CheckCircle size={20} color="#059669" />
                      ) : (
                        <XCircle size={20} color="#dc2626" />
                      )}
                    </View>
                  ))}
                </View>

                <View style={styles.resultButtons}>
                  <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={handleRetake}
                    activeOpacity={0.8}
                  >
                    <View style={styles.retakeButtonContent}>
                      <RotateCcw
                        size={16}
                        color="#1e40af"
                        style={{ marginRight: 8 }}
                      />
                      <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={["#3b82f6", "#1d4ed8"]}
                      style={styles.backButtonGradient}
                    >
                      <Text style={styles.backButtonText}>Back to Lessons</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
              style={styles.headerBackButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <ArrowLeft size={20} color="#1e40af" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {lesson.title} - Quiz
              </Text>
              <Text style={styles.headerSubtitle}>
                Question {currentQuestion + 1} of {totalQuestions}
              </Text>
            </View>
            <View style={styles.progressBadge}>
              <Text style={styles.progressText}>
                {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.6)"]}
              style={styles.cardGradient}
            >
              <Text style={styles.questionText}>{currentQ.question}</Text>

              <View style={styles.optionsContainer}>
                {currentQ.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswers[currentQuestion] === index &&
                        styles.optionButtonSelected,
                    ]}
                    onPress={() => handleAnswerSelect(index)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionContent}>
                      <View
                        style={[
                          styles.radioButton,
                          selectedAnswers[currentQuestion] === index &&
                            styles.radioButtonSelected,
                        ]}
                      >
                        {selectedAnswers[currentQuestion] === index && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          selectedAnswers[currentQuestion] === index &&
                            styles.optionTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestion === 0 && styles.navButtonDisabled,
              ]}
              onPress={handlePrevious}
              disabled={currentQuestion === 0}
              activeOpacity={0.8}
            >
              <View style={styles.navButtonContent}>
                <ArrowLeft
                  size={16}
                  color={currentQuestion === 0 ? "#9ca3af" : "#1e40af"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    styles.navButtonText,
                    currentQuestion === 0 && styles.navButtonTextDisabled,
                  ]}
                >
                  Previous
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nextButton,
                !hasAnswered && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!hasAnswered}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  hasAnswered ? ["#3b82f6", "#1d4ed8"] : ["#9ca3af", "#6b7280"]
                }
                style={styles.nextButtonGradient}
              >
                <Text style={styles.nextButtonText}>
                  {isLastQuestion ? "Finish Quiz" : "Next"}
                </Text>
                {!isLastQuestion && (
                  <ArrowLeft
                    size={16}
                    color="white"
                    style={{ marginLeft: 8, transform: [{ rotate: "180deg" }] }}
                  />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
  },
  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(30, 64, 175, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  progressBadge: {
    backgroundColor: "rgba(30, 64, 175, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(30, 64, 175, 0.2)",
  },
  progressText: {
    fontSize: 12,
    color: "#1e40af",
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
  },
  questionCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginBottom: 24,
  },
  cardGradient: {
    padding: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    lineHeight: 26,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  optionButtonSelected: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
  },
  optionText: {
    fontSize: 16,
    color: "#1f2937",
    flex: 1,
    lineHeight: 22,
  },
  optionTextSelected: {
    color: "white",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  navButton: {
    backgroundColor: "rgba(30, 64, 175, 0.1)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(30, 64, 175, 0.2)",
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16,
    color: "#1e40af",
    fontWeight: "600",
  },
  navButtonTextDisabled: {
    color: "#9ca3af",
  },
  nextButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  // Results styles
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  resultsCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  resultsGradient: {
    padding: 32,
    alignItems: "center",
  },
  resultIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 8,
  },
  scoreDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  answersContainer: {
    width: "100%",
    marginBottom: 32,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    color: "#1f2937",
  },
  resultButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  retakeButton: {
    flex: 1,
    backgroundColor: "rgba(30, 64, 175, 0.1)",
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(30, 64, 175, 0.2)",
  },
  retakeButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
  backButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  backButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default QuizScreen;
