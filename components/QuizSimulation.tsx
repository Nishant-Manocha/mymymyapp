import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuizSimulationProps {
  onComplete: (score: number) => void;
}

const QuizSimulation = ({ onComplete }: QuizSimulationProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "You receive an SMS: 'Your account will be blocked in 2 hours. Click here to verify: bit.ly/bank123'. What should you do?",
      options: [
        "Click the link immediately to save my account",
        "Call my bank's official customer service number",
        "Forward the message to friends for advice",
        "Reply to the SMS asking for more details"
      ],
      correct: 1,
      explanation: "Always verify suspicious messages through official channels. Banks never send urgent links via SMS."
    },
    {
      question: "Which of these URLs is likely legitimate for State Bank of India?",
      options: [
        "https://secure-sbi-verify.com",
        "https://onlinesbi.sbi.co.in",
        "https://sbi-banking-secure.org",
        "https://sbibank-official.net"
      ],
      correct: 1,
      explanation: "Official SBI domain is sbi.co.in. Be wary of variations or different domains."
    },
    {
      question: "A caller says they're from your bank and asks for your OTP to 'verify your identity'. You should:",
      options: [
        "Provide the OTP since they called me",
        "Ask them to wait while I call back on the official number",
        "Give them my account number instead",
        "Hang up immediately and never share OTPs over phone"
      ],
      correct: 3,
      explanation: "Never share OTPs with anyone over phone calls. Banks never ask for OTPs to verify your identity."
    },
    {
      question: "What's the biggest red flag in this email: 'Dear Customer, You have won ₹50,000! Click here to claim your prize before it expires in 24 hours!'",
      options: [
        "It's addressed to 'Dear Customer'",
        "The urgent 24-hour deadline",
        "Unexpected prize announcement",
        "All of the above"
      ],
      correct: 3,
      explanation: "All these elements are classic phishing tactics: generic greeting, false urgency, and unexpected rewards."
    },
    {
      question: "Your friend forwards a message: 'Government is giving ₹2000 to everyone. Register here with Aadhaar: gov-benefit.in'. What do you do?",
      options: [
        "Register immediately before the offer ends",
        "Check official government websites first",
        "Ask my friend where they got this information",
        "Both B and C"
      ],
      correct: 3,
      explanation: "Always verify such claims through official government websites and question the source of information."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex.toString()];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (parseInt(answer) === questions[index].correct ? 1 : 0);
      }, 0);
      setShowResult(true);
      setTimeout(() => onComplete(score), 3000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return '#10B981';
    if (score >= 3) return '#F59E0B';
    return '#DC2626';
  };

  const getScoreMessage = (score: number) => {
    if (score === 5) return "🎉 Excellent! You're well-protected against phishing!";
    if (score === 4) return "👍 Great job! Just a bit more awareness needed.";
    if (score === 3) return "⚠️ Good start, but please review the security tips.";
    return "🚨 High risk! Please take cybersecurity seriously.";
  };

  if (showResult) {
    const score = answers.reduce((acc, answer, index) => {
      return acc + (parseInt(answer) === questions[index].correct ? 1 : 0);
    }, 0);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <View style={styles.resultIcon}>
              <Ionicons name="trophy" size={32} color="#FFF" />
            </View>
            
            <Text style={styles.resultTitle}>Quiz Complete!</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreText, { color: getScoreColor(score) }]}>
                {score}/5
              </Text>
              <Text style={styles.scoreMessage}>
                {getScoreMessage(score)}
              </Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(score / 5) * 100}%`,
                      backgroundColor: getScoreColor(score)
                    }
                  ]} 
                />
              </View>
            </View>

            <Text style={styles.redirectText}>
              Redirecting to security tips in a moment...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Security Awareness Quiz</Text>
            </View>
            <Text style={styles.questionCounter}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            {questions[currentQuestion].question}
          </Text>
          
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(index)}
              >
                <Text style={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}.
                </Text>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Take your time and choose the safest option
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  questionCounter: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  questionCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 32,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 28,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginRight: 12,
    minWidth: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
  },
  resultIcon: {
    backgroundColor: '#3B82F6',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreMessage: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
  redirectText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default QuizSimulation;