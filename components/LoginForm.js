import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/services/operations/authServices";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import OAuthButtons from "./OAuthButtons";
import * as Clipboard from "expo-clipboard"; // ✅ Clipboard import


const LoginForm = ({ onSwitchToSignup, onForgotPassword, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const token = useSelector((state) => state.auth?.token);


  useEffect(() => {
    if (token) {
      import("expo-router").then(({ router }) => {
        router.push("/(app)/(tabs)");
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={async (text) => {
            const clipboardContent = await Clipboard.getStringAsync();
            if (text === clipboardContent) {
              Toast.show({
                type: "error",
                text1: "Pasting is disabled!",
              });
              setPassword(""); // Clear field
              await Clipboard.setStringAsync(""); // Clear clipboard
              return;
            }
            setPassword(text);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          contextMenuHidden={true} // disables paste menu on long press (Android & iOS)
          textContentType="oneTimeCode"
          onFocus={async () => {
            await Clipboard.setStringAsync(""); // clear clipboard on focus
          }}
          onSelectionChange={({ nativeEvent: { selection } }) => {
            if (selection.start !== selection.end) {
              // prevent selection/paste attack
              setTimeout(() => {
                setPassword((prev) => prev);
              }, 0);
            }
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

      <View style={styles.row}>
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            onPress={() => setRememberMe(!rememberMe)}
          >
            {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>
        <Text style={styles.link} onPress={onForgotPassword}>
          Forgot password?
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (!email) {
            Toast.show({ type: "error", text1: "Enter your email!" });
            return;
          }
          if (!password) {
            Toast.show({ type: "error", text1: "Enter your password!" });
            return;
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            Toast.show({ type: "error", text1: "Enter a valid email address!" });
            return;
          }
          if (password.length < 6) {
            Toast.show({ type: "error", text1: "Password must be at least 6 characters!" });
            return;
          }

          const response = await dispatch(login(email, password));
          if (response?.error) {
            const errorMessage = response.error.toLowerCase();
            if (
              errorMessage.includes("user not found") ||
              errorMessage.includes("no user") ||
              errorMessage.includes("doesn't exist")
            ) {
              Toast.show({
                type: "error",
                text1: "User not found",
                text2: "Please sign up first",
                onPress: () => onSwitchToSignup(),
              });
            } else if (
              errorMessage.includes("incorrect password") ||
              errorMessage.includes("invalid password") ||
              errorMessage.includes("wrong password")
            ) {
              Toast.show({
                type: "error",
                text1: "Incorrect password",
                text2: "Please try again or reset your password",
                onPress: () => onForgotPassword(),
              });
            }
          }
        }}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={onSwitchToSignup}>
          Sign Up
        </Text>
      </Text>

      <Text style={styles.orText}>Or With</Text>
      <OAuthButtons />
    </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#bcd9cc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#1b8a5a",
    borderColor: "#1b8a5a",
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 14,
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
  signupText: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 5,
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 10,
    color: "#777",
  },
});

export default LoginForm;
