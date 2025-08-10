import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { User, Phone, Mail, DollarSign, ArrowRight } from "lucide-react-native";

export default function ApplicationScreen() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    income: "",
    loanAmount: "",
    panCard: "",
    aadhaar: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    router.push("/pages/loanScamSimulator/documents");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loan Application</Text>
        <Text style={styles.headerSubtitle}>
          Quick & Easy - Just 2 minutes!
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.activeStep]}>
            <Text style={styles.progressText}>1</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <Text style={styles.progressText}>2</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <Text style={styles.progressText}>3</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#6b7280" />
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Enter your full name"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#6b7280" />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#6b7280" />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                placeholder="Enter your email address"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Income</Text>
            <View style={styles.inputContainer}>
              <DollarSign size={20} color="#6b7280" />
              <TextInput
                style={styles.input}
                value={formData.income}
                onChangeText={(text) =>
                  setFormData({ ...formData, income: text })
                }
                placeholder="Enter your monthly income"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Loan Amount Required</Text>
            <View style={styles.inputContainer}>
              <DollarSign size={20} color="#6b7280" />
              <TextInput
                style={styles.input}
                value={formData.loanAmount}
                onChangeText={(text) =>
                  setFormData({ ...formData, loanAmount: text })
                }
                placeholder="Enter loan amount"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PAN Card Number</Text>
            <TextInput
              style={styles.simpleInput}
              value={formData.panCard}
              onChangeText={(text) =>
                setFormData({ ...formData, panCard: text })
              }
              placeholder="Enter PAN number"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Aadhaar Number</Text>
            <TextInput
              style={styles.simpleInput}
              value={formData.aadhaar}
              onChangeText={(text) =>
                setFormData({ ...formData, aadhaar: text })
              }
              placeholder="Enter Aadhaar number"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              💡 Don't worry about credit score - we approve everyone! No income
              proof required for pre-approved customers.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Continue to Documents</Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    marginLeft: 8,
  },
  simpleInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
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
  submitButton: {
    backgroundColor: "#dc2626",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
