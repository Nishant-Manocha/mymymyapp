import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  CreditCard,
  DollarSign,
  TrendingDown,
  TriangleAlert as AlertTriangle,
  ArrowRight,
  Clock,
} from "lucide-react-native";

export default function LoanFraudScreen() {
  const router = useRouter();
  const [timelineStep, setTimelineStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);

  const timeline = [
    {
      time: "10:30 AM",
      event: "Loan application submitted using your identity",
      amount: 0,
    },
    {
      time: "10:45 AM",
      event: "Quick approval due to your good credit score",
      amount: 0,
    },
    {
      time: "11:00 AM",
      event: "OTP verification (received by scammer)",
      amount: 0,
    },
    {
      time: "11:15 AM",
      event: "Loan of ₹50,000 approved and disbursed",
      amount: 50000,
    },
    {
      time: "11:30 AM",
      event: "Scammer withdraws cash from ATM",
      amount: 50000,
    },
    {
      time: "12:00 PM",
      event: "Additional loan of ₹25,000 approved",
      amount: 75000,
    },
    {
      time: "12:30 PM",
      event: "Credit card applied using your details",
      amount: 75000,
    },
    {
      time: "01:00 PM",
      event: "Credit card approved with ₹1,00,000 limit",
      amount: 175000,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimelineStep((prev) => {
        if (prev < timeline.length - 1) {
          const nextStep = prev + 1;
          setLoanAmount(timeline[nextStep].amount);
          return nextStep;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CreditCard size={40} color="#F56565" />
        <Text style={styles.title}>Loan Fraud in Progress</Text>
        <Text style={styles.subtitle}>Real-time financial damage</Text>
      </View>

      <View style={styles.damageBox}>
        <DollarSign size={32} color="#FFFFFF" />
        <Text style={styles.damageAmount}>₹{loanAmount.toLocaleString()}</Text>
        <Text style={styles.damageText}>Total debt created in your name</Text>
        <TrendingDown size={24} color="#FFFFFF" />
      </View>

      <View style={styles.timelineContainer}>
        <Text style={styles.timelineTitle}>Fraud Timeline - Today</Text>

        {timeline.map((item, index) => (
          <View
            key={index}
            style={[
              styles.timelineItem,
              index <= timelineStep
                ? styles.timelineItemActive
                : styles.timelineItemInactive,
            ]}
          >
            <View style={styles.timelineTime}>
              <Clock
                size={16}
                color={index <= timelineStep ? "#F56565" : "#CBD5E0"}
              />
              <Text
                style={[
                  styles.timeText,
                  index <= timelineStep
                    ? styles.timeTextActive
                    : styles.timeTextInactive,
                ]}
              >
                {item.time}
              </Text>
            </View>
            <View style={styles.timelineContent}>
              <Text
                style={[
                  styles.eventText,
                  index <= timelineStep
                    ? styles.eventTextActive
                    : styles.eventTextInactive,
                ]}
              >
                {item.event}
              </Text>
              {item.amount > 0 && index <= timelineStep && (
                <Text style={styles.amountText}>
                  ₹{item.amount.toLocaleString()}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.consequencesBox}>
        <AlertTriangle size={24} color="#F6AD55" />
        <Text style={styles.consequencesTitle}>Consequences You'll Face:</Text>
        <Text style={styles.consequenceItem}>
          📉 Credit score severely damaged
        </Text>
        <Text style={styles.consequenceItem}>
          💰 Responsible for all fraudulent loans
        </Text>
        <Text style={styles.consequenceItem}>
          📞 Constant calls from recovery agents
        </Text>
        <Text style={styles.consequenceItem}>
          ⚖️ Potential legal action from banks
        </Text>
        <Text style={styles.consequenceItem}>
          🏠 Difficulty getting future loans
        </Text>
      </View>

      <View style={styles.processBox}>
        <Text style={styles.processTitle}>How This Happened:</Text>
        <Text style={styles.processStep}>
          1. Your personal documents from the "contest" were used
        </Text>
        <Text style={styles.processStep}>
          2. Scammer's cloned SIM received all OTPs
        </Text>
        <Text style={styles.processStep}>
          3. Your good credit score fast-tracked approvals
        </Text>
        <Text style={styles.processStep}>
          4. Multiple loans taken simultaneously
        </Text>
        <Text style={styles.processStep}>
          5. Money withdrawn immediately to avoid detection
        </Text>
      </View>

      <TouchableOpacity
        style={styles.summaryButton}
        onPress={() =>
          router.push("/pages/identityTheftSimulator/educational-summary")
        }
      >
        <Text style={styles.summaryButtonText}>View Educational Summary</Text>
        <ArrowRight size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.realityCheck}>
        <Text style={styles.realityText}>
          💡 In reality, victims often discover the fraud only when they receive
          loan default notices months later.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#F56565",
    marginTop: 4,
  },
  damageBox: {
    backgroundColor: "#F56565",
    padding: 24,
    margin: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  damageAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 8,
  },
  damageText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  timelineContainer: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  timelineItemActive: {
    opacity: 1,
  },
  timelineItemInactive: {
    opacity: 0.4,
  },
  timelineTime: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    marginRight: 16,
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  timeTextActive: {
    color: "#F56565",
    fontWeight: "600",
  },
  timeTextInactive: {
    color: "#CBD5E0",
  },
  timelineContent: {
    flex: 1,
  },
  eventText: {
    fontSize: 14,
    lineHeight: 20,
  },
  eventTextActive: {
    color: "#2D3748",
  },
  eventTextInactive: {
    color: "#A0AEC0",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F56565",
    marginTop: 4,
  },
  consequencesBox: {
    backgroundColor: "#FFF3CD",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFEAA7",
  },
  consequencesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#856404",
    marginTop: 8,
    marginBottom: 12,
  },
  consequenceItem: {
    fontSize: 14,
    color: "#856404",
    lineHeight: 22,
    marginBottom: 6,
  },
  processBox: {
    backgroundColor: "#E6F3FF",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4299E1",
  },
  processTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B6CB0",
    marginBottom: 12,
  },
  processStep: {
    fontSize: 14,
    color: "#2B6CB0",
    lineHeight: 20,
    marginBottom: 8,
  },
  summaryButton: {
    backgroundColor: "#3182CE",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  summaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  realityCheck: {
    backgroundColor: "#E6FFFA",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#38B2AC",
  },
  realityText: {
    fontSize: 14,
    color: "#234E52",
    lineHeight: 20,
    textAlign: "center",
  },
});
