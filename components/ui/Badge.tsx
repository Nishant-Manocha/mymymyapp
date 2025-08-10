import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  style?: any;
}

export function Badge({ children, variant = "default", style }: BadgeProps) {
  const getBadgeStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondary;
      case "destructive":
        return styles.destructive;
      case "outline":
        return styles.outline;
      default:
        return styles.default;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryText;
      case "destructive":
        return styles.destructiveText;
      case "outline":
        return styles.outlineText;
      default:
        return styles.defaultText;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      <Text style={[styles.text, getTextStyle()]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  default: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  secondary: {
    backgroundColor: "#64748b",
    borderColor: "#64748b",
  },
  destructive: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#334155",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  defaultText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#ffffff",
  },
  destructiveText: {
    color: "#ffffff",
  },
  outlineText: {
    color: "#f1f5f9",
  },
});
