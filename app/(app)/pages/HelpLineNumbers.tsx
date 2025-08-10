import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import * as Haptics from "expo-haptics";
import {
  Phone,
  AlertTriangle,
  Search,
  Clock,
  Shield,
  Building2,
  CreditCard,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  CheckCircle,
  Star,
  Zap,
  X,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;
const isLargeScreen = width >= 1024;

interface BankContact {
  name: string;
  type: "government" | "private";
  tollFree: string[];
  regular?: string[];
  specialNumbers?: { type: string; number: string }[];
  verified: boolean;
  notes?: string;
}

const bankData: BankContact[] = [
  {
    name: "State Bank of India (SBI)",
    type: "government",
    tollFree: ["1800 1234", "1800 2100", "1800 11 2211", "1800 425 3800"],
    regular: ["080-26599990"],
    specialNumbers: [
      { type: "Unauthorized Transactions", number: "1800 11 1109" },
      { type: "Emergency", number: "94491 12211" },
    ],
    verified: true,
    notes: "Available 24×7 nationwide with comprehensive support",
  },
  {
    name: "HDFC Bank",
    type: "private",
    tollFree: ["1800 1600", "1800 2600", "1800 227227"],
    regular: ["+91 22 6160 6160"],
    specialNumbers: [
      { type: "Credit Card", number: "1860-267-6161" },
      { type: "Banking Grievances", number: "1800-224-060" },
    ],
    verified: true,
    notes:
      "Credit card support available; Banking grievances Mon-Sat 9:30 AM-6:30 PM",
  },
  {
    name: "ICICI Bank",
    type: "private",
    tollFree: ["1800 1080"],
    regular: ["022-3366-7777"],
    verified: true,
    notes: "General queries and customer care with email escalation support",
  },
  {
    name: "Axis Bank",
    type: "private",
    tollFree: ["1860 425 8888"],
    regular: ["022-6798-7700"],
    verified: true,
    notes: "Mumbai regional contact for account and credit card grievances",
  },
  {
    name: "Punjab National Bank (PNB)",
    type: "government",
    tollFree: [
      "1800 1800",
      "1800 2021",
      "1800 180 2222",
      "1800 103 2222",
      "1800-180-2345",
    ],
    regular: ["+91 120-249-0000"],
    verified: true,
    notes: "Multiple contact centers with global user support available",
  },
  {
    name: "Bank of Baroda",
    type: "government",
    tollFree: ["1800 258 4455", "1800 102 4455", "1800-103-1002"],
    verified: true,
    notes: "Comprehensive banking and grievances support",
  },
  {
    name: "Union Bank of India",
    type: "government",
    tollFree: [
      "1800 2222 44",
      "1800 208 2244",
      "1800 425 1515",
      "1800 425 3555",
    ],
    verified: true,
  },
  {
    name: "Bank of India",
    type: "government",
    tollFree: ["1800 103 1906", "1800 220 229"],
    verified: true,
  },
  {
    name: "Canara Bank",
    type: "government",
    tollFree: ["1800 425 0018"],
    verified: true,
  },
  {
    name: "Central Bank of India",
    type: "government",
    tollFree: ["1800 22 1911", "1800 3030"],
    verified: true,
  },
  {
    name: "Kotak Mahindra Bank",
    type: "private",
    tollFree: ["1860 266 2666"],
    verified: true,
    notes: "Credit cards, banking, and grievances support",
  },
  {
    name: "IndusInd Bank",
    type: "private",
    tollFree: ["1860 267 7777"],
    verified: true,
  },
  {
    name: "Yes Bank",
    type: "private",
    tollFree: ["1800 1200"],
    verified: true,
  },
  {
    name: "Federal Bank",
    type: "private",
    tollFree: ["1800 425 1199"],
    verified: true,
    notes: "Banking and credit support services",
  },
  {
    name: "HSBC India",
    type: "private",
    tollFree: ["1800 267 3456"],
    verified: true,
    notes: "Cards, banking, and complaints handling",
  },
  {
    name: "IDFC First Bank",
    type: "private",
    tollFree: ["1860 500 1111"],
    verified: true,
    notes: "Banking, credit card, and grievance redressal services",
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<
    "all" | "government" | "private"
  >("all");
  const [expandedBank, setExpandedBank] = useState<string | null>(null);

  const filteredBanks = bankData.filter((bank) => {
    const matchesSearch = bank.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || bank.type === selectedType;
    return matchesSearch && matchesType;
  });

  const makePhoneCall = async (phoneNumber: string) => {
    try {
      if (Platform.OS !== "web") {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      const cleanNumber = phoneNumber.replace(/[^\d+]/g, "");
      const phoneUrl = `tel:${cleanNumber}`;

      const canOpen = await Linking.canOpenURL(phoneUrl);
      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert("Error", "Unable to open phone app");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to make phone call");
    }
  };

  const renderPhoneButton = (
    number: string,
    style: "primary" | "secondary" | "special",
    label?: string
  ) => {
    const buttonStyle =
      style === "primary"
        ? styles.primaryPhoneButton
        : style === "secondary"
        ? styles.secondaryPhoneButton
        : styles.specialPhoneButton;

    const textStyle =
      style === "primary"
        ? styles.primaryPhoneText
        : style === "secondary"
        ? styles.secondaryPhoneText
        : styles.specialPhoneText;

    const iconColor =
      style === "primary"
        ? "#ffffff"
        : style === "secondary"
        ? "#374151"
        : "#dc2626";

    return (
      <TouchableOpacity
        key={number}
        style={buttonStyle}
        onPress={() => makePhoneCall(number)}
        activeOpacity={0.85}
      >
        {label && <Text style={styles.phoneLabel}>{label}</Text>}
        <View style={styles.phoneButtonContent}>
          <Text style={[textStyle, styles.phoneNumber]}>{number}</Text>
          <View style={styles.phoneIconContainer}>
            <PhoneCall size={16} color={iconColor} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const containerPadding = isLargeScreen ? 40 : isTablet ? 24 : 16;
  const maxContentWidth = isLargeScreen ? 1200 : isTablet ? 800 : width - 32;

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: containerPadding },
        ]}
      >
        <View
          style={[
            styles.contentWrapper,
            { maxWidth: maxContentWidth, alignSelf: "center" },
          ]}
        >
          {/* Professional Header */}
          {/* <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View style={styles.headerIcon}>
                  <Shield size={28} color="#ffffff" />
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.headerTitle}>
                    Banking Emergency Resources
                  </Text>
                  <Text style={styles.headerSubtitle}>
                    Verified helplines for immediate assistance
                  </Text>
                </View>
              </View>

              <View style={styles.headerStats}>
                <View style={styles.statCard}>
                  <Building2 size={18} color="#3b82f6" />
                  <Text style={styles.statNumber}>{bankData.length}</Text>
                  <Text style={styles.statLabel}>Banks</Text>
                </View>
                <View style={styles.statCard}>
                  <Clock size={18} color="#10b981" />
                  <Text style={styles.statNumber}>24/7</Text>
                  <Text style={styles.statLabel}>Support</Text>
                </View>
                <View style={styles.statCard}>
                  <CheckCircle size={18} color="#f59e0b" />
                  <Text style={styles.statNumber}>100%</Text>
                  <Text style={styles.statLabel}>Verified</Text>
                </View>
              </View>
            </View>
          </View> */}

          {/* RBI Emergency Section */}
          <View style={styles.rbiSection}>
            <View style={styles.rbiHeader}>
              <View style={styles.rbiIconContainer}>
                <AlertTriangle size={24} color="#dc2626" />
              </View>
              <View style={styles.rbiTextContainer}>
                <Text style={styles.rbiTitle}>Reserve Bank of India</Text>
                <Text style={styles.rbiSubtitle}>
                  Banking Ombudsman & Consumer Helpline
                </Text>
              </View>
            </View>

            <View style={styles.rbiContent}>
              <TouchableOpacity
                style={styles.rbiPhoneButton}
                onPress={() => makePhoneCall("14448")}
                activeOpacity={0.85}
              >
                <View style={styles.rbiPhoneContent}>
                  <View style={styles.rbiPhoneInfo}>
                    <Text style={styles.rbiPhoneNumber}>14448</Text>
                    <Text style={styles.rbiPhoneLabel}>
                      Consumer Helpline (Toll-Free)
                    </Text>
                  </View>
                  <View style={styles.rbiPhoneIcon}>
                    <PhoneCall size={20} color="#ffffff" />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.rbiDetails}>
                <View style={styles.rbiDetailItem}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.rbiDetailText}>
                    Monday - Friday: 9:30 AM - 5:15 PM
                  </Text>
                </View>
                <View style={styles.rbiDetailItem}>
                  <Text style={styles.rbiDetailText}>📧 crpc@rbi.org.in</Text>
                </View>
                <View style={styles.rbiDetailItem}>
                  <Text style={styles.rbiDetailText}>🌐 sachet.rbi.org.in</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Search and Filter */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#6b7280" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search banks..."
                placeholderTextColor="#9ca3af"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              {searchTerm.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchTerm("")}
                  style={styles.clearButton}
                >
                  <X size={18} color="#6b7280" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.filterContainer}>
              {[
                { key: "all", label: "All Banks", icon: "🏦" },
                { key: "government", label: "Government", icon: "🏛️" },
                { key: "private", label: "Private", icon: "🏢" },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterButton,
                    selectedType === filter.key && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedType(filter.key as any)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.filterIcon}>{filter.icon}</Text>
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedType === filter.key &&
                        styles.filterButtonTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Results Header */}
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              {filteredBanks.length} Bank{filteredBanks.length !== 1 ? "s" : ""}{" "}
              Found
            </Text>
            <Text style={styles.resultsSubtitle}>
              Tap any number to call directly
            </Text>
          </View>

          {/* Banks Grid */}
          <View style={[styles.banksGrid, isTablet && styles.banksGridTablet]}>
            {filteredBanks.map((bank) => (
              <View
                key={bank.name}
                style={[styles.bankCard, isTablet && styles.bankCardTablet]}
              >
                {/* Bank Header */}
                <View style={styles.bankHeader}>
                  <View style={styles.bankMainInfo}>
                    <View
                      style={[
                        styles.bankTypeIndicator,
                        bank.type === "government"
                          ? styles.govIndicator
                          : styles.privateIndicator,
                      ]}
                    />
                    <View style={styles.bankTitleContainer}>
                      <Text style={styles.bankName}>{bank.name}</Text>
                      <View style={styles.bankMeta}>
                        <Text
                          style={[
                            styles.bankType,
                            bank.type === "government"
                              ? styles.govType
                              : styles.privateType,
                          ]}
                        >
                          {bank.type === "government"
                            ? "Government Bank"
                            : "Private Bank"}
                        </Text>
                        {bank.verified && (
                          <View style={styles.verifiedBadge}>
                            <CheckCircle size={12} color="#10b981" />
                            <Text style={styles.verifiedText}>Verified</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() =>
                      setExpandedBank(
                        expandedBank === bank.name ? null : bank.name
                      )
                    }
                    activeOpacity={0.7}
                  >
                    {expandedBank === bank.name ? (
                      <ChevronUp size={20} color="#6b7280" />
                    ) : (
                      <ChevronDown size={20} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Primary Numbers */}
                <View style={styles.primaryNumbers}>
                  <Text style={styles.numbersTitle}>Primary Helplines</Text>
                  <View
                    style={[
                      styles.phoneGrid,
                      isTablet && styles.phoneGridTablet,
                    ]}
                  >
                    {bank.tollFree
                      .slice(0, expandedBank === bank.name ? undefined : 2)
                      .map((number) => renderPhoneButton(number, "primary"))}
                  </View>

                  {bank.tollFree.length > 2 && expandedBank !== bank.name && (
                    <TouchableOpacity
                      style={styles.showMoreButton}
                      onPress={() => setExpandedBank(bank.name)}
                    >
                      <Text style={styles.showMoreText}>
                        +{bank.tollFree.length - 2} more numbers
                      </Text>
                      <ChevronDown size={16} color="#3b82f6" />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Expanded Content */}
                {expandedBank === bank.name && (
                  <View style={styles.expandedContent}>
                    {/* Regular Numbers */}
                    {bank.regular && bank.regular.length > 0 && (
                      <View style={styles.numbersSection}>
                        <Text style={styles.numbersTitle}>Regular Numbers</Text>
                        <View
                          style={[
                            styles.phoneGrid,
                            isTablet && styles.phoneGridTablet,
                          ]}
                        >
                          {bank.regular.map((number) =>
                            renderPhoneButton(number, "secondary")
                          )}
                        </View>
                      </View>
                    )}

                    {/* Special Services */}
                    {bank.specialNumbers && bank.specialNumbers.length > 0 && (
                      <View style={styles.numbersSection}>
                        <Text style={styles.numbersTitle}>
                          Specialized Services
                        </Text>
                        <View
                          style={[
                            styles.phoneGrid,
                            isTablet && styles.phoneGridTablet,
                          ]}
                        >
                          {bank.specialNumbers.map((special) =>
                            renderPhoneButton(
                              special.number,
                              "special",
                              special.type
                            )
                          )}
                        </View>
                      </View>
                    )}

                    {/* Notes */}
                    {bank.notes && (
                      <View style={styles.notesSection}>
                        <Text style={styles.notesTitle}>
                          Additional Information
                        </Text>
                        <Text style={styles.notesText}>{bank.notes}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Emergency Guidelines */}
          <View style={styles.guidelinesSection}>
            <View style={styles.guidelinesHeader}>
              <AlertTriangle size={24} color="#f59e0b" />
              <Text style={styles.guidelinesTitle}>Emergency Guidelines</Text>
            </View>

            <View
              style={[
                styles.guidelinesGrid,
                isTablet && styles.guidelinesGridTablet,
              ]}
            >
              <View style={styles.guidelineCard}>
                <Text style={styles.guidelineTitle}>Before Calling</Text>
                <Text style={styles.guidelineText}>
                  • Account number and details
                </Text>
                <Text style={styles.guidelineText}>
                  • Transaction information
                </Text>
                <Text style={styles.guidelineText}>• Identity documents</Text>
              </View>

              <View style={styles.guidelineCard}>
                <Text style={styles.guidelineTitle}>During the Call</Text>
                <Text style={styles.guidelineText}>
                  • Request reference number
                </Text>
                <Text style={styles.guidelineText}>• Note agent details</Text>
                <Text style={styles.guidelineText}>
                  • Confirm resolution timeline
                </Text>
              </View>

              <View style={styles.guidelineCard}>
                <Text style={styles.guidelineTitle}>Follow Up</Text>
                <Text style={styles.guidelineText}>
                  • Contact RBI if no response in 30 days
                </Text>
                <Text style={styles.guidelineText}>
                  • Keep all communication records
                </Text>
                <Text style={styles.guidelineText}>
                  • Escalate through proper channels
                </Text>
              </View>
            </View>
          </View>

          {/* Professional Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Banking Emergency Resources</Text>
            <Text style={styles.footerText}>
              All contact numbers are verified and sourced from official bank
              websites. Always prioritize your bank's official channels first.
            </Text>
            <Text style={styles.footerDisclaimer}>
              For unresolved issues, contact RBI Banking Ombudsman after 30
              days.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  contentWrapper: {
    width: "100%",
  },

  // Header Styles
  header: {
    backgroundColor: "#1e40af",
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 24,
    overflow: "hidden",
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  headerContent: {
    padding: 24,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
    lineHeight: 32,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#bfdbfe",
    lineHeight: 24,
  },
  headerStats: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#bfdbfe",
    fontWeight: "500",
  },

  // RBI Section
  rbiSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  rbiHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  rbiIconContainer: {
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  rbiTextContainer: {
    flex: 1,
  },
  rbiTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  rbiSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  rbiContent: {
    padding: 20,
  },
  rbiPhoneButton: {
    backgroundColor: "#dc2626",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  rbiPhoneContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rbiPhoneInfo: {
    flex: 1,
  },
  rbiPhoneNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    marginBottom: 4,
  },
  rbiPhoneLabel: {
    fontSize: 14,
    color: "#fecaca",
    fontWeight: "500",
  },
  rbiPhoneIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  rbiDetails: {
    gap: 12,
  },
  rbiDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rbiDetailText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },

  // Search Section
  searchSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  filterIcon: {
    fontSize: 16,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  filterButtonTextActive: {
    color: "#ffffff",
  },

  // Results
  resultsHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },

  // Banks Grid
  banksGrid: {
    gap: 16,
  },
  banksGridTablet: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bankCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  bankCardTablet: {
    width: isLargeScreen ? "48%" : "100%",
  },

  // Bank Header
  bankHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  bankMainInfo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  bankTypeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 16,
    marginTop: 2,
  },
  govIndicator: {
    backgroundColor: "#10b981",
  },
  privateIndicator: {
    backgroundColor: "#8b5cf6",
  },
  bankTitleContainer: {
    flex: 1,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    lineHeight: 24,
  },
  bankMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bankType: {
    fontSize: 13,
    fontWeight: "600",
  },
  govType: {
    color: "#059669",
  },
  privateType: {
    color: "#7c3aed",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#059669",
  },
  expandButton: {
    backgroundColor: "#f9fafb",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  // Phone Numbers
  primaryNumbers: {
    marginBottom: 16,
  },
  numbersSection: {
    marginBottom: 20,
  },
  numbersTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  phoneGrid: {
    gap: 8,
  },
  phoneGridTablet: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  primaryPhoneButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    ...(isTablet && { flex: 1, minWidth: "48%" }),
  },
  secondaryPhoneButton: {
    backgroundColor: "#f9fafb",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    ...(isTablet && { flex: 1, minWidth: "48%" }),
  },
  specialPhoneButton: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    ...(isTablet && { flex: 1, minWidth: "48%" }),
  },
  phoneLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#dc2626",
    marginBottom: 8,
  },
  phoneButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  phoneIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 6,
    borderRadius: 6,
  },
  primaryPhoneText: {
    color: "#ffffff",
  },
  secondaryPhoneText: {
    color: "#374151",
  },
  specialPhoneText: {
    color: "#dc2626",
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    gap: 6,
  },
  showMoreText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "600",
  },

  // Expanded Content
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 20,
  },
  notesSection: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 22,
  },

  // Guidelines Section
  guidelinesSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  guidelinesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  guidelinesTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 12,
  },
  guidelinesGrid: {
    gap: 16,
  },
  guidelinesGridTablet: {
    flexDirection: "row",
  },
  guidelineCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
    ...(isTablet && { flex: 1 }),
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  guidelineText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
    lineHeight: 20,
  },

  // Footer
  footer: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#d1d5db",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 12,
  },
  footerDisclaimer: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 18,
  },
});
