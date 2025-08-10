import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react-native";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.toggleButton,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={toggleTheme}
    >
      <Text style={[styles.toggleText, { color: theme.colors.text }]}>
        {theme.isDark ? (
          <Moon size={24} color="white" />
        ) : (
          <Sun size={24} color="orange" />
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: {
    fontSize: 20,
  },
});

export default ThemeToggle;
