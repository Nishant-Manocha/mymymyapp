import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/services/operations/authServices";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ForgotPassword = ({ onBackToLogin, onOtpVerified }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Step 1: Email input and send OTP */}
      {step === 1 && (
        <TouchableOpacity 
          style={styles.button}
          onPress={async () => {
            if (!email) {
              Toast.show({ type: "error", text1: "Enter your email!" });
              return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              Toast.show({ type: "error", text1: "Enter a valid email address!" });
              return;
            }
            console.log('[FORGOT PASSWORD] Dispatching forgotPassword with:', { email });
            const response = await dispatch(forgotPassword(email));
            
            // Handle errors from forgotPassword
            if (response?.error) {
              const errorMessage = response.error.toLowerCase();
              
              // Handle user not found error
              if (errorMessage.includes("user not found") || errorMessage.includes("no user") || errorMessage.includes("doesn't exist")) {
                Toast.show({
                  type: "error",
                  text1: "User not found",
                  text2: "Please sign up first"
                });
                return;
              }
              
              // For other errors
              Toast.show({
                type: "error",
                text1: "Failed to send reset link",
                text2: response.error
              });
            } else {
              // Success case
              Toast.show({
                type: "success",
                text1: "Reset link sent",
                text2: "Please check your email"
              });
              setStep(2);
            }
          }}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
        </TouchableOpacity>
      )}

      {/* Step 2: OTP input and verify */}
      {step === 2 && (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="key-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={async () => {
              if (!otp) {
                Toast.show({ type: "error", text1: "Please enter the OTP" });
                return;
              }
              
              if (otp.length !== 4) {
                Toast.show({ type: "error", text1: "OTP must be 4 digits" });
                return;
              }
              
              console.log('[FORGOT PASSWORD] OTP entered:', otp);
              
              try {
                // In a real app, verify OTP with backend here
                if (onOtpVerified) {
                  const response = await onOtpVerified(email, otp);
                  
                  // Handle errors from OTP verification
                  if (response?.error) {
                    const errorMessage = response.error.toLowerCase();
                    
                    // Handle invalid OTP
                    if (errorMessage.includes("invalid otp") || errorMessage.includes("otp expired") || errorMessage.includes("incorrect otp")) {
                      Toast.show({
                        type: "error",
                        text1: "Invalid or expired OTP",
                        text2: "Please try again or request a new OTP"
                      });
                      return;
                    }
                    
                    // For other errors
                    Toast.show({
                      type: "error",
                      text1: "Verification failed",
                      text2: response.error
                    });
                  }
                }
              } catch (error) {
                Toast.show({
                  type: "error",
                  text1: "Verification failed",
                  text2: error.message || "Please try again"
                });
              }
            }}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Back to Login */}
      <TouchableOpacity onPress={onBackToLogin}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#151717",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginVertical: 10,
  },
  label: {
    fontWeight: "600",
    color: "#151717",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ecedec",
    borderWidth: 1.5,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#151717",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  link: {
    textAlign: "center",
    color: "#2d79f3",
    fontWeight: "500",
  },
});

export default ForgotPassword;