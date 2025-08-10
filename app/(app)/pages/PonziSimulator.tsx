import React, { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { ArrowLeft, IndianRupee } from "lucide-react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { PonziTreeVisualization } from "../../../components/PonziTreeVisualization";
import {
  Users,
  DollarSign,
  TrendingDown,
  BarChart3,
  UserPlus,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";

interface Investor {
  id: number;
  name: string;
  investment: number;
  recruits: number[];
  totalEarned: number;
  netProfit: number;
  joinedRound: number;
  level: number;
}

interface SimulationState {
  investors: Investor[];
  totalInvested: number;
  totalPaidOut: number;
  currentRound: number;
  isCollapsed: boolean;
  newInvestorsPerRound: number;
  payoutRate: number;
}

const { width } = Dimensions.get("window");

const SimulatorScreen = ({ navigation }: any) => {
  const { theme } = useTheme();

  const [simulation, setSimulation] = useState<SimulationState>({
    investors: [
      {
        id: 1,
        name: "Founder (You)",
        investment: 1000,
        recruits: [],
        totalEarned: 0,
        netProfit: -1000,
        joinedRound: 0,
        level: 0,
      },
    ],
    totalInvested: 1000,
    totalPaidOut: 0,
    currentRound: 0,
    isCollapsed: false,
    newInvestorsPerRound: 2,
    payoutRate: 0.2,
  });

  const [investmentAmount, setInvestmentAmount] = useState("500");
  const [autoRunning, setAutoRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const addInvestors = useCallback(
    (count: number) => {
      if (simulation.isCollapsed) return;

      setSimulation((prev) => {
        const newInvestors: Investor[] = [];
        const currentLevel =
          Math.floor(Math.log2(prev.investors.length + count)) + 1;

        for (let i = 0; i < count; i++) {
          const newInvestor: Investor = {
            id: prev.investors.length + i + 1,
            name: `Investor ${prev.investors.length + i + 1}`,
            investment: parseInt(investmentAmount),
            recruits: [],
            totalEarned: 0,
            netProfit: -parseInt(investmentAmount),
            joinedRound: prev.currentRound + 1,
            level: currentLevel,
          };
          newInvestors.push(newInvestor);
        }

        const totalNewMoney = count * parseInt(investmentAmount);
        const availableForPayouts = totalNewMoney * 0.8;

        const updatedInvestors = [...prev.investors];
        let remainingPayout = availableForPayouts;

        for (
          let i = 0;
          i < updatedInvestors.length && remainingPayout > 0;
          i++
        ) {
          const payout = Math.min(
            remainingPayout,
            updatedInvestors[i].investment * prev.payoutRate
          );
          updatedInvestors[i].totalEarned += payout;
          updatedInvestors[i].netProfit += payout;
          remainingPayout -= payout;
        }

        return {
          ...prev,
          investors: [...updatedInvestors, ...newInvestors],
          totalInvested: prev.totalInvested + totalNewMoney,
          totalPaidOut:
            prev.totalPaidOut + (availableForPayouts - remainingPayout),
          currentRound: prev.currentRound + 1,
        };
      });
    },
    [investmentAmount, simulation.isCollapsed]
  );

  useEffect(() => {
    const checkCollapse = () => {
      const recentInvestors = simulation.investors.filter(
        (inv) => inv.joinedRound >= simulation.currentRound - 2
      ).length;

      const growthRate =
        recentInvestors / Math.max(1, simulation.investors.length * 0.3);

      if (
        simulation.currentRound > 5 &&
        (growthRate < 0.1 || Math.random() < 0.15)
      ) {
        setSimulation((prev) => ({ ...prev, isCollapsed: true }));
        setAutoRunning(false);
        Alert.alert(
          "SCHEME COLLAPSED!",
          `The Ponzi scheme has collapsed! ${
            simulation.investors.filter((inv) => inv.netProfit < 0).length
          } people lost their money.`
        );
      }
    };

    if (simulation.currentRound > 3 && !simulation.isCollapsed) {
      checkCollapse();
    }
  }, [
    simulation.currentRound,
    simulation.investors.length,
    simulation.isCollapsed,
  ]);

  useEffect(() => {
    if (autoRunning && !simulation.isCollapsed) {
      const interval = setInterval(() => {
        const newCount = Math.max(
          1,
          Math.floor(Math.random() * simulation.newInvestorsPerRound) + 1
        );
        addInvestors(newCount);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [
    autoRunning,
    simulation.isCollapsed,
    addInvestors,
    simulation.newInvestorsPerRound,
  ]);

  const resetSimulation = () => {
    setSimulation({
      investors: [
        {
          id: 1,
          name: "Founder (You)",
          investment: 1000,
          recruits: [],
          totalEarned: 0,
          netProfit: -1000,
          joinedRound: 0,
          level: 0,
        },
      ],
      totalInvested: 1000,
      totalPaidOut: 0,
      currentRound: 0,
      isCollapsed: false,
      newInvestorsPerRound: 2,
      payoutRate: 0.2,
    });
    setAutoRunning(false);
    setGameStarted(false);
  };

  const deficit = simulation.totalInvested - simulation.totalPaidOut;
  const peopleInProfit = simulation.investors.filter(
    (inv) => inv.netProfit > 0
  ).length;
  const peopleInLoss = simulation.investors.filter(
    (inv) => inv.netProfit < 0
  ).length;

  return (
    <LinearGradient
      colors={[theme.colors.background[0], theme.colors.background[1]]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Ponzi Simulator
              </Text>
              <Text
                style={[styles.subtitle, { color: theme.colors.textSecondary }]}
              >
                Experience the rise and fall
              </Text>
            </View>
          </View>

          {/* Simulation Stats */}
          <View style={styles.statsContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Simulation Status
            </Text>
            <View style={styles.statsGrid}>
              <View
                style={[
                  styles.statCard,
                  // { backgroundColor: theme.colors.card },
                ]}
              >
                <Users size={24} color="#4ecdc4" />
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {simulation.investors.length}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Total Investors
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  // { backgroundColor: theme.colors.card },
                ]}
              >
                <IndianRupee size={24} color="#45b7d1" />
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  ₹{simulation.totalInvested.toLocaleString()}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Total Invested
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  // { backgroundColor: theme.colors.card },
                ]}
              >
                <TrendingDown size={24} color="#ff6b6b" />
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  ₹{deficit.toLocaleString()}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Money Owed
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  // { backgroundColor: theme.colors.card },
                ]}
              >
                <BarChart3 size={24} color="#96ceb4" />
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {simulation.currentRound}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Round
                </Text>
              </View>
            </View>
          </View>

          {/* Control Panel */}
          {/* {selectedRole === "founder" && ( */}
          <View style={styles.controlPanel}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Scheme Controls
            </Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: "#4ecdc4" }]}
                onPress={() => addInvestors(1)}
                disabled={simulation.isCollapsed}
              >
                <UserPlus size={20} color="white" />
                <Text style={styles.controlButtonText}>Add 1 Investor</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: "#45b7d1" }]}
                onPress={() => addInvestors(3)}
                disabled={simulation.isCollapsed}
              >
                <Users size={20} color="white" />
                <Text style={styles.controlButtonText}>Add 3 Investors</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.controlButton,
                  { backgroundColor: autoRunning ? "#ff6b6b" : "#96ceb4" },
                ]}
                onPress={() => setAutoRunning(!autoRunning)}
                disabled={simulation.isCollapsed}
              >
                {autoRunning ? (
                  <Pause size={20} color="white" />
                ) : (
                  <Play size={20} color="white" />
                )}
                <Text style={styles.controlButtonText}>
                  {autoRunning ? "Stop Auto" : "Auto Run"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: "#ff6b6b" }]}
                onPress={resetSimulation}
              >
                <RotateCcw size={20} color="white" />
                <Text style={styles.controlButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* )} */}

          {/* Tree Visualization */}
          <View style={styles.visualizationContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Pyramid Structure
            </Text>
            <PonziTreeVisualization
              investors={simulation.investors}
              isCollapsed={simulation.isCollapsed}
            />
          </View>

          {/* Collapse Alert */}
          {simulation.isCollapsed && (
            <Animated.View style={[styles.collapseAlert]}>
              <Text style={styles.collapseIcon}>⚠️</Text>
              <Text style={styles.collapseTitle}>SCHEME COLLAPSED!</Text>
              <Text style={[styles.collapseText, { color: theme.colors.text }]}>
                • New investors stopped joining{"\n"}• No money left to pay
                existing investors{"\n"}• {peopleInLoss} people lost their money
                {"\n"}• Only {peopleInProfit} early investors made profit{"\n"}•
                ₹{deficit.toLocaleString()} in losses cannot be recovered
              </Text>
            </Animated.View>
          )}

          {/* Educational Insights */}
          <View style={styles.insightsContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Key Insights
            </Text>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>📈</Text>
              <View style={styles.insightContent}>
                <Text
                  style={[styles.insightTitle, { color: theme.colors.text }]}
                >
                  Unsustainable Growth
                </Text>
                <Text
                  style={[
                    styles.insightText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Ponzi schemes require exponential growth. Each round needs
                  more investors than the last.
                </Text>
              </View>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>👥</Text>
              <View style={styles.insightContent}>
                <Text
                  style={[styles.insightTitle, { color: theme.colors.text }]}
                >
                  Most People Lose
                </Text>
                <Text
                  style={[
                    styles.insightText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Only early investors profit. The majority of participants lose
                  their money.
                </Text>
              </View>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>⚡</Text>
              <View style={styles.insightContent}>
                <Text
                  style={[styles.insightTitle, { color: theme.colors.text }]}
                >
                  Inevitable Collapse
                </Text>
                <Text
                  style={[
                    styles.insightText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  All Ponzi schemes eventually collapse when new investors stop
                  joining.
                </Text>
              </View>
            </View>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#b8b8b8",
    marginTop: 8,
    textAlign: "center",
  },
  roleContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  roleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 4,
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: "#ff6b6b",
  },
  roleButtonText: {
    color: "#b8b8b8",
    fontSize: 14,
    fontWeight: "600",
  },
  roleButtonTextActive: {
    color: "white",
  },
  roleDescription: {
    fontSize: 14,
    color: "#b8b8b8",
    textAlign: "center",
    lineHeight: 20,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
    // backgroundColor: "rgba(255, 255, 255, 1)",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - 50) / 2,
    backgroundColor: "rgba(0,0,0,0.015)",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: 0.2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#b8b8b8",
    textAlign: "center",
    marginTop: 4,
  },
  controlPanel: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  controlButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  controlButton: {
    width: (width - 50) / 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  controlButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  visualizationContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  collapseAlert: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderColor: "#ff6b6b",
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  collapseIcon: {
    fontSize: 32,
  },
  collapseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginTop: 10,
    marginBottom: 15,
  },
  collapseText: {
    fontSize: 14,
    color: "white",
    lineHeight: 20,
    textAlign: "left",
  },
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightCard: {
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 0.3,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: "#b8b8b8",
    lineHeight: 20,
  },
});

export default SimulatorScreen;
