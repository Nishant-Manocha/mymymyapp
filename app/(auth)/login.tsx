import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleLoginSuccess = () => {
    signIn();
    // Navigation will be handled by AuthProvider
  };

  const switchToSignup = () => {
    router.push("/(auth)/signup");
  };

  const switchToForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={40} color="#151717" />
        <Text style={styles.appTitle}>FinEduGuard</Text>
        <Text style={styles.appSubtitle}>Secure Financial Education</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <LoginForm
          onSwitchToSignup={switchToSignup}
          onForgotPassword={switchToForgotPassword}
          onLoginSuccess={handleLoginSuccess}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fcfb",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#1b8a5a",
    borderBottomWidth: 4,
    borderBottomColor: "#c0392b", // Red accent at bottom
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
  },
  appSubtitle: {
    fontSize: 16,
    color: "#d4a64f",
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    elevation: 3,
  },
});
