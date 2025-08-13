import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { sendOtp } from "../redux/services/operations/authServices";
import { setSignUpData } from "../redux/slices/authSlice";
import OAuthButtons from "./OAuthButtons";
import Toast from "react-native-toast-message";
import SecureTextInput from "./SecureTextInput";

const SignupForm = ({ onSignupSuccess }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSendOtp = async () => {
    setPasswordError("");
    setConfirmPasswordError("");

    if (!firstName) return Toast.show({ type: "error", text1: "Enter your first name!" });
    if (!lastName) return Toast.show({ type: "error", text1: "Enter your last name!" });
    if (!email) return Toast.show({ type: "error", text1: "Enter your email!" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return Toast.show({ type: "error", text1: "Enter a valid email address!" });
    if (!password) {
      setPasswordError("Enter your password!");
      return;
    }

    // Strong password: at least 8 chars, uppercase, lowercase, number, special
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_+\-={}\[\]|;:'",.<>/?]).{8,}$/;

    // Common password blacklist (trimmed set)
    const commonPasswords = new Set([
      "password", "123456", "123456789", "12345678", "qwerty", "abc123",
      "111111", "123123", "password1", "iloveyou", "admin", "welcome",
    ]);

    const emailUser = email.split("@")[0]?.toLowerCase();
    const emailDomain = email.split("@")[1]?.split(".")[0]?.toLowerCase();

    if (!strongPasswordRegex.test(password)) {
      setPasswordError("Use 8+ chars with upper, lower, number, and symbol.");
      return;
    }
    if (commonPasswords.has(password.toLowerCase())) {
      setPasswordError("Password is too common. Choose a stronger one.");
      return;
    }
    if (emailUser && password.toLowerCase().includes(emailUser)) {
      setPasswordError("Password must not contain your email username.");
      return;
    }
    if (emailDomain && password.toLowerCase().includes(emailDomain)) {
      setPasswordError("Password must not contain your email domain.");
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm your password!");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    if (!agreeToTerms) return Toast.show({ type: "error", text1: "You must agree to the terms!" });

    try {
      setLoading(true);
      const response = await dispatch(sendOtp(email));
      setLoading(false);

      if (response?.error) {
        const errorMessage = response.error;
        console.error("Error sending OTP:", errorMessage);
        Toast.show({ type: "error", text1: errorMessage || "Failed to send OTP" });
        return;
      }

      Toast.show({ type: "success", text1: "OTP sent successfully!" });
      dispatch(setSignUpData({ firstName, lastName, email, password }));
      if (onSignupSuccess) onSignupSuccess();
    } catch (error) {
      setLoading(false);
      const errorMessage = error?.response?.data?.error || "Failed to send OTP";
      Toast.show({ type: "error", text1: errorMessage });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#777" />
          <SecureTextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <Text style={styles.label}>Last Name</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#777" />
          <SecureTextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

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

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" />
          <SecureTextInput
            style={styles.input}
            placeholder="Enter your Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" />
          <SecureTextInput
            style={styles.input}
            placeholder="Confirm your Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmPasswordError) setConfirmPasswordError("");
            }}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I agree to the <Text style={styles.link}>Terms & Conditions</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Sending OTP..." : "Send OTP"}</Text>
        </TouchableOpacity>

        <OAuthButtons />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
    color: "#1e2a3a",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#bcd9cc",
    borderWidth: 1.5,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#f9fcfb",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#1e2a3a",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#bcd9cc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#1b8a5a",
    borderColor: "#1b8a5a",
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 14,
    flex: 1,
    color: "#1e2a3a",
  },
  link: {
    color: "#c0392b",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#1b8a5a",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#1b8a5a",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#c0392b",
    fontSize: 12,
    marginTop: -6,
    marginBottom: 8,
  },
});

export default SignupForm;
