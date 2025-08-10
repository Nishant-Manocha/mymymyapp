import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomePage = ({ onLogin, onLogout, isLoggedIn }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Welcome to FinEduGuard!  👋</Text>
    <Text style={styles.subheading}>Your account is {isLoggedIn ? "active" : "not logged in"}.</Text>
    {!isLoggedIn ? (
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#151717",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#151717",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomePage;
