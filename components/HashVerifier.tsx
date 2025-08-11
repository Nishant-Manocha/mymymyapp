import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Search, CheckCircle2, XCircle } from "lucide-react-native";
import API from "../api/api"; // adjust path if needed
import { useDocumentStorage } from "../hooks/useDocumentStorage";

async function verifyDocument(data: any) {
  const res = await API.post("/verify", data);
  return res.data;
}

async function saveDocumentToBackend(document: any) {
  const res = await API.post("/documents", document);
  return res.data;
}


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
    type: string; // Added type to the interface
  } | null;
}

interface HashVerifierProps {
  currentHash: string;
  onVerificationComplete: (result: VerificationResult) => void;
}

export const HashVerifier = ({
  currentHash,
  onVerificationComplete,
}: HashVerifierProps) => {
  const [inputHash, setInputHash] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const { findDocumentByHash } = useDocumentStorage();
  const [backendConnected, setBackendConnected] = useState(false);

  // Update the backend connection check to use your local IP

  const verifyHash = async () => {
    if (!inputHash.trim()) return;

    setIsVerifying(true);

    const normalizedInput = inputHash.trim().toLowerCase();
    // 1. Try local search
    let savedDocument = findDocumentByHash(normalizedInput);
    let isMatch = !!savedDocument;

    // 2. If not found locally, try backend
    if (!isMatch) {
      try {
        const res = await API.get(`/documents/hash/${normalizedInput}`);
        const backendDoc = res.data;

        if (backendDoc && backendDoc.hash) {
          savedDocument = {
            id: backendDoc._id || backendDoc.hash,
            filename: backendDoc.filename,
            hash: backendDoc.hash,
            walletAddress: backendDoc.walletAddress || "",
            timestamp: backendDoc.timestamp,
            size: backendDoc.size,
            type: backendDoc.type,
          };
          isMatch = true;
        }
      } catch (error) {
        // Optionally handle error
      }
    }


    const result: VerificationResult = {
      isMatch,
      inputHash: normalizedInput,
      currentHash: normalizedInput,
      timestamp: Date.now(),
      confidence: isMatch ? 100 : 0,
      savedDocument: savedDocument
        ? {
          id: savedDocument.id,
          filename: savedDocument.filename,
          timestamp: savedDocument.timestamp,
          size: savedDocument.size,
          type: savedDocument.type, // Ensure type is always included
        }
        : undefined,
    };

    setVerificationResult(result);
    onVerificationComplete(result);
    setIsVerifying(false);

    if (!isMatch) {
      Alert.alert(
        "Not Found",
        "This hash is not present in the vault or backend."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Search size={20} color="#3b82f6" />
        </View>
        <View>
          <Text style={styles.title}>Hash Verification</Text>
          <Text style={styles.subtitle}>
            Check if a hash exists in your vault
          </Text>
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Enter Known Hash</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Paste the known SHA-256 hash here to verify against..."
          value={inputHash}
          onChangeText={setInputHash}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!inputHash.trim() || isVerifying) && styles.buttonDisabled,
        ]}
        onPress={verifyHash}
        disabled={!inputHash.trim() || isVerifying}
      >
        {isVerifying ? (
          <View style={styles.loadingContainer}>
            <View style={styles.spinner} />
            <Text style={styles.buttonText}>Verifying...</Text>
          </View>
        ) : (
          <>
            <Search size={16} color="white" />
            <Text style={styles.buttonText}>Verify Hash</Text>
          </>
        )}
      </TouchableOpacity>

      {verificationResult && (
        <View
          style={[
            styles.resultContainer,
            verificationResult.isMatch
              ? styles.successContainer
              : styles.errorContainer,
          ]}
        >
          <View style={styles.resultHeader}>
            {verificationResult.isMatch ? (
              <CheckCircle2 size={20} color="#10b981" />
            ) : (
              <XCircle size={20} color="#ef4444" />
            )}

            <View style={styles.resultContent}>
              <View style={styles.resultTitleRow}>
                <Text
                  style={[
                    styles.resultTitle,
                    verificationResult.isMatch
                      ? styles.successText
                      : styles.errorText,
                  ]}
                >
                  {verificationResult.isMatch
                    ? "Hash Verified"
                    : "Hash Mismatch"}
                </Text>

                <View
                  style={[
                    styles.badge,
                    verificationResult.isMatch
                      ? styles.successBadge
                      : styles.errorBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      verificationResult.isMatch
                        ? styles.successBadgeText
                        : styles.errorBadgeText,
                    ]}
                  >
                    {verificationResult.isMatch ? "MATCH" : "NO MATCH"}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.resultDescription,
                  verificationResult.isMatch
                    ? styles.successText
                    : styles.errorText,
                ]}
              >
                {verificationResult.isMatch
                  ? "The document hash matches the provided hash. Document is authentic."
                  : "The document hash does not match. Document may have been tampered with."}
              </Text>

              {verificationResult.savedDocument && (
                <Text style={styles.documentInfo}>
                  Matched against document saved on{" "}
                  {new Date(
                    verificationResult.savedDocument.timestamp
                  ).toLocaleDateString()}
                </Text>
              )}
            </View>
          </View>
        </View>
      )}

      {verificationResult &&
        verificationResult.isMatch &&
        verificationResult.savedDocument && (
          <View style={styles.documentDetails}>
            <Text style={styles.documentDetailTitle}>File Details:</Text>
            <Text style={styles.documentDetailText}>
              Name: {verificationResult.savedDocument.filename}
            </Text>
            <Text style={styles.documentDetailText}>
              Size: {verificationResult.savedDocument.size} bytes
            </Text>
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
  inputSection: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: "monospace",
    minHeight: 80,
    backgroundColor: "#f9fafb",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  spinner: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: "#ffffff40",
    borderTopColor: "white",
    borderRadius: 8,
  },
  resultContainer: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
  },
  successContainer: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  errorContainer: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  resultContent: {
    flex: 1,
    gap: 8,
  },
  resultTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  successText: {
    color: "#10b981",
  },
  errorText: {
    color: "#ef4444",
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
  resultDescription: {
    fontSize: 14,
  },
  documentInfo: {
    fontSize: 14,
    color: "#6b7280",
  },
  documentDetails: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    gap: 4,
  },
  documentDetailTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  documentDetailText: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#374151",
  },
  backendConnectedMessage: {
    backgroundColor: "#d1fae5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  backendConnectedText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#065f46",
  },
});
