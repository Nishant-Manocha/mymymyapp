import React from "react";
import { StatusBar } from "expo-status-bar";
import CalculatorApp from "../../../components/CalculatorApp";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <CalculatorApp />
    </SafeAreaView>
  );
}
