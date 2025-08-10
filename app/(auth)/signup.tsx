import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import SignupForm from "../../components/SignupForm";
import { router } from "expo-router";

export default function SignupScreen() {
  const handleSignupSuccess = () => {
    router.push("/(auth)/OTPVerification");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={40} color="#151717" />
        <Text style={styles.appTitle}>FinEduGuard</Text>
        <Text style={styles.appSubtitle}>Create Your Account</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <SignupForm onSignupSuccess={handleSignupSuccess} />
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff", // White text on green
    marginTop: 10,
  },
  appSubtitle: {
    fontSize: 16,
    color: "#ffe6e6", // Light reddish accent for subtitle
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
    elevation: 2,
  },
});
