import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "warning" | "success";
  style?: any;
}

export function Alert({ children, variant = "default", style }: AlertProps) {
  const getAlertStyle = () => {
    switch (variant) {
      case "destructive":
        return styles.destructive;
      case "warning":
        return styles.warning;
      case "success":
        return styles.success;
      default:
        return styles.default;
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return "alert-circle";
      case "warning":
        return "warning";
      case "success":
        return "checkmark-circle";
      default:
        return "information-circle";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "destructive":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "success":
        return "#10b981";
      default:
        return "#3b82f6";
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      exiting={FadeOutUp.springify()}
      style={[styles.alert, getAlertStyle(), style]}
    >
      <Ionicons
        name={getIcon() as any}
        size={20}
        color={getIconColor()}
        style={styles.icon}
      />
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
}

export function AlertTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function AlertDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
  },
  default: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  destructive: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  warning: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  success: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
});
