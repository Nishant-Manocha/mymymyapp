import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import {
  FileText,
  Upload,
  CircleAlert as AlertCircle,
  ArrowRight,
} from "lucide-react-native";

export default function DocumentUploadScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaar: "",
    pan: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FileText size={40} color="#4299E1" />
        <Text style={styles.title}>Win ₹1 Lakh Prize!</Text>
        <Text style={styles.subtitle}>Quick Registration Contest</Text>
      </View>

      <View style={styles.contestBox}>
        <Text style={styles.contestText}>
          🎉 Congratulations! You've been selected for our exclusive contest.
          Complete this quick form to win ₹1,00,000 cash prize!
        </Text>
        <Text style={styles.urgencyText}>
          ⏰ Limited time offer - Only 5 minutes left!
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Personal Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Aadhaar Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 12-digit Aadhaar number"
            value={formData.aadhaar}
            onChangeText={(text) => handleInputChange("aadhaar", text)}
            keyboardType="numeric"
            maxLength={12}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PAN Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your PAN number"
            value={formData.pan}
            onChangeText={(text) =>
              handleInputChange("pan", text.toUpperCase())
            }
            maxLength={10}
          />
        </View>

        <TouchableOpacity style={styles.uploadButton}>
          <Upload size={20} color="#4299E1" />
          <Text style={styles.uploadText}>Upload ID Documents</Text>
        </TouchableOpacity>

        <View style={styles.warningSimulation}>
          <AlertCircle size={16} color="#F56565" />
          <Text style={styles.warningSimulationText}>
            Simulation: In reality, never share these details on unverified
            forms!
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFormValid() && styles.submitButtonDisabled,
          ]}
          onPress={() =>
            router.push("/pages/identityTheftSimulator/bank-verification")
          }
          disabled={!isFormValid()}
        >
          <Text style={styles.submitButtonText}>Submit & Win Prize</Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    marginTop: 4,
  },
  contestBox: {
    backgroundColor: "#E6FFFA",
    padding: 16,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#38B2AC",
  },
  contestText: {
    fontSize: 15,
    color: "#234E52",
    lineHeight: 22,
    marginBottom: 8,
  },
  urgencyText: {
    fontSize: 14,
    color: "#C53030",
    fontWeight: "600",
  },
  form: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A5568",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#2D3748",
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: "#4299E1",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  uploadText: {
    color: "#4299E1",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  warningSimulation: {
    backgroundColor: "#FED7D7",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  warningSimulationText: {
    color: "#C53030",
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#38A169",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#CBD5E0",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
