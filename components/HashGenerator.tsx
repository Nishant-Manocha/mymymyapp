import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  Hash,
  Copy,
  CheckCircle2,
  FileText,
  Calendar,
  HardDrive,
} from "lucide-react-native";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";

interface FileInfo {
  uri: string;
  name: string;
  size: number;
  type: string;
}

interface HashGeneratorProps {
  file: FileInfo;
  onHashGenerated: (hash: string) => void;
}

export const HashGenerator = ({
  file,
  onHashGenerated,
}: HashGeneratorProps) => {
  const [hash, setHash] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHash = async (fileUri: string): Promise<string> => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error("File not found");
      }

      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        }),
        { encoding: Crypto.CryptoEncoding.HEX }
      );

      return hash;
    } catch (error) {
      throw new Error("Failed to generate hash");
    }
  };

  useEffect(() => {
    const processFile = async () => {
      setIsGenerating(true);
      try {
        const generatedHash = await generateHash(file.uri);
        setHash(generatedHash);
        onHashGenerated(generatedHash);
      } catch (error) {
        Alert.alert("Error", "Failed to generate hash. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    };

    processFile();
  }, [file, onHashGenerated]);

  const copyToClipboard = async () => {
    if (!hash) return;

    try {
      await Clipboard.setStringAsync(hash);
      setCopied(true);
      Alert.alert("Copied!", "Hash copied to clipboard");

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy hash to clipboard");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Hash size={20} color="#3b82f6" />
        </View>
        <View>
          <Text style={styles.title}>Document Hash</Text>
          <Text style={styles.subtitle}>SHA-256 cryptographic hash</Text>
        </View>
      </View>

      {/* File Information */}
      <View style={styles.fileInfoContainer}>
        <View style={styles.fileInfoItem}>
          <FileText size={16} color="#6b7280" />
          <View style={styles.fileInfoText}>
            <Text style={styles.fileInfoLabel}>Filename</Text>
            <Text style={styles.fileInfoValue} numberOfLines={1}>
              {file.name}
            </Text>
          </View>
        </View>

        <View style={styles.fileInfoItem}>
          <HardDrive size={16} color="#6b7280" />
          <View style={styles.fileInfoText}>
            <Text style={styles.fileInfoLabel}>File Size</Text>
            <Text style={styles.fileInfoValue}>
              {formatFileSize(file.size)}
            </Text>
          </View>
        </View>

        <View style={styles.fileInfoItem}>
          <Calendar size={16} color="#6b7280" />
          <View style={styles.fileInfoText}>
            <Text style={styles.fileInfoLabel}>Type</Text>
            <Text style={styles.fileInfoValue}>{file.type}</Text>
          </View>
        </View>
      </View>

      {/* Hash Display */}
      <View style={styles.hashSection}>
        <View style={styles.hashHeader}>
          <Text style={styles.hashLabel}>Generated Hash</Text>
          <View
            style={[
              styles.badge,
              isGenerating ? styles.badgeSecondary : styles.badgeSuccess,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isGenerating
                  ? styles.badgeTextSecondary
                  : styles.badgeTextSuccess,
              ]}
            >
              {isGenerating ? "Generating..." : "SHA-256"}
            </Text>
          </View>
        </View>

        <View style={styles.hashContainer}>
          <View style={styles.hashDisplay}>
            {isGenerating ? (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingBar} />
                <View style={[styles.loadingBar, { width: "75%" }]} />
              </View>
            ) : (
              <Text style={styles.hashText} selectable>
                {hash}
              </Text>
            )}
          </View>

          {hash && (
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              {copied ? (
                <CheckCircle2 size={12} color="#10b981" />
              ) : (
                <Copy size={12} color="#6b7280" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
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
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    backgroundColor: "#dbeafe",
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  fileInfoContainer: {
    gap: 16,
  },
  fileInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  fileInfoText: {
    flex: 1,
  },
  fileInfoLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  fileInfoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  hashSection: {
    gap: 12,
  },
  hashHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hashLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSecondary: {
    backgroundColor: "#f3f4f6",
  },
  badgeSuccess: {
    backgroundColor: "#dcfce7",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  badgeTextSecondary: {
    color: "#6b7280",
  },
  badgeTextSuccess: {
    color: "#16a34a",
  },
  hashContainer: {
    position: "relative",
  },
  hashDisplay: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    minHeight: 60,
    justifyContent: "center",
  },
  loadingContainer: {
    gap: 8,
  },
  loadingBar: {
    height: 16,
    backgroundColor: "#d1d5db",
    borderRadius: 4,
    opacity: 0.3,
  },
  hashText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#1f2937",
    lineHeight: 16,
  },
  copyButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 8,
  },
});
