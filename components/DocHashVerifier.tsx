import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Shield, Save } from "lucide-react-native";
import { FileUploader } from "./FileUploader";
import { HashGenerator } from "./HashGenerator";
import { HashVerifier } from "./HashVerifier";
import { VerificationReport, VerificationResult } from "./VerificationReport";
import { DocumentVault } from "./DocumentVault";
import { useDocumentStorage } from "../hooks/useDocumentStorage";
import API from "../api/api";


interface FileInfo {
  uri: string;
  name: string;
  size: number;
  type: string;
}

async function saveDocumentToBackend(document: any) {
  console.log("Sending to backend:", document);

  try {
    const res = await API.post("/documents", document);

    // Axios parses JSON automatically; validate shape if needed
    const data = res?.data;
    if (data == null || typeof data === "string") {
      throw new Error("Expected JSON, got: " + String(data));
    }

    console.log("Backend response:", data);
    return data;
  } catch (error) {
    console.log("Backend error:", error);
    throw error;
  }
}


export const DocHashVerifier = () => {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [generatedHash, setGeneratedHash] = useState<string>("");
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { saveDocument } = useDocumentStorage();

  const handleSaveDocument = async () => {
    if (!selectedFile || !generatedHash) return;
    try {
      saveDocument(
        selectedFile.name,
        generatedHash,
        "local-user",
        selectedFile.size,
        selectedFile.type
      );
      await saveDocumentToBackend({
        filename: selectedFile.name,
        hash: generatedHash,
        walletAddress: "local-user",
        timestamp: Date.now(),
        size: selectedFile.size,
        type: selectedFile.type,
      });
      Alert.alert(
        "Document Saved",
        `Name: ${selectedFile.name}\nHash: ${generatedHash}\nSize: ${
          selectedFile.size
        } bytes\nType: ${
          selectedFile.type
        }\nWallet: local-user\nTimestamp: ${new Date().toLocaleString()}`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save document");
    }
  };

  const handleFileSelect = (file: FileInfo) => {
    setSelectedFile(file);
    setGeneratedHash("");
    setVerificationResult(null);
    setIsProcessing(true);
  };

  const handleHashGenerated = (hash: string) => {
    setGeneratedHash(hash);
    setIsProcessing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Shield size={20} color="#3b82f6" />
          <Text style={styles.badgeText}>
            Decentralized Document Verification
          </Text>
        </View>
        <Text style={styles.title}>DecentraHash Vault</Text>
        <Text style={styles.subtitle}>
          Upload, generate cryptographic hashes, and verify document integrity
          using secure storage
        </Text>
      </View>

      {/* File Upload */}
      <FileUploader
        onFileSelect={handleFileSelect}
        isProcessing={isProcessing}
      />

      {/* Hash Generation */}
      {selectedFile && (
        <HashGenerator
          file={selectedFile}
          onHashGenerated={handleHashGenerated}
        />
      )}

      {/* Document Vault */}
      <DocumentVault file={selectedFile} hash={generatedHash} />

      {/* Hash Verification */}
      <HashVerifier
        currentHash={generatedHash}
        onVerificationComplete={setVerificationResult}
      />

      {/* Verification Report */}
      {verificationResult && <VerificationReport result={verificationResult} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  header: {
    alignItems: "center",
    gap: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3b82f6",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#6b7280",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});
