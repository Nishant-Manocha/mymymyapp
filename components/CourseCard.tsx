import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import { Course } from "../types/lesson";
import { BookOpen } from "lucide-react-native";

const { width: screenWidth } = Dimensions.get("window");

interface CourseCardProps {
  course: Course;
  onStartCourse: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onStartCourse,
}) => {
  const slideAnim = useRef(new Animated.Value(-40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => onStartCourse(course.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: course.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {course.description}
          </Text>

          <View style={[styles.button, { backgroundColor: course.color }]}>
            <BookOpen size={18} color="#fff" />
            <Text style={styles.buttonText}>Start Course</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginVertical: 16,
    width: screenWidth * 0.92,
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: "hidden", // apply to children too
  },

  imageContainer: {
    width: "100%",
    height: screenWidth * 0.52,
    backgroundColor: "#E5E7EB", // soft gray as fallback
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  content: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827", // slightly darker for more contrast
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 16,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2563EB", // assume primary theme color
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
