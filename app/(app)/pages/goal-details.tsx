import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import {
  Target,
  Chrome as Home,
  GraduationCap,
  Car,
  Plane,
  Heart,
  Baby,
  Calendar,
  IndianRupee,
  Briefcase,
  ArrowLeft,
  Plus,
  CreditCard as Edit3,
  DollarSign,
  Clock,
  TrendingUp,
  X,
  CircleCheck as CheckCircle,
  Zap,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useGoals } from "../../../contexts/GoalsContext";
import { get } from "mongoose";

const { width } = Dimensions.get("window");

export default function GoalDetails() {
  const { id } = useLocalSearchParams();
  const { getGoalById, getContributionsByGoalId, addContribution, updateGoal } =
    useGoals();
  const [addMoneyModalVisible, setAddMoneyModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");
  const [editedGoal, setEditedGoal] = useState({
    title: "",
    targetAmount: "",
    targetDate: "",
    description: "",
  });

  const goalId = id;
  const [goal, setGoal] = useState(getGoalById(goalId));
  const [contributions, setContributions] = useState(
    getContributionsByGoalId(goalId)
  );

  useEffect(() => {
    setGoal(getGoalById(goalId));
  }, [contributions]);

  if (!goal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Goal not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const goalCategories = [
    {
      id: "house",
      name: "House",
      icon: Home,
      color: "#A83279", // Maroon-like
      gradient: ["#C04848", "#480048"], // Deep PSB magenta/purple gradient
    },
    {
      id: "wedding",
      name: "Wedding",
      icon: Heart,
      color: "#D97706", // Rich golden orange
      gradient: ["#FBBF24", "#B45309"], // Warm wedding gold
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      color: "#6B21A8", // PSB Purple
      gradient: ["#A78BFA", "#7E22CE"], // Royal purple gradient
    },
    {
      id: "car",
      name: "Car",
      icon: Car,
      color: "#155E75", // PSB Dark Teal
      gradient: ["#22D3EE", "#0E7490"], // Light to deep teal
    },
    {
      id: "vacation",
      name: "Vacation",
      icon: Plane,
      color: "#92400E", // Earthy PSB orange
      gradient: ["#FDBA74", "#C2410C"], // Sunset-styled gold-orange
    },
    {
      id: "baby",
      name: "Baby",
      icon: Baby,
      color: "#9F1239", // Maroon-pink
      gradient: ["#F9A8D4", "#BE123C"], // Light to bold PSB pink
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: Target,
      color: "#991B1B", // Deep PSB red
      gradient: ["#F87171", "#7F1D1D"], // Strong alert gradient
    },
    {
      id: "retirement",
      name: "Retirement",
      icon: Briefcase,
      color: "#713F12", // Deep brown-gold
      gradient: ["#FCD34D", "#92400E"], // Classic PSB gold gradient
    },
  ];

  const getCategoryInfo = (categoryId: string) => {
    return (
      goalCategories.find((cat) => cat.id === categoryId) || goalCategories[0]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const categoryInfo = getCategoryInfo(goal.category);
  const IconComponent = categoryInfo.icon;
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const targetDate = new Date(goal.targetDate);
  const monthsRemaining = Math.max(
    1,
    Math.ceil(
      (targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
    )
  );

  const handleAddContribution = async () => {
    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    setAddMoneyModalVisible(false);

    const updatedContribution = await addContribution(goalId, amount);
    console.log("Updated Contributions:", updatedContribution);
    setContributions((prev) => [...prev, updatedContribution]);
    setContributionAmount("");

    Alert.alert("Success!", `₹${amount} added to ${goal.title}`);
  };

  const handleEditGoal = async () => {
    if (
      !editedGoal.title ||
      !editedGoal.targetAmount ||
      !editedGoal.targetDate
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const targetAmount = parseFloat(editedGoal.targetAmount);
    if (isNaN(targetAmount) || targetAmount <= 0) {
      Alert.alert("Error", "Please enter a valid target amount");
      return;
    }

    const updatedGoal = await updateGoal(goalId, {
      title: editedGoal.title,
      targetAmount: targetAmount,
      targetDate: editedGoal.targetDate,
      description: editedGoal.description,
    });
    console.log("Updated Goal:", updatedGoal);
    setGoal(updatedGoal);
    setEditModalVisible(false);
    Alert.alert("Success!", "Goal updated successfully!");
  };

  const openEditModal = () => {
    setEditedGoal({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      targetDate: goal.targetDate,
      description: goal.description,
    });
    setEditModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Goal Details</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
            <Edit3 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Goals Progress Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <Zap size={24} color="#F59E0B" />
            <Text style={styles.overviewTitle}>Goal Overview</Text>
          </View>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <LinearGradient
                colors={["#3B82F6", "#1D4ED8"]}
                style={styles.statGradient}
              >
                <Text style={styles.overviewStatValue}>
                  ₹{(goal.currentAmount / 100000).toFixed(1)}L
                </Text>
              </LinearGradient>
              <Text style={styles.overviewStatLabel}>Current Amount</Text>
            </View>
            <View style={styles.overviewStat}>
              <LinearGradient
                colors={["#10B981", "#047857"]}
                style={styles.statGradient}
              >
                <Text style={styles.overviewStatValue}>
                  ₹{(goal.targetAmount / 100000).toFixed(1)}L
                </Text>
              </LinearGradient>
              <Text style={styles.overviewStatLabel}>Target Amount</Text>
            </View>
            <View style={styles.overviewStat}>
              <LinearGradient
                colors={["#F59E0B", "#D97706"]}
                style={styles.statGradient}
              >
                <Text style={styles.overviewStatValue}>
                  ₹{(goal.monthlyTarget / 1000).toFixed(0)}K
                </Text>
              </LinearGradient>
              <Text style={styles.overviewStatLabel}>Monthly Target</Text>
            </View>
            <View style={styles.overviewStat}>
              <LinearGradient
                colors={["#8B5CF6", "#7C3AED"]}
                style={styles.statGradient}
              >
                <Text style={styles.overviewStatValue}>
                  {goal.progress.toFixed(0)}%
                </Text>
              </LinearGradient>
              <Text style={styles.overviewStatLabel}>Progress</Text>
            </View>
          </View>
        </View>

        {/* Goal Overview Card */}
        <View style={styles.goalOverviewCard}>
          <LinearGradient
            colors={["#FFFFFF", "#F8FAFC"]}
            style={styles.goalOverviewGradient}
          >
            <View style={styles.goalHeader}>
              <LinearGradient
                colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
                style={styles.goalIcon}
              >
                <IconComponent size={32} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDescription}>{goal.description}</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Progress</Text>
                <Text style={styles.progressPercentage}>{goal.progress}%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <LinearGradient
                  colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
                  style={[
                    styles.progressBarFill,
                    { width: `${goal.progress}%` },
                  ]}
                />
              </View>
              <View style={styles.amountInfo}>
                <Text style={styles.currentAmount}>
                  {formatCurrency(goal.currentAmount)}
                </Text>
                <Text style={styles.targetAmount}>
                  of {formatCurrency(goal.targetAmount)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsCard}>
          <Text style={styles.metricsTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={["#EF4444", "#DC2626"]}
                style={styles.metricIcon}
              >
                <DollarSign size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>
                {formatCurrency(remainingAmount)}
              </Text>
              <Text style={styles.metricLabel}>Remaining</Text>
            </View>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={["#F59E0B", "#D97706"]}
                style={styles.metricIcon}
              >
                <IndianRupee size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>
                {formatCurrency(goal.monthlyTarget)}
              </Text>
              <Text style={styles.metricLabel}>Monthly Target</Text>
            </View>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={["#8B5CF6", "#7C3AED"]}
                style={styles.metricIcon}
              >
                <Clock size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>{monthsRemaining}</Text>
              <Text style={styles.metricLabel}>Months Left</Text>
            </View>
            <View style={styles.metricItem}>
              <LinearGradient
                colors={["#10B981", "#047857"]}
                style={styles.metricIcon}
              >
                <TrendingUp size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.metricValue}>
                ₹
                {contributions.length > 0
                  ? (goal.currentAmount / contributions.length / 1000).toFixed(
                      0
                    )
                  : "0"}
                K
              </Text>
              <Text style={styles.metricLabel}>Avg Contribution</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => setAddMoneyModalVisible(true)}
          >
            <LinearGradient
              colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
              style={styles.primaryActionGradient}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.primaryActionText}>Add Contribution</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={openEditModal}
          >
            <Edit3 size={18} color="#059669" />
            <Text style={styles.secondaryActionText}>Edit Goal</Text>
          </TouchableOpacity>
        </View>

        {/* Contribution History */}
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Contribution History</Text>
          <View style={styles.historyList}>
            {contributions.map((contribution) => (
              <View key={contribution._id} style={styles.historyItem}>
                <View style={styles.historyIcon}>
                  <Plus size={16} color="#10B981" />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyAmount}>
                    {formatCurrency(contribution.amount)}
                  </Text>
                  <Text style={styles.historyDate}>
                    {new Date(contribution.createdAt).toLocaleDateString(
                      "en-IN"
                    )}
                  </Text>
                </View>
                <View style={styles.historyType}>
                  <Text style={styles.historyTypeText}>
                    {contribution.type}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Goal Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Goal Timeline</Text>
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}>
              <Target size={16} color="#2563EB" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineText}>Goal Created</Text>
              <Text style={styles.timelineDate}>
                {new Date(goal.createdAt).toLocaleDateString("en-IN")}
              </Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}>
              <Calendar size={16} color="#F59E0B" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineText}>Target Date</Text>
              <Text style={styles.timelineDate}>
                {targetDate.toLocaleDateString("en-IN")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Money Modal */}
      <Modal visible={addMoneyModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Add Money</Text>
              <TouchableOpacity onPress={() => setAddMoneyModalVisible(false)}>
                <X size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Amount (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={contributionAmount}
                  onChangeText={setContributionAmount}
                  placeholder="Enter amount to add"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.quickAmounts}>
                <Text style={styles.quickAmountsLabel}>Quick amounts:</Text>
                <View style={styles.quickAmountsRow}>
                  {[1000, 5000, 10000, 25000].map((amount) => (
                    <TouchableOpacity
                      key={amount}
                      style={styles.quickAmountButton}
                      onPress={() => setContributionAmount(amount.toString())}
                    >
                      <Text style={styles.quickAmountText}>₹{amount}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.addMoneyButton}
              onPress={handleAddContribution}
            >
              <LinearGradient
                colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
                style={styles.addMoneyGradient}
              >
                <Plus size={20} color="#FFFFFF" />
                <Text style={styles.addMoneyButtonText}>Add Money</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Goal Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Edit Goal</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <X size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Goal Title</Text>
                <TextInput
                  style={styles.input}
                  value={editedGoal.title}
                  onChangeText={(text) =>
                    setEditedGoal({ ...editedGoal, title: text })
                  }
                  placeholder="Enter goal title"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Target Amount (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={editedGoal.targetAmount}
                  onChangeText={(text) =>
                    setEditedGoal({ ...editedGoal, targetAmount: text })
                  }
                  placeholder="Enter target amount"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Target Date</Text>
                <TextInput
                  style={styles.input}
                  value={editedGoal.targetDate}
                  onChangeText={(text) =>
                    setEditedGoal({ ...editedGoal, targetDate: text })
                  }
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={editedGoal.description}
                  onChangeText={(text) =>
                    setEditedGoal({ ...editedGoal, description: text })
                  }
                  placeholder="Enter goal description"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.editGoalButton}
              onPress={handleEditGoal}
            >
              <LinearGradient
                colors={[categoryInfo.gradient[0], categoryInfo.gradient[1]]}
                style={styles.editGoalGradient}
              >
                <CheckCircle size={20} color="#FFFFFF" />
                <Text style={styles.editGoalButtonText}>Update Goal</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#EF4444",
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: "#2563EB",
  },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewCard: {
    backgroundColor: "#FFFFFF",
    marginTop: -12,
    marginBottom: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 8,
  },
  overviewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overviewStat: {
    alignItems: "center",
    flex: 1,
  },
  statGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  overviewStatValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  overviewStatLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 16,
  },
  goalOverviewCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  goalOverviewGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  goalIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  progressSection: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563EB",
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },
  amountInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  targetAmount: {
    fontSize: 14,
    color: "#6B7280",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // ensures spacing between 2 items
    gap: 0, // remove gap if using margin for spacing
  },

  metricsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  metricItem: {
    width: (width - 80 - 16) / 2, // width minus horizontal padding and gap
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16, // this replaces vertical gap
  },

  metricIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#E0F2FE",
  },

  metricValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
  actionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  primaryAction: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  primaryActionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  secondaryAction: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 6,
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  historyDate: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  historyType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
  },
  historyTypeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4F46E5",
    textTransform: "capitalize",
  },
  timelineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  timelineDate: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    margin: 20,
    maxHeight: "85%",
    width: "90%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  modalBody: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#111827",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  quickAmounts: {
    marginTop: 8,
  },
  quickAmountsLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  quickAmountsRow: {
    flexDirection: "row",
    gap: 8,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  addMoneyButton: {
    margin: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  addMoneyGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  addMoneyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  editGoalButton: {
    margin: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  editGoalGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  editGoalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
