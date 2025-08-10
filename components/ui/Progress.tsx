import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

interface ProgressProps {
  value: number;
  style?: any;
  variant?: "default" | "success" | "warning" | "danger";
}

export function Progress({ value, style, variant = "default" }: ProgressProps) {
  const progressValue = Math.min(100, Math.max(0, value));
  const animatedWidth = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withSpring(progressValue, {
      damping: 15,
      stiffness: 100,
    });

    if (progressValue > 0) {
      glowOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [progressValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const getProgressColor = () => {
    switch (variant) {
      case "success":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "danger":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  };

  const getGlowColor = () => {
    switch (variant) {
      case "success":
        return "rgba(16, 185, 129, 0.4)";
      case "warning":
        return "rgba(245, 158, 11, 0.4)";
      case "danger":
        return "rgba(239, 68, 68, 0.4)";
      default:
        return "rgba(59, 130, 246, 0.4)";
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.progress,
          animatedStyle,
          { backgroundColor: getProgressColor() },
        ]}
      />
      <Animated.View
        style={[
          styles.glow,
          glowStyle,
          {
            backgroundColor: getGlowColor(),
            width: `${progressValue}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: "100%",
    backgroundColor: "#374151",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  progress: {
    height: "100%",
    borderRadius: 8,
    position: "absolute",
    left: 0,
    top: 0,
  },
  glow: {
    height: "100%",
    borderRadius: 8,
    position: "absolute",
    left: 0,
    top: 0,
    shadowRadius: 8,
    shadowOpacity: 0.8,
  },
});
