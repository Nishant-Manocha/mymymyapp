import React from "react";
import { View, StyleSheet } from "react-native";
import Calculator from "../../../components/Calculator";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FdAndRdCalculator() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Calculator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
});
