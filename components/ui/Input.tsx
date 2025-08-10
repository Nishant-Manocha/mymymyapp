import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
  label?: string;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  style,
  label,
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[styles.input, multiline && styles.multiline, style]}
        textAlignVertical={multiline ? "top" : "center"}
        // Security hardening
        contextMenuHidden={true}
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
        selectTextOnFocus={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#f1f5f9",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#f1f5f9",
  },
  multiline: {
    minHeight: 80,
    paddingTop: 12,
  },
});
