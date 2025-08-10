import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Home, AlertTriangle } from "lucide-react-native";

export default function NotFoundScreen() {
  return (
    <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <AlertTriangle size={80} color="#ff6b6b" />
          <Text style={styles.title}>404</Text>
          <Text style={styles.subtitle}>Page Not Found</Text>
          <Text style={styles.description}>
            Oops! The page you're looking for doesn't exist.
          </Text>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push("/(app)/(tabs)")}
            activeOpacity={0.8}
          >
            <Home size={20} color="white" />
            <Text style={styles.homeButtonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#b8b8b8",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4ecdc4",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
