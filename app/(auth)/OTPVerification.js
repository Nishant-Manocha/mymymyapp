import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { signUp, sendOtp } from "../../redux/services/operations/authServices";
import Toast from "react-native-toast-message";
import SecureTextInput from "../../components/SecureTextInput";

const OTPVerification = ({ onBackToSignup, onVerificationComplete }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const dispatch = useDispatch();

  const signUpData = useSelector((state) => state.auth?.signUpData);
  const loading = useSelector((state) => state.auth?.loading);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      Toast.show({ type: "info", text1: "Verifying OTP..." });
      const result = await dispatch(signUp({ ...signUpData, otp: otpString }));

      if (result?.error) {
        const errorMessage = result.error.toLowerCase();

        if (errorMessage.includes("user already exists") || errorMessage.includes("already registered")) {
          Toast.show({ type: "error", text1: "User already exists", text2: "Please login instead" });
          const { router } = await import("expo-router");
          router.replace("/");
          return;
        }

        if (errorMessage.includes("invalid otp") || errorMessage.includes("otp expired") || errorMessage.includes("incorrect otp")) {
          Toast.show({ type: "error", text1: "Invalid or expired OTP", text2: "Please try again or request a new OTP" });
          return;
        }

        Toast.show({ type: "error", text1: "Verification failed", text2: result.error });
        return;
      }

      const token = result?.payload?.token || result?.token;
      if (token) {
        const { router } = await import("expo-router");
        router.push("/(app)/(tabs)");
      } else {
        onVerificationComplete();
      }
    } else {
      Toast.show({ type: "error", text1: "Please enter a valid 4-digit OTP" });
    }
  };

  const handleResend = async () => {
    if (signUpData?.email) {
      Toast.show({ type: "info", text1: "Resending OTP..." });
      const response = await dispatch(sendOtp(signUpData.email));

      if (response?.error) {
        const errorMessage = response.error.toLowerCase();

        if (errorMessage.includes("user already exists") || errorMessage.includes("already registered")) {
          Toast.show({ type: "error", text1: "User already exists", text2: "Please login instead" });
          const { router } = await import("expo-router");
          router.replace("/");
          return;
        }

        Toast.show({ type: "error", text1: "Failed to resend OTP", text2: response.error });
      } else {
        Toast.show({ type: "success", text1: "OTP resent successfully", text2: "Please check your email" });
      }
    } else {
      Toast.show({ type: "error", text1: "Email not found. Please go back to signup." });
    }
  };

  if (!signUpData?.email) {
    onBackToSignup();
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={onBackToSignup}>
        <Ionicons name="arrow-back" size={20} color="#151717" />
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>We have sent a verification code to your email address</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <SecureTextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Verifying..." : "Verify OTP"}</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendNote}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendBtn}>Resend Code</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
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
    color:"#c0392b",
    marginVertical: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
    width: "100%",
  },
  otpInput: {
    backgroundColor: "#f1f9f6",
    width: 55,
    height: 55,
    textAlign: "center",
    borderRadius: 12,
    fontWeight: "600",
    color: "#1e2a3a",
    fontSize: 20,
    borderWidth: 1.5,
    borderColor: "#8fcba3",
    shadowColor: "#8fcba3",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
  resendContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  resendNote: {
    fontSize: 14,
    color: "#6b7c93",
  },
  resendBtn: {
    fontSize: 14,
    color: "#a83232",
    fontWeight: "600",
    marginTop: 6,
  },
});

export default OTPVerification;
