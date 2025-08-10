import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Download, Shield, AlertTriangle, Calendar } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export interface VerificationResult {
  isMatch: boolean;
  inputHash: string;
  currentHash: string;
  timestamp: number;
  confidence: number;
  savedDocument?: {
    id: string;
    filename: string;
    timestamp: number;
    size: number;
    type: string;
  } | null;
}

interface VerificationReportProps {
  result: VerificationResult;
}

export const VerificationReport = ({ result }: VerificationReportProps) => {
  const generateReport = (type: "json" | "txt") => {
    if (type === "json") {
      return JSON.stringify(
        {
          ...result,
          ...(result.savedDocument
            ? {
                filename: result.savedDocument.filename,
                size: result.savedDocument.size,
                timestamp: result.savedDocument.timestamp,
                type: result.savedDocument.type,
              }
            : {}),
        },
        null,
        2
      );
    } else {
      let data = `Verification Result\n-------------------\nStatus: ${
        result.isMatch ? "MATCH" : "MISMATCH"
      }\nInput Hash: ${result.inputHash}\nChecked Hash: ${
        result.currentHash
      }\nConfidence: ${result.confidence}%\nTime: ${new Date(
        result.timestamp
      ).toLocaleString()}\n`;
      if (result.savedDocument) {
        data += `File Name: ${result.savedDocument.filename}\nFile Size: ${
          result.savedDocument.size
        } bytes\nSaved At: ${new Date(
          result.savedDocument.timestamp
        ).toLocaleString()}\nType: ${result.savedDocument.type}\n`;
      }
      return data;
    }
  };

  const downloadReport = async (type: "json" | "txt") => {
    try {
      const data = generateReport(type);
      const filename = `verification-report.${type}`;
      const fileUri = FileSystem.documentDirectory + filename;

      await FileSystem.writeAsStringAsync(fileUri, data);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Success", `Report saved to ${filename}`);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to generate report");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconContainer,
              result.isMatch
                ? styles.successIconContainer
                : styles.errorIconContainer,
            ]}
          >
            {result.isMatch ? (
              <Shield size={20} color="#10b981" />
            ) : (
              <AlertTriangle size={20} color="#ef4444" />
            )}
          </View>
          <View>
            <Text style={styles.title}>Verification Report</Text>
            <Text style={styles.subtitle}>
              Download detailed verification results
            </Text>
          </View>
        </View>

        <View style={styles.badges}>
          <View
            style={[
              styles.badge,
              result.isMatch ? styles.successBadge : styles.errorBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                result.isMatch
                  ? styles.successBadgeText
                  : styles.errorBadgeText,
              ]}
            >
              {result.isMatch ? "VERIFIED ✓" : "MISMATCH ✗"}
            </Text>
          </View>
         
        </View>
      </View>

      {/* Verification Summary */}
      <View style={styles.summarySection}>
        <View style={styles.statusSection}>
          <Text style={styles.statusLabel}>Verification Status</Text>
          <Text style={styles.statusText}>
            {result.isMatch
              ? "Document is authentic and untampered"
              : "Hash mismatch detected - possible tampering"}
          </Text>
          {result.savedDocument && (
            <Text style={styles.documentInfo}>
              Matched against document saved on{" "}
              {new Date(result.savedDocument.timestamp).toLocaleDateString()}
            </Text>
          )}
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Confidence Level</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${result.confidence}%`,
                      backgroundColor:
                        result.confidence > 80
                          ? "#10b981"
                          : result.confidence > 50
                          ? "#f59e0b"
                          : "#ef4444",
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{result.confidence}%</Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Verification Time</Text>
            <View style={styles.timeContainer}>
              <Calendar size={16} color="#6b7280" />
              <Text style={styles.timeText}>
                {new Date(result.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Download Options */}
      <View style={styles.downloadSection}>
        <Text style={styles.downloadTitle}>Download Verification Proof</Text>
        <View style={styles.downloadButtons}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => downloadReport("json")}
          >
            <Download size={12} color="#374151" />
            <Text style={styles.downloadButtonText}>JSON Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => downloadReport("txt")}
          >
            <Download size={12} color="#374151" />
            <Text style={styles.downloadButtonText}>Text Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hash Comparison */}
      <View style={styles.hashSection}>
        <Text style={styles.hashTitle}>Hash Comparison</Text>
        <View style={styles.hashComparison}>
          <View style={styles.hashItem}>
            <Text style={styles.hashLabel}>Current Document Hash:</Text>
            <View style={styles.hashValue}>
              <Text style={styles.hashText} selectable>
                {result.currentHash}
              </Text>
            </View>
          </View>
          <View style={styles.hashItem}>
            <Text style={styles.hashLabel}>Compared Against:</Text>
            <View style={styles.hashValue}>
              <Text style={styles.hashText} selectable>
                {result.inputHash}
              </Text>
            </View>
          </View>
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
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  successIconContainer: {
    backgroundColor: "#f0fdf4",
  },
  errorIconContainer: {
    backgroundColor: "#fef2f2",
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
  badges: {
    alignItems: "flex-end",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  successBadge: {
    backgroundColor: "#dcfce7",
  },
  errorBadge: {
    backgroundColor: "#fee2e2",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  successBadgeText: {
    color: "#16a34a",
  },
  errorBadgeText: {
    color: "#dc2626",
  },
  vaultBadge: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vaultBadgeText: {
    fontSize: 12,
    color: "#6b7280",
  },
  summarySection: {
    gap: 16,
  },
  statusSection: {
    gap: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  documentInfo: {
    fontSize: 14,
    color: "#6b7280",
  },
  metricsContainer: {
    gap: 16,
  },
  metricItem: {
    gap: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  downloadSection: {
    gap: 12,
  },
  downloadTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  downloadButtons: {
    flexDirection: "row",
    gap: 12,
  },
  downloadButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
    borderRadius: 6,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 14,
    color: "#374151",
  },
  hashSection: {
    gap: 12,
  },
  hashTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  hashComparison: {
    gap: 8,
  },
  hashItem: {
    gap: 4,
  },
  hashLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  hashValue: {
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    padding: 8,
  },
  hashText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#1f2937",
    lineHeight: 16,
  },
});
