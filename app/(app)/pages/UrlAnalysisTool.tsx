import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { FraudAnalyzer } from "../../../components/FraudAnalyzer";
import { SecurityFeatures } from "../../../components/SecurityFeatures";

export default function UrlAnalysisTool() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <FraudAnalyzer />
        <SecurityFeatures />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    flex: 1,
  },
});
