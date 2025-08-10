import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import {
  ArrowLeft,
  Timer,
  Flag,
  CheckCircle,
  Trophy,
  Frown,
  RotateCcw,
  GraduationCap,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

interface RedFlag {
  id: number;
  text: string;
  isRedFlag: boolean;
  explanation: string;
}

const redFlagScenarios: RedFlag[][] = [
  [
    {
      id: 1,
      text: "Guaranteed 50% returns in 30 days with zero risk!",
      isRedFlag: true,
      explanation:
        "No legitimate investment can guarantee high returns with zero risk.",
    },
    {
      id: 2,
      text: "Invest in our diversified mutual fund portfolio",
      isRedFlag: false,
      explanation: "Legitimate investment option with proper risk disclosure.",
    },
    {
      id: 3,
      text: "Limited time offer - only 10 spots left!",
      isRedFlag: true,
      explanation:
        "Pressure tactics and artificial scarcity are common scam techniques.",
    },
    {
      id: 4,
      text: "SEBI registered investment advisory services",
      isRedFlag: false,
      explanation: "Proper regulatory registration is a good sign.",
    },
  ],
  [
    {
      id: 5,
      text: "Earn money by just referring friends - no products needed!",
      isRedFlag: true,
      explanation:
        "Focus on recruitment over products is a pyramid scheme indicator.",
    },
    {
      id: 6,
      text: "Our company has been profitable for 15 years",
      isRedFlag: false,
      explanation: "Long track record can indicate legitimacy (if verifiable).",
    },
    {
      id: 7,
      text: "Secret investment strategy - can't reveal details",
      isRedFlag: true,
      explanation:
        "Lack of transparency about investment methods is suspicious.",
    },
    {
      id: 8,
      text: "Here's our detailed annual report and audit",
      isRedFlag: false,
      explanation: "Transparency and proper documentation are positive signs.",
    },
  ],
];

const RedFlagsGame = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState<
    "playing" | "feedback" | "finished"
  >("playing");
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [totalQuestions] = useState(redFlagScenarios.flat().length);

  const scaleAnimation = useSharedValue(1);
  const shakeAnimation = useSharedValue(0);
  const progressAnimation = useSharedValue(0);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  useEffect(() => {
    const progress =
      ((currentScenario * 4 + currentQuestion) / totalQuestions) * 100;
    progressAnimation.value = withTiming(progress, { duration: 500 });
  }, [currentScenario, currentQuestion]);

  const handleTimeout = () => {
    setSelectedAnswer(null);
    setGameState("feedback");
    shakeAnimation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const handleAnswer = (isRedFlag: boolean) => {
    if (gameState !== "playing") return;

    setSelectedAnswer(isRedFlag);
    setGameState("feedback");

    const currentFlag = redFlagScenarios[currentScenario][currentQuestion];
    const isCorrect = isRedFlag === currentFlag.isRedFlag;

    if (isCorrect) {
      setScore(score + 1);
      scaleAnimation.value = withSequence(
        withSpring(1.2, { duration: 200 }),
        withSpring(1, { duration: 200 })
      );
    } else {
      shakeAnimation.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentScenario < redFlagScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setCurrentQuestion(0);
    } else {
      setGameState("finished");
      return;
    }

    setTimeLeft(15);
    setGameState("playing");
    setSelectedAnswer(null);
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setGameState("playing");
    setSelectedAnswer(null);
  };

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnimation.value }],
    };
  });

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressAnimation.value}%`,
    };
  });

  const currentFlag = redFlagScenarios[currentScenario]?.[currentQuestion];

  if (gameState === "finished") {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isGoodScore = percentage >= 70;

    return (
      <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.finishedContainer}>
            <Animated.View style={[styles.resultCard, scaleStyle]}>
              {isGoodScore ? (
                <Trophy size={80} color="#ffd93d" />
              ) : (
                <Frown size={80} color="#ff6b6b" />
              )}
              <Text style={styles.resultTitle}>
                {isGoodScore ? "Excellent!" : "Keep Learning!"}
              </Text>
              <Text style={styles.resultScore}>
                {score} / {totalQuestions} ({percentage}%)
              </Text>
              <Text style={styles.resultMessage}>
                {isGoodScore
                  ? "You're great at spotting red flags! You're well-protected against scams."
                  : "Practice makes perfect! Review the education section to improve your fraud detection skills."}
              </Text>

              <View style={styles.resultButtons}>
                <TouchableOpacity
                  style={[styles.resultButton, { backgroundColor: "#4ecdc4" }]}
                  onPress={resetGame}
                >
                  <RotateCcw size={20} color="white" />
                  <Text style={styles.resultButtonText}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.resultButton, { backgroundColor: "#45b7d1" }]}
                  onPress={() => router.push("/(app)/(tabs)/education")}
                >
                  <GraduationCap size={20} color="white" />
                  <Text style={styles.resultButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Red Flag Detection</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {score}/{totalQuestions}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, progressStyle]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentScenario * 4 + currentQuestion + 1} of{" "}
            {totalQuestions}
          </Text>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Timer size={24} color="#ffd93d" />
          <Text
            style={[styles.timerText, timeLeft <= 5 && styles.timerWarning]}
          >
            {timeLeft}s
          </Text>
        </View>

        {/* Question */}
        <Animated.View style={[styles.questionContainer, shakeStyle]}>
          <Text style={styles.questionTitle}>Is this a red flag?</Text>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{currentFlag?.text}</Text>
          </View>
        </Animated.View>

        {/* Answer Buttons */}
        {gameState === "playing" && (
          <View style={styles.answerContainer}>
            <TouchableOpacity
              style={[styles.answerButton, styles.redFlagButton]}
              onPress={() => handleAnswer(true)}
              activeOpacity={0.8}
            >
              <Flag size={32} color="white" />
              <Text style={styles.answerButtonText}>Red Flag!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.answerButton, styles.safeButton]}
              onPress={() => handleAnswer(false)}
              activeOpacity={0.8}
            >
              <CheckCircle size={32} color="white" />
              <Text style={styles.answerButtonText}>Looks Safe</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Feedback */}
        {gameState === "feedback" && (
          <View style={styles.feedbackContainer}>
            <View
              style={[
                styles.feedbackCard,
                selectedAnswer === currentFlag?.isRedFlag
                  ? styles.correctFeedback
                  : styles.incorrectFeedback,
              ]}
            >
              {selectedAnswer === currentFlag?.isRedFlag ? (
                <CheckCircle size={32} color="white" />
              ) : (
                <Text style={styles.feedbackIcon}>❌</Text>
              )}
              <Text style={styles.feedbackTitle}>
                {selectedAnswer === currentFlag?.isRedFlag
                  ? "Correct!"
                  : selectedAnswer === null
                  ? "Time's Up!"
                  : "Incorrect"}
              </Text>
              <Text style={styles.feedbackExplanation}>
                {currentFlag?.explanation}
              </Text>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentScenario === redFlagScenarios.length - 1 &&
                currentQuestion === 3
                  ? "Finish Game"
                  : "Next Question"}
              </Text>
              <Text style={styles.nextButtonIcon}>→</Text>
            </TouchableOpacity>
          </View>
        )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  scoreContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  scoreText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ecdc4",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: "#b8b8b8",
    textAlign: "center",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
  },
  timerWarning: {
    color: "#ff6b6b",
  },
  questionContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  questionText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    lineHeight: 26,
  },
  answerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  redFlagButton: {
    backgroundColor: "#ff6b6b",
  },
  safeButton: {
    backgroundColor: "#4ecdc4",
  },
  answerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  feedbackContainer: {
    paddingHorizontal: 20,
  },
  feedbackCard: {
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    marginBottom: 30,
  },
  correctFeedback: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderColor: "#22c55e",
    borderWidth: 1,
  },
  incorrectFeedback: {
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    borderColor: "#ff6b6b",
    borderWidth: 1,
  },
  feedbackIcon: {
    fontSize: 32,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginBottom: 15,
  },
  feedbackExplanation: {
    fontSize: 16,
    color: "#b8b8b8",
    textAlign: "center",
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: "#45b7d1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  nextButtonIcon: {
    color: "white",
    fontSize: 20,
  },
  finishedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  resultCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
  },
  resultScore: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4ecdc4",
    marginBottom: 20,
  },
  resultMessage: {
    fontSize: 16,
    color: "#b8b8b8",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  resultButtons: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  resultButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  resultButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default RedFlagsGame;
