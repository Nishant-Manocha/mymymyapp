import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Upload, FileText, AlertCircle } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";

interface FileInfo {
  uri: string;
  name: string;
  size: number;
  type: string;
}

interface FileUploaderProps {
  onFileSelect: (file: FileInfo) => void;
  isProcessing: boolean;
}

export const FileUploader = ({
  onFileSelect,
  isProcessing,
}: FileUploaderProps) => {
  const [error, setError] = useState<string | null>(null);

  const validateFile = (
    file: DocumentPicker.DocumentPickerAsset
  ): string | null => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
    ];

    if (file.size && file.size > maxSize) {
      return "File size must be less than 50MB";
    }

    if (file.mimeType && !allowedTypes.includes(file.mimeType)) {
      return "File type not supported. Please upload PDF, DOCX, DOC, JPG, PNG, GIF, or TXT files.";
    }

    return null;
  };

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
          "image/jpeg",
          "image/png",
          "image/gif",
          "text/plain",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        const validationError = validateFile(file);

        if (validationError) {
          setError(validationError);
          return;
        }

        setError(null);
        onFileSelect({
          uri: file.uri,
          name: file.name,
          size: file.size || 0,
          type: file.mimeType || "unknown",
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select file");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.uploadArea, isProcessing && styles.disabled]}
        onPress={handleFileSelect}
        disabled={isProcessing}
      >
        <View style={styles.uploadContent}>
          <View style={styles.iconContainer}>
            <Upload size={32} color="#6b7280" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Upload Document</Text>
            <Text style={styles.subtitle}>
              Tap to browse and select your file
            </Text>
            <Text style={styles.supportedTypes}>
              Supports PDF, DOCX, DOC, JPG, PNG, GIF, TXT (max 50MB)
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, isProcessing && styles.buttonDisabled]}
            onPress={handleFileSelect}
            disabled={isProcessing}
          >
            <FileText size={16} color={isProcessing ? "#9ca3af" : "#374151"} />
            <Text
              style={[
                styles.buttonText,
                isProcessing && styles.buttonTextDisabled,
              ]}
            >
              Choose File
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <AlertCircle size={16} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  uploadContent: {
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 50,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  supportedTypes: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonDisabled: {
    borderColor: "#e5e7eb",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  buttonTextDisabled: {
    color: "#9ca3af",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
    flex: 1,
  },
});
