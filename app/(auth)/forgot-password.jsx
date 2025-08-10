import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, verifyOtp } from "../../redux/services/operations/authServices";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router"; // ✅ for navigation
import SecureTextInput from "../../components/SecureTextInput";

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const router = useRouter(); // ✅ router for navigation

  const handleSendOtp = async () => {
    if (!email) return Toast.show({ type: "error", text1: "Enter your email!" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return Toast.show({ type: "error", text1: "Enter a valid email!" });

    const response = await dispatch(forgotPassword(email));
    if (response?.error) {
      const msg = response.error.toLowerCase();
      if (msg.includes("not found")) {
        Toast.show({ type: "error", text1: "User not found", text2: "Please sign up first" });
      } else {
        Toast.show({ type: "error", text1: "Failed to send OTP", text2: response.error });
      }
    } else {
      Toast.show({ type: "success", text1: "OTP sent", text2: "Check your email" });
      setStep(2);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      return Toast.show({ type: "error", text1: "Enter a valid 4-digit OTP" });
    }

    const response = await dispatch(verifyOtp(email, otp));
    if (response?.error) {
      Toast.show({ type: "error", text1: "OTP verification failed", text2: response.error });
    } else {
      Toast.show({ type: "success", text1: "OTP Verified", text2: "Reset your password" });
      router.push(`/ResetPassword?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);


    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBackToLogin}>
        <Ionicons name="arrow-back" size={20} color="#151717" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email to receive a reset OTP</Text>

        {step === 1 && (
          <>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#777" />
              <SecureTextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Sending..." : "Send Reset OTP"}</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.label}>Enter OTP</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="key-outline" size={20} color="#777" />
              <SecureTextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

// styles (same as before)
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
    color: "#c0392b",
    marginVertical: 10,
  },
  label: {
    fontWeight: "600",
    color: "#1e2a3a",
    marginBottom: 5,
    alignSelf: "flex-start",
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
    width: "100%",
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

export default ForgotPassword;
