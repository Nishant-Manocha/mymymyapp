import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Filter,
  X,
  Trophy,
  Target,
  Zap,
  BookOpen,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react-native";

import { getUserProgress } from "../../../data/quizData";
import QuizCard from "../../../components/QuizCard";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import API from "../../../api/api";

const QuizzesScreen = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch quizzes from the server or local data
    const fetchQuizzes = async () => {
      try {
        const response = await API.get(
          `${process.env.SERVER_URL}/quizzes?category=` +
            selectedCategory +
            "&difficulty=" +
            selectedDifficulty
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.data;
        setQuizzes(data.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [selectedCategory, selectedDifficulty]);

  useEffect(() => {
    // Load completed quizzes from local storage or server
    const loadCompletedQuizzes = async () => {
      try {
        const response = await API.get(
          `${process.env.SERVER_URL}/progress?type=quiz`
        );
        const data = await response.data;
        if (data.progress) {
          setCompletedQuizzes(data.progress.map((item) => item.quizId));
        }
      } catch (error) {
        console.error("Failed to load completed quizzes:", error);
      }
    };

    loadCompletedQuizzes();
  }, []);

  const completedCount = completedQuizzes.length;

  const averageScore =
    completedCount > 0
      ? Math.round((completedCount / quizzes.length) * 100)
      : 0;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setShowFilters(false);
  };

  const getBadges = () => {
    const badges = [];
    if (completedCount >= 5)
      badges.push({ name: "Getting Started", icon: Target, color: "#10b981" });
    if (completedCount >= 10)
      badges.push({
        name: "Knowledge Seeker",
        icon: BookOpen,
        color: "#6366f1",
      });
    if (completedCount >= 20)
      badges.push({ name: "Fraud Fighter", icon: Trophy, color: "#f59e0b" });
    if (averageScore >= 80)
      badges.push({ name: "High Achiever", icon: Award, color: "#8b5cf6" });
    if (averageScore >= 90)
      badges.push({ name: "Expert", icon: Sparkles, color: "#ec4899" });
    return badges;
  };

  const badges = getBadges();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <View style={styles.header}>
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Your Learning Journey</Text>
              <Text style={styles.headerSubtitle}>
                Master fraud protection and financial literacy with
                expert-designed quizzes
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Dashboard */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <TrendingUp size={24} color="#6366f1" />
              <Text style={styles.progressTitle}>Your Progress</Text>
            </View>

            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <BookOpen size={20} color="#10b981" />
                </View>
                <Text style={styles.statNumber}>{completedCount}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Target size={20} color="#f59e0b" />
                </View>
                <Text style={styles.statNumber}>
                  {quizzes.length - completedCount}
                </Text>
                <Text style={styles.statLabel}>Remaining</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Trophy size={20} color="#ef4444" />
                </View>
                <Text style={styles.statNumber}>{averageScore}%</Text>
                <Text style={styles.statLabel}>Avg Score</Text>
              </View>
            </View>

            {/* Badges Section */}
            {badges.length > 0 && (
              <View style={styles.badgesSection}>
                <Text style={styles.badgesTitle}>Your Achievements</Text>
                <View style={styles.badgesContainer}>
                  {badges.map((badge, index) => {
                    const BadgeIcon = badge.icon;
                    return (
                      <View
                        key={index}
                        style={[styles.badge, { backgroundColor: badge.color }]}
                      >
                        <BadgeIcon size={16} color="#ffffff" />
                        <Text style={styles.badgeText}>{badge.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color="#6b7280" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search quizzes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9ca3af"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <X size={20} color="#6b7280" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.filterButton,
                showFilters && styles.filterButtonActive,
              ]}
              onPress={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} color={showFilters ? "#ffffff" : "#6366f1"} />
            </TouchableOpacity>
          </View>

          {/* Filter Options */}
          {showFilters && (
            <View style={styles.filtersContainer}>
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Category</Text>
                <View style={styles.filterOptions}>
                  {[
                    { value: "all", label: "All Topics" },
                    { value: "fraud", label: "Fraud Protection" },
                    { value: "financial", label: "Financial Literacy" },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.filterOption,
                        selectedCategory === option.value &&
                          styles.filterOptionActive,
                      ]}
                      onPress={() => setSelectedCategory(option.value)}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedCategory === option.value &&
                            styles.filterOptionTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Difficulty</Text>
                <View style={styles.filterOptions}>
                  {[
                    { value: "all", label: "All Levels", icon: BookOpen },
                    { value: "beginner", label: "Beginner", icon: Target },
                    { value: "intermediate", label: "Intermediate", icon: Zap },
                    { value: "advanced", label: "Advanced", icon: Trophy },
                  ].map((option) => {
                    const OptionIcon = option.icon;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.filterOption,
                          selectedDifficulty === option.value &&
                            styles.filterOptionActive,
                        ]}
                        onPress={() => setSelectedDifficulty(option.value)}
                      >
                        <OptionIcon
                          size={16}
                          color={
                            selectedDifficulty === option.value
                              ? "#ffffff"
                              : "#6b7280"
                          }
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            selectedDifficulty === option.value &&
                              styles.filterOptionTextActive,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={clearFilters}
              >
                <X size={16} color="#ef4444" />
                <Text style={styles.clearFiltersText}>Clear All Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Results Counter */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsText}>
            {quizzes.length} quiz
            {quizzes.length !== 1 ? "es" : ""} found
          </Text>
          {(searchQuery ||
            selectedCategory !== "all" ||
            selectedDifficulty !== "all") && (
            <TouchableOpacity style={styles.resetButton} onPress={clearFilters}>
              <Text style={styles.resetButtonText}>Show All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quiz Cards */}
        <View style={styles.quizzesContainer}>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onPress={
                  () =>
                    router.push(`/pages/QuizDetailScreen?quizId=${quiz._id}`)
                  // navigation.navigate(
                  //   "QuizDetail" as never,
                  //   { quizId: quiz.id } as never
                  // )
                }
              />
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <View style={styles.noResultsIcon}>
                <Search size={48} color="#d1d5db" />
              </View>
              <Text style={styles.noResultsTitle}>No quizzes found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search terms or filters to find what you're
                looking for.
              </Text>
              <TouchableOpacity
                style={styles.noResultsButton}
                onPress={clearFilters}
              >
                <Text style={styles.noResultsButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
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
    // height: 200,
    overflow: "hidden",
  },
  headerGradient: {
    flex: 1,
    backgroundColor: "#6366f1",
    paddingVertical: 24,
    // background: new LinearGradient(135deg, #6366f1 0%, #8b5cf6 100%),
    justifyContent: "center",
  },
  headerContent: {
    paddingHorizontal: 24,
    // paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 24,
  },
  progressSection: {
    paddingHorizontal: 24,

    marginVertical: 24,
  },
  progressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  progressStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 16,
  },
  badgesSection: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  badgesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    // paddingVertical: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: "#6366f1",
  },
  filtersContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 6,
  },
  filterOptionActive: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  filterOptionTextActive: {
    color: "#ffffff",
  },
  clearFiltersButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ef4444",
  },
  resultsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6366f1",
  },
  quizzesContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  noResultsContainer: {
    alignItems: "center",
    paddingVertical: 48,
  },
  noResultsIcon: {
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  noResultsButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  noResultsButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default QuizzesScreen;
