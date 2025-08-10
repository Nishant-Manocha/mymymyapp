import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DocHashVerifier } from "../../../components/DocHashVerifier";

export default function DocHashVerifierTool() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <DocHashVerifier />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});
