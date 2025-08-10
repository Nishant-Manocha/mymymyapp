import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  style?: any;
}

export function LoadingSpinner({
  size = 24,
  color = "#10b981",
  style,
}: LoadingSpinnerProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.spinner,
          animatedStyle,
          {
            width: size,
            height: size,
            borderColor: `${color}20`,
            borderTopColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    borderWidth: 2,
    borderRadius: 50,
  },
});
