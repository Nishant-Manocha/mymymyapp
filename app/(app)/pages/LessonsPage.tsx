import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  GraduationCap,
  Target,
  TrendingUp,
  Star,
  Users,
  Award,
  ChevronRight,
  BookOpen,
  Clock,
} from "lucide-react-native";
import { CourseCard } from "../../../components/CourseCard";
import { LessonViewer } from "../../../components/LessonViewer";
// import { Course, Lesson, Progress } from "../../../types/lesson";
import { router } from "expo-router";
import API from "../../../api/api";

const { width } = Dimensions.get("window");
const fetchCourses = async () => {
  const response = await API.get(`${process.env.SERVER_URL}/courses`);
  const data = await response.data;
  return data.courses;
};

const colors = {
  primary: "#3B82F6",
  primaryLight: "#60A5FA",
  primaryDark: "#1D4ED8",
  secondary: "#10B981",
  accent: "#8B5CF6",
  background: "#FFFFFF",
  backgroundSecondary: "#F8FAFC",
  text: "#1F2937",
  textSecondary: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
};

export default function LessonsPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    async function courses() {
      const courses = await fetchCourses();
      setCourses(courses);
    }
    courses();
  }, []);

  const handleStartCourse = async (courseId: string) => {
    const course = courses.find((c) => c._id === courseId);
    // console.log(course);

    if (course) {
      setSelectedCourse(course);
      setSelectedLesson(course.lessons[0]);
      console.log(course.lessons[0].id, course._id);
      router.push(
        "/pages/Lesson?lessonId=" +
          course.lessons[0]._id +
          "&courseId=" +
          course._id
      );
    }
  };

  const getProgressForCourse = (courseId: string) => {
    const courseProgress = progress.find((p) => p.courseId === courseId);
    if (!courseProgress) return 0;
    const course = courses.find((c) => c._id === courseId);
    if (!course) return 0;
    return (
      (courseProgress.completedLessons.length / course.lessons.length) * 100
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.audioLessonsContainer}>
          <Text style={styles.audioLessonsTitle}>
            Also Try our Audio Lessons
          </Text>
          <TouchableOpacity
            style={styles.audioLessonsButton}
            onPress={() => router.push("/pages/AudioLessons")}
          >
            <Text style={styles.audioLessonsButtonText}>Listen Now</Text>
          </TouchableOpacity>
        </View>

        {/* Courses Section */}
        <View style={styles.coursesSection}>
          <View style={styles.coursesGrid}>
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                progress={getProgressForCourse(course._id)}
                onStartCourse={() => handleStartCourse(course._id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: colors.primary,
    paddingTop: 32,
    paddingBottom: 48,
    paddingHorizontal: 24,
    position: "relative",
    overflow: "hidden",
  },
  heroBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
  heroPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    opacity: 0.8,
  },
  heroContent: {
    alignItems: "center",
    maxWidth: width - 48,
    zIndex: 1,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
    opacity: 0.9,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: colors.white,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 50,
  },
  heroDescription: {
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 26,
    opacity: 0.9,
    maxWidth: width - 80,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 32,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 16,
  },
  heroFeatures: {
    gap: 12,
    alignItems: "flex-start",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  featureText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "500",
  },
  quickStatsSection: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: colors.backgroundSecondary,
  },
  quickStatsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickStatTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
    textAlign: "center",
  },
  quickStatDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  coursesSection: {
    // paddingVertical: 48,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: width - 48,
  },
  coursesGrid: {
    gap: 20,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  viewAllButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  featuresSection: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: colors.gray[50],
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 32,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  featureCard: {
    width: (width - 64) / 2,
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  featureCardDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  audioLessonsContainer: {
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 24,
  },
  audioLessonsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  audioLessonsButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  audioLessonsButtonText: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
