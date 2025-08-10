import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
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
  Search,
  Eye,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useGoals } from "../../../contexts/GoalsContext";

const { width } = Dimensions.get("window");

export default function AllGoals() {
  const { goals, addContribution } = useGoals();
  const [filterCategory, setFilterCategory] = useState("all");

  const goalCategories = [
    {
      id: "all",
      name: "All",
      icon: Target,
      color: "#6B7280",
      gradient: ["#9CA3AF", "#6B7280"],
    },
    {
      id: "house",
      name: "House",
      icon: Home,
      color: "#2563EB",
      gradient: ["#3B82F6", "#1D4ED8"],
    },
    {
      id: "wedding",
      name: "Wedding",
      icon: Heart,
      color: "#EC4899",
      gradient: ["#F472B6", "#DB2777"],
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      color: "#7C3AED",
      gradient: ["#8B5CF6", "#6D28D9"],
    },
    {
      id: "car",
      name: "Car",
      icon: Car,
      color: "#059669",
      gradient: ["#10B981", "#047857"],
    },
    {
      id: "vacation",
      name: "Vacation",
      icon: Plane,
      color: "#F59E0B",
      gradient: ["#FBBF24", "#D97706"],
    },
    {
      id: "baby",
      name: "Baby",
      icon: Baby,
      color: "#EF4444",
      gradient: ["#F87171", "#DC2626"],
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: Target,
      color: "#06B6D4",
      gradient: ["#22D3EE", "#0891B2"],
    },
    {
      id: "retirement",
      name: "Retirement",
      icon: Briefcase,
      color: "#8B5CF6",
      gradient: ["#A78BFA", "#7C3AED"],
    },
  ];

  const getCategoryInfo = (categoryId: string) => {
    return (
      goalCategories.find((cat) => cat.id === categoryId) || goalCategories[1]
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

  const filteredGoals =
    filterCategory === "all"
      ? goals
      : goals.filter((goal) => goal.category === filterCategory);

  const handleAddContribution = (goalId: number) => {
    Alert.prompt(
      "Add Contribution",
      "Enter amount to add:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: (amount) => {
            const numAmount = parseFloat(amount || "0");
            if (numAmount > 0) {
              addContribution(goalId, numAmount);
              Alert.alert("Success!", `₹${numAmount} added successfully!`);
            }
          },
        },
      ],
      "plain-text",
      "",
      "numeric"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
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
            <Text style={styles.headerTitle}>All Goals</Text>
            <Text style={styles.headerSubtitle}>
              {filteredGoals.length} goal{filteredGoals.length !== 1 ? "s" : ""}{" "}
              found
            </Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter Categories */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            {goalCategories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = filterCategory === category.id;
              const categoryGoals =
                category.id === "all"
                  ? goals.length
                  : goals.filter((goal) => goal.category === category.id)
                      .length;

              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.filterItem,
                    isSelected && styles.filterItemActive,
                  ]}
                  onPress={() => setFilterCategory(category.id)}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={[category.gradient[0], category.gradient[1]]}
                      style={styles.filterGradient}
                    >
                      <IconComponent size={18} color="#FFFFFF" />
                      <Text style={styles.filterTextActive}>
                        {category.name} ({categoryGoals})
                      </Text>
                    </LinearGradient>
                  ) : (
                    <>
                      <IconComponent size={18} color={category.color} />
                      <Text style={styles.filterText}>
                        {category.name} ({categoryGoals})
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Goals List */}
      <ScrollView style={styles.goalsList} showsVerticalScrollIndicator={false}>
        {filteredGoals.map((goal) => {
          const categoryInfo = getCategoryInfo(goal.category);
          const IconComponent = categoryInfo.icon;
          const remainingAmount = goal.targetAmount - goal.currentAmount;
          const targetDate = new Date(goal.targetDate);
          const monthsRemaining = Math.max(
            1,
            Math.ceil(
              (targetDate.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24 * 30)
            )
          );

          return (
            <TouchableOpacity
              key={goal._id}
              style={styles.goalCard}
              onPress={() => router.push(`/pages/goal-details?id=${goal._id}`)}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F8FAFC"]}
                style={styles.goalCardGradient}
              >
                <View style={styles.goalHeader}>
                  <LinearGradient
                    colors={[
                      categoryInfo.gradient[0],
                      categoryInfo.gradient[1],
                    ]}
                    style={styles.goalIcon}
                  >
                    <IconComponent size={24} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalAmount}>
                      {formatCurrency(goal.currentAmount)} /{" "}
                      {formatCurrency(goal.targetAmount)}
                    </Text>
                    <Text style={styles.goalRemaining}>
                      {formatCurrency(remainingAmount)} remaining
                    </Text>
                  </View>
                  <View style={styles.goalProgress}>
                    <Text style={styles.progressPercentage}>
                      {goal.progress}%
                    </Text>
                    <Eye size={16} color="#6B7280" />
                  </View>
                </View>

                <View style={styles.progressBarContainer}>
                  <LinearGradient
                    colors={[
                      categoryInfo.gradient[0],
                      categoryInfo.gradient[1],
                    ]}
                    style={[
                      styles.progressBarFill,
                      { width: `${goal.progress}%` },
                    ]}
                  />
                </View>

                <View style={styles.goalDetails}>
                  <View style={styles.goalDetail}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.goalDetailText}>
                      Target: {targetDate.toLocaleDateString("en-IN")}
                    </Text>
                  </View>
                  <View style={styles.goalDetail}>
                    <IndianRupee size={16} color="#6B7280" />
                    <Text style={styles.goalDetailText}>
                      {formatCurrency(goal.monthlyTarget)}/month needed
                    </Text>
                  </View>
                  <View style={styles.goalDetail}>
                    <Target size={16} color="#6B7280" />
                    <Text style={styles.goalDetailText}>
                      {monthsRemaining} months remaining
                    </Text>
                  </View>
                </View>

                <View style={styles.goalActions}>
                  <TouchableOpacity
                    style={styles.contributeButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleAddContribution(goal.id);
                    }}
                  >
                    <Plus size={16} color="#FFFFFF" />
                    <Text style={styles.contributeButtonText}>Add Money</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        {filteredGoals.length === 0 && (
          <View style={styles.emptyState}>
            <Target size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>No goals found</Text>
            <Text style={styles.emptyStateText}>
              Try selecting a different category or create a new goal
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 2,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  filterSection: {
    paddingVertical: 20,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterItemActive: {
    borderColor: "transparent",
  },
  filterGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 16,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  filterTextActive: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  goalsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  goalCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  goalCardGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  goalIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  goalAmount: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  goalRemaining: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "600",
  },
  goalProgress: {
    alignItems: "flex-end",
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  goalDetails: {
    gap: 8,
    marginBottom: 16,
  },
  goalDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalDetailText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },
  goalActions: {
    justifyContent: "center",
  },
  contributeButton: {
    width: "100%",
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 14,
  },
  contributeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 6,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
