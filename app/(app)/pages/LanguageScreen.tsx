import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shield, ChevronDown, Globe } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { languages } from "../../../data/lessonsData";
import API from "../../../api/api";


const { width: screenWidth } = Dimensions.get("window");

const LanguageScreen: React.FC = ({ navigation }: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLessons, setCurrentLessons] = useState<any[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/lessons", {
          params: { language: selectedLanguage },
        });
        setCurrentLessons(res.data?.lessons || []);
      } catch (error) {
        console.error("Error loading lessons:", error);
      }
    })();
  }, [selectedLanguage]);


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [currentLessons]);

  const handleStartLesson = (lesson: any) => {
    navigation.navigate("Lesson", { lesson, language: selectedLanguage });
  };

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <LinearGradient colors={["#f0f9ff", "#e0f2fe"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient colors={["#3b82f6", "#1d4ed8"]} style={styles.logoGradient}>
              <Shield size={32} color="white" />
            </LinearGradient>
            <Text style={styles.appTitle}>SurakshaCall</Text>
            <Text style={styles.appSubtitle}>
              Learn to protect yourself from fraud with voice-based lessons and quizzes
            </Text>
          </View>

          {/* Language Selection */}
          <View style={styles.languageCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.6)"]}
              style={styles.cardGradient}
            >
              <View style={styles.languageHeader}>
                <Globe size={20} color="#1e40af" />
                <Text style={styles.languageTitle}>Select Your Language</Text>
              </View>

              <TouchableOpacity
                style={styles.languageSelector}
                onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <View style={styles.selectedLanguage}>
                  <Text style={styles.languageFlag}>{selectedLang?.flag}</Text>
                  <Text style={styles.languageName}>{selectedLang?.name}</Text>
                </View>
                <ChevronDown
                  size={20}
                  color="#6b7280"
                  style={[styles.chevron, showLanguageDropdown && styles.chevronRotated]}
                />
              </TouchableOpacity>

              {showLanguageDropdown && (
                <View style={styles.dropdown}>
                  {languages.map((lang) => (
                    <TouchableOpacity
                      key={lang.code}
                      style={[
                        styles.dropdownItem,
                        selectedLanguage === lang.code && styles.dropdownItemSelected,
                      ]}
                      onPress={() => {
                        setSelectedLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                    >
                      <Text style={styles.languageFlag}>{lang.flag}</Text>
                      <Text style={styles.languageName}>{lang.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </LinearGradient>
          </View>

          {/* Lessons Section */}
          <View style={styles.lessonsSection}>
            <View style={styles.lessonsSectionHeader}>
              <Text style={styles.lessonsTitle}>Available Lessons</Text>
              <Text style={styles.lessonsCount}>
                {currentLessons.length} lesson{currentLessons.length !== 1 ? "s" : ""}
              </Text>
            </View>

            <Animated.View style={[styles.lessonsContainer, { opacity: fadeAnim }]}>
              {currentLessons.map((lesson, index) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonCard}
                  activeOpacity={0.9}
                  onPress={() => handleStartLesson(lesson)}
                >
                  <View style={styles.lessonImageWrapper}>
                    <Image
                      source={{ uri: lesson.imageUrl }}
                      style={styles.lessonImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDescription}>{lesson.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Stay safe, stay informed. Protect yourself from fraud.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  header: { alignItems: "center", paddingVertical: 24 },
  logoGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 8,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  languageCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 4,
  },
  cardGradient: { padding: 24 },
  languageHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  languageTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 12,
  },
  languageSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectedLanguage: { flexDirection: "row", alignItems: "center" },
  languageFlag: { fontSize: 20, marginRight: 12 },
  languageName: { fontSize: 16, color: "#1f2937" },
  chevron: { transform: [{ rotate: "0deg" }] },
  chevronRotated: { transform: [{ rotate: "180deg" }] },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownItemSelected: { backgroundColor: "#f0f9ff" },
  lessonsSection: { marginBottom: 24 },
  lessonsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
  lessonsCount: { fontSize: 12, color: "#6b7280" },
  lessonsContainer: { gap: 16 },
  lessonCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  lessonImageWrapper: {
    width: "100%",
    height: screenWidth * 0.52,
    backgroundColor: "#E5E7EB", // soft gray as fallback
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  lessonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  lessonContent: {
    padding: 16,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginTop: 24,
  },
  footerText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default LanguageScreen;
