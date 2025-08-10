import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/services/operations/authServices";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useLocalSearchParams } from "expo-router";
import SecureTextInput from "../../components/SecureTextInput";

const ResetPassword = () => {
  // const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const token = useSelector((state) => state.auth?.token);
const { email, otp } = useLocalSearchParams();

  useEffect(() => {
    if (token) {
      import("expo-router").then(({ router }) => {
        router.push("/(app)/(tabs)");
      });
    }
  }, [token]);

  const handleReset = async () => {
  if (!email) return Toast.show({ type: "error", text1: "Missing email!" });
  if (!otp) return Toast.show({ type: "error", text1: "Enter the OTP!" });
  if (!newPassword) return Toast.show({ type: "error", text1: "Enter new password!" });
  if (!confirmPassword) return Toast.show({ type: "error", text1: "Confirm your new password!" });
  if (newPassword.length < 6) return Toast.show({ type: "error", text1: "Password must be at least 6 characters!" });
  if (newPassword !== confirmPassword) return Toast.show({ type: "error", text1: "Passwords do not match!" });

  const response = await dispatch(resetPassword(email, newPassword, otp));

  if (response?.error) {
    Toast.show({ type: "error", text1: "Failed to reset password", text2: response.error });
  } else {
    Toast.show({
      type: "success",
      text1: "Password reset successful",
      text2: "Redirecting to login...",
    });

    setTimeout(() => {
      import("expo-router").then(({ router }) => {
        router.replace("/(auth)/login");
      });
    }, 1500);
  }
};


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          import("expo-router").then(({ router }) => router.back());
        }}
      >
        <Ionicons name="arrow-back" size={20} color="#151717" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to {email}</Text>


        {/* New Password */}
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" />
          <SecureTextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons
              name={showNewPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" />
          <SecureTextInput
            style={styles.input}
            placeholder="Confirm new password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Resetting..." : "Reset Password"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eafaf1",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#1b8a5a",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#f1f9f6",
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8fcba3",
    shadowColor: "#8fcba3",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#1e2a3a",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b7c93",
    marginVertical: 10,
  },
  label: {
    fontWeight: "600",
    color: "#1e2a3a",
    marginBottom: 5,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#8fcba3",
    borderWidth: 1.5,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#1e2a3a",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#1b8a5a",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#1b8a5a",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ResetPassword;
