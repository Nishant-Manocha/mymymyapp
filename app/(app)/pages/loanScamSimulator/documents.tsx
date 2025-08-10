import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import {
  Upload,
  CircleCheck as CheckCircle,
  FileText,
  ArrowRight,
} from "lucide-react-native";

export default function DocumentsScreen() {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const documents = [
    "Aadhaar Card (Front & Back)",
    "PAN Card",
    "Salary Slips (Last 3 months)",
    "Bank Statements (Last 6 months)",
    "Property Documents",
    "Income Tax Returns",
  ];

  const handleUpload = (docName: string) => {
    if (!uploadedDocs.includes(docName)) {
      setUploadedDocs([...uploadedDocs, docName]);
    }
  };

  const handleContinue = () => {
    router.push("/pages/loanScamSimulator/approval");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upload Documents</Text>
        <Text style={styles.headerSubtitle}>
          Just photos are enough - No originals needed!
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.completedStep]}>
            <Text style={styles.progressText}>1</Text>
          </View>
          <View style={[styles.progressLine, styles.completedLine]} />
          <View style={[styles.progressStep, styles.activeStep]}>
            <Text style={styles.progressText}>2</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <Text style={styles.progressText}>3</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📱 Super Easy Upload!</Text>
          <Text style={styles.infoText}>
            Just take photos with your phone and upload. No need to visit our
            office or submit originals. We trust our pre-approved customers!
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Required Documents</Text>

        <View style={styles.documentsList}>
          {documents.map((doc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.documentItem}
              onPress={() => handleUpload(doc)}
            >
              <FileText size={24} color="#2563eb" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{doc}</Text>
                <Text style={styles.documentNote}>
                  {uploadedDocs.includes(doc)
                    ? "Uploaded successfully"
                    : "Tap to upload photo"}
                </Text>
              </View>
              {uploadedDocs.includes(doc) ? (
                <CheckCircle size={24} color="#16a34a" />
              ) : (
                <Upload size={24} color="#6b7280" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickUploadBox}>
          <Text style={styles.quickUploadTitle}>🚀 Quick Upload Option</Text>
          <Text style={styles.quickUploadText}>
            Send all documents via WhatsApp to +91 98765 43210 for instant
            processing!
          </Text>
          <TouchableOpacity style={styles.whatsappButton}>
            <Text style={styles.whatsappButtonText}>Send via WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            ⚡ Documents will be verified instantly using our AI system. No
            manual verification needed for pre-approved loans!
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            uploadedDocs.length < 3 && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={uploadedDocs.length < 3}
        >
          <Text style={styles.continueButtonText}>
            {uploadedDocs.length < 3
              ? "Upload at least 3 documents"
              : "Continue to Approval"}
          </Text>
          {uploadedDocs.length >= 3 && <ArrowRight size={20} color="#ffffff" />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#2563eb",
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#bfdbfe",
    textAlign: "center",
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  progressStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  activeStep: {
    backgroundColor: "#2563eb",
  },
  completedStep: {
    backgroundColor: "#16a34a",
  },
  progressText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 8,
  },
  completedLine: {
    backgroundColor: "#16a34a",
  },
  infoBox: {
    backgroundColor: "#f0f9ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#1e3a8a",
    textAlign: "center",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  documentsList: {
    marginBottom: 20,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  documentNote: {
    fontSize: 14,
    color: "#6b7280",
  },
  quickUploadBox: {
    backgroundColor: "#fef3c7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#f59e0b",
  },
  quickUploadTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 8,
    textAlign: "center",
  },
  quickUploadText: {
    fontSize: 14,
    color: "#92400e",
    textAlign: "center",
    marginBottom: 12,
  },
  whatsappButton: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  whatsappButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  noteContainer: {
    backgroundColor: "#f0f9ff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 14,
    color: "#1e40af",
    textAlign: "center",
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: "#dc2626",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#9ca3af",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
