// OAuthButtons.js
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { useDispatch } from "react-redux";
import { signUp, login } from "../redux/services/operations/authServices";

export default function OAuthButtons() {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then((res) => res.json())
        .then((user) => {
          // Send user info to backend for login/signup
          dispatch(login(user.email, user.id)); // Or dispatch(signUp(...))
        });
    }
  }, [response]);

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()}>
        <Ionicons name="logo-google" size={20} color="#DB4437" />
        <Text style={styles.text}>Continue with Google</Text>
      </TouchableOpacity>
      {/* Facebook button logic will be similar */}
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-facebook" size={20} color="#4267B2" />
        <Text style={styles.text}>Continue with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ededef",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  text: {
    marginLeft: 8,
    fontWeight: "500",
    color: "#151717",
  },
});
