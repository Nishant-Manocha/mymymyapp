import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Play,
  Clock,
  Target,
  TrendingUp,
  TriangleAlert as AlertTriangle,
  CircleCheck as CheckCircle,
  Brain,
  ListFilter as Filter,
  Trophy,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { scenarios, Scenario } from '../data/scenarios';

const { width } = Dimensions.get("window");

interface ScenarioListProps {
  onScenarioSelect: (scenarioId: string) => void;
  completedScenarios?: string[];
}

export const ScenarioList: React.FC<ScenarioListProps> = ({
  onScenarioSelect,
  completedScenarios = [],
}) => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  console.log("Scenario", completedScenarios);
  useEffect(() => {
    // Fetch scenarios data when component mounts
    fetch(
      `${process.env.SERVER_URL}/scenarios?category=${selectedCategory}&difficulty=${selectedDifficulty}`
    ) // Replace with actual data fetching logic
      .then((response) => response.json())
      .then((data) => setScenarios(data.scenarios));
  }, [selectedCategory, selectedDifficulty]);

  const categories = [
    { id: "all", label: "All Categories", icon: Brain },
    { id: "fraud-detection", label: "Fraud Detection", icon: AlertTriangle },
    { id: "investment", label: "Investment", icon: TrendingUp },
    { id: "budgeting", label: "Budgeting", icon: Target },
    { id: "insurance", label: "Insurance", icon: CheckCircle },
    { id: "retirement", label: "Retirement", icon: Clock },
  ];

  const difficulties = [
    { id: "all", label: "All Levels" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];

  // const filteredScenarios = scenarios.filter((scenario) => {
  //   const categoryMatch =
  //     selectedCategory === "all" || scenario.category === selectedCategory;
  //   const difficultyMatch =
  //     selectedDifficulty === "all" ||
  //     scenario.difficulty === selectedDifficulty;
  //   return categoryMatch && difficultyMatch;
  // });

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
        return AlertTriangle;
      case "investment":
        return TrendingUp;
      case "budgeting":
        return Target;
      case "insurance":
        return CheckCircle;
      case "retirement":
        return Clock;
      default:
        return Brain;
    }
  };

  const isCompleted = (scenarioId: string) =>
    completedScenarios.includes(scenarioId);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1e293b", "#334155"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Financial Decision Scenarios</Text>
            <Text style={styles.subtitle}>
              Practice real-world financial decisions in a safe environment
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Trophy size={20} color="#f59e0b" />
                <Text style={styles.statValue}>
                  {completedScenarios.length}
                </Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Target size={20} color="#3b82f6" />
                <Text style={styles.statValue}>{scenarios.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Brain size={20} color="#10b981" />
                <Text style={styles.statValue}>
                  {Math.round(
                    (completedScenarios.length / scenarios.length) * 100
                  )}
                  %
                </Text>
                <Text style={styles.statLabel}>Progress</Text>
              </View>
            </View>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterButtons}>
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.filterButton,
                          selectedCategory === category.id &&
                            styles.filterButtonActive,
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                      >
                        <IconComponent
                          size={16}
                          color={
                            selectedCategory === category.id
                              ? "#ffffff"
                              : "#94a3b8"
                          }
                        />
                        <Text
                          style={[
                            styles.filterButtonText,
                            selectedCategory === category.id &&
                              styles.filterButtonTextActive,
                          ]}
                        >
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Difficulty</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterButtons}>
                  {difficulties.map((difficulty) => (
                    <TouchableOpacity
                      key={difficulty.id}
                      style={[
                        styles.filterButton,
                        selectedDifficulty === difficulty.id &&
                          styles.filterButtonActive,
                      ]}
                      onPress={() => setSelectedDifficulty(difficulty.id)}
                    >
                      <Text
                        style={[
                          styles.filterButtonText,
                          selectedDifficulty === difficulty.id &&
                            styles.filterButtonTextActive,
                        ]}
                      >
                        {difficulty.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Scenarios List */}
          <View style={styles.scenariosContainer}>
            <Text style={styles.scenariosTitle}>
              {scenarios.length} Scenario
              {scenarios.length !== 1 ? "s" : ""} Available
            </Text>

            {scenarios.map((scenario) => {
              const CategoryIcon = getCategoryIcon(scenario.category);
              const completed = isCompleted(scenario._id);

              return (
                <TouchableOpacity
                  key={scenario.id}
                  style={[
                    styles.scenarioCard,
                    completed && styles.completedCard,
                  ]}
                  onPress={() => onScenarioSelect(scenario._id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.scenarioHeader}>
                    <View style={styles.scenarioLeft}>
                      <View
                        style={[
                          styles.scenarioIcon,
                          {
                            backgroundColor:
                              getDifficultyColor(scenario.difficulty) + "20",
                          },
                        ]}
                      >
                        <CategoryIcon
                          size={24}
                          color={getDifficultyColor(scenario.difficulty)}
                        />
                      </View>
                      <View style={styles.scenarioInfo}>
                        <Text style={styles.scenarioTitle}>
                          {scenario.title}
                        </Text>
                        <Text
                          style={styles.scenarioDescription}
                          numberOfLines={2}
                        >
                          {scenario.description}
                        </Text>
                      </View>
                    </View>

                    {completed && (
                      <View style={styles.completedBadge}>
                        <CheckCircle size={16} color="#10b981" />
                      </View>
                    )}
                  </View>

                  <View style={styles.scenarioMeta}>
                    <View style={styles.metaItem}>
                      <View
                        style={[
                          styles.difficultyBadge,
                          {
                            backgroundColor: getDifficultyColor(
                              scenario.difficulty
                            ),
                          },
                        ]}
                      >
                        <Text style={styles.difficultyText}>
                          {scenario.difficulty.charAt(0).toUpperCase() +
                            scenario.difficulty.slice(1)}
                        </Text>
                      </View>
                    </View>

                    {scenario.timeLimit && (
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#94a3b8" />
                        <Text style={styles.metaText}>
                          {scenario.timeLimit}s
                        </Text>
                      </View>
                    )}

                    <View style={styles.metaItem}>
                      <Text style={styles.choicesCount}>
                        {scenario.choices.length} choices
                      </Text>
                    </View>
                  </View>

                  <View style={styles.scenarioFooter}>
                    <Text style={styles.learningObjective} numberOfLines={2}>
                      🎯 {scenario.learningObjective}
                    </Text>

                    <View style={styles.playButton}>
                      <Play size={16} color="#3b82f6" />
                      <Text style={styles.playButtonText}>
                        {completed ? "Play Again" : "Start Scenario"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {scenarios.length === 0 && (
            <View style={styles.emptyState}>
              <Filter size={48} color="#6b7280" />
              <Text style={styles.emptyTitle}>No Scenarios Found</Text>
              <Text style={styles.emptyDescription}>
                Try adjusting your filters to see more scenarios
              </Text>
            </View>
          )}
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
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 16,
  },
  filtersContainer: {
    marginBottom: 24,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#ffffff",
  },
  scenariosContainer: {
    marginBottom: 24,
  },
  scenariosTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  scenarioCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  completedCard: {
    borderColor: "rgba(16, 185, 129, 0.3)",
    backgroundColor: "rgba(16, 185, 129, 0.05)",
  },
  scenarioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  scenarioLeft: {
    flexDirection: "row",
    flex: 1,
  },
  scenarioIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  scenarioInfo: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
    lineHeight: 24,
  },
  scenarioDescription: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
  },
  completedBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    padding: 8,
    borderRadius: 20,
  },
  scenarioMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  metaText: {
    fontSize: 12,
    color: "#94a3b8",
  },
  choicesCount: {
    fontSize: 12,
    color: "#94a3b8",
  },
  scenarioFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  learningObjective: {
    flex: 1,
    fontSize: 13,
    color: "#cbd5e1",
    lineHeight: 18,
    marginRight: 16,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  playButtonText: {
    fontSize: 14,
    color: "#60a5fa",
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
  },
});
