import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BookOpen,
  Lightbulb,
  ExternalLink,
  Building2,
  Shield,
  GraduationCap,
  Globe,
  Phone,
  Mail,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { PSBColors, PSBShadows, PSBSpacing } from "../../../utils/PSBColors";
import { router } from "expo-router";
import LessonsPage from "../pages/LessonsPage";

const EducationScreen = () => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<
    "glossary" | "lessons" | "resources"
  >("lessons");

  const glossaryItems = [
    {
      term: "Ponzi Scheme",
      definition:
        "A fraudulent investment operation that pays returns to existing investors using capital from new investors, rather than from legitimate business operations.",
      example:
        "Bernie Madoff's investment scandal was one of the largest Ponzi schemes in history.",
    },
    {
      term: "Pyramid Scheme",
      definition:
        "A business model that recruits members via a promise of payments for enrolling others into the scheme, rather than supplying investments or sale of products.",
      example:
        "A pyramid scheme might involve members paying an entry fee and earning money solely by bringing in new recruits.",
    },
    {
      term: "Identity Theft",
      definition:
        "The fraudulent acquisition and use of someone's personal information, usually for financial gain.",
      example:
        "Hackers used stolen social security numbers to open credit cards in victims’ names.",
    },
    {
      term: "Credit Card Fraud",
      definition:
        "Unauthorized use of another person's credit card information to make purchases or withdraw funds.",
      example:
        "A fraudster used a skimming device at an ATM to steal card data and make unauthorized purchases.",
    },
    {
      term: "Phishing Scam",
      definition:
        "A cyber attack where criminals pose as legitimate institutions to lure individuals into providing sensitive data such as passwords and banking information.",
      example:
        "A victim received an email that looked like it was from their bank, asking them to confirm account details via a fake link.",
    },
    {
      term: "Investment Fraud",
      definition:
        "Deceptive practices to convince individuals to invest in worthless, nonexistent, or misrepresented investment opportunities.",
      example:
        "The company promised unrealistic returns on fake cryptocurrency investments.",
    },
    {
      term: "Mortgage Fraud",
      definition:
        "A type of fraud involving the misrepresentation of information to obtain a mortgage loan or better loan terms dishonestly.",
      example:
        "A buyer lied about their income and assets to get approved for a larger mortgage.",
    },
    {
      term: "Tax Scam",
      definition:
        "A fraudulent scheme where scammers promise large tax refunds or reduced liabilities through false information or illegal methods.",
      example:
        "A fake tax preparer filed false returns to claim inflated deductions for clients and took a cut of the refunds.",
    },
    {
      term: "Lottery and Sweepstakes Fraud",
      definition:
        "Scammers tell victims they’ve won a lottery or prize but must pay fees or taxes upfront to claim it.",
      example:
        "The victim received a letter claiming they won a foreign lottery and had to wire money for processing fees.",
    },
    {
      term: "Charity Scam",
      definition:
        "Fraudulent solicitation of donations for causes that don’t exist or don’t benefit the stated beneficiaries.",
      example:
        "After a natural disaster, scammers created fake websites to collect donations from well-meaning individuals.",
    },
    {
      term: "Debt Relief Scam",
      definition:
        "A scheme that falsely promises to reduce or eliminate a person’s debt in exchange for upfront fees, but delivers little or no actual relief.",
      example:
        "The company charged high fees and claimed they would negotiate with creditors but never followed through.",
    },
    {
      term: "Fake Check Scam",
      definition:
        "A scam where the victim is sent a counterfeit check and asked to send back money before the check clears and bounces.",
      example:
        "A victim was hired for a mystery shopper job, sent a fake check, and asked to send back a portion in gift cards.",
    },
    {
      term: "Online Banking Fraud",
      definition:
        "Unauthorized access to or manipulation of online banking accounts through hacking, phishing, or social engineering.",
      example:
        "Hackers used stolen credentials to transfer funds from the victim’s bank account to overseas accounts.",
    },
    {
      term: "Employment Fraud",
      definition:
        "Scams involving fake job offers that require payment for training, equipment, or background checks, but never lead to actual employment.",
      example:
        "A victim paid for a work-from-home training kit that never arrived and was unable to contact the employer again.",
    },
    {
      term: "Student Loan Scam",
      definition:
        "A fraud involving fake companies that offer to reduce or erase student loan debt in exchange for fees but provide no actual service.",
      example:
        "The student was tricked into paying a fee for loan forgiveness assistance that never materialized.",
    },
    {
      term: "Old Tax Regime",
      definition:
        "A tax system where taxpayers can reduce their taxable income through various deductions such as under Sections 80C, 80D, HRA, LTA, and home loan interest.",
      example:
        "A taxpayer reduced their tax by ₹1.5L using 80C and another ₹2L using home loan interest.",
    },
  ];

  const resources = [
    {
      title: "SEBI Investor Portal",
      description:
        "Securities and Exchange Board of India - Official investor protection portal",
      url: "https://www.sebi.gov.in",
      icon: Building2,
    },
    {
      title: "RBI Consumer Education",
      description: "Reserve Bank of India - Banking and financial awareness",
      url: "https://www.rbi.org.in",
      icon: Building2,
    },
    {
      title: "Cybercrime Reporting",
      description: "Report financial fraud and cybercrime to authorities",
      url: "https://cybercrime.gov.in",
      icon: Shield,
    },
    {
      title: "PFMS Scholarship",
      description:
        "Public Financial Management System - Government schemes verification",
      url: "https://pfms.nic.in",
      icon: GraduationCap,
    },
    {
      title: "HelpLine Numbers",
      description: "Important helpline numbers for financial issues",
      url: null, // Placeholder for helpline numbers
      icon: Phone,
    },
    {
      title: "Financial Literacy Videos",
      description:
        "Educational videos on financial literacy and fraud prevention",
      url: "https://www.youtube.com/FinancialLiteracyIndia",
      icon: Globe,
    },
    {
      title: "Consumer Complaints",
      description:
        "File complaints against banks, insurance companies, and financial institutions",
      url: "https://www.consumercomplaints.in",
      icon: Mail,
    },
  ];

  const handleLinkPress = (url) => {
    if (!url) router.push("/pages/HelpLineNumbers");
    Linking.openURL(url);
  };

  const renderGlossary = () => (
    <View>
      {glossaryItems.map((item, index) => (
        <View
          key={index}
          style={[
            styles.glossaryCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              borderWidth: 0.4,
            },
          ]}
        >
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push("/pages/FraudDetails?fraud=" + item.term)
            }
            activeOpacity={0.8}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.glossaryTerm, { color: theme.colors.text }]}>
                {item.term}
              </Text>
              <ExternalLink size={22} color={theme.colors.textSecondary} />
            </View>
            <Text
              style={[styles.glossaryDefinition, { color: theme.colors.text }]}
            >
              {item.definition}
            </Text>
            <View
              style={[
                styles.exampleContainer,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderWidth: 0.2,
                },
              ]}
            >
              <Text style={styles.exampleIcon}>💡</Text>
              <Text
                style={[styles.glossaryExample, { color: theme.colors.text }]}
              >
                {item.example}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.emergencyCard}>
        <Text style={styles.emergencyTitle}>🚨 Report Fraud Immediately</Text>
        <Text style={styles.emergencyText}>
          If you've been a victim of fraud or suspect fraudulent activity,
          report it immediately through these official channels:
        </Text>
        <View style={styles.emergencyContacts}>
          <View style={styles.contactItem}>
            <Phone size={16} color="#EF4444" />
            <Text style={styles.emergencyContact}>
              Cyber Crime Helpline: 1930
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Globe size={16} color="#EF4444" />
            <Text style={styles.emergencyContact}>cybercrime.gov.in</Text>
          </View>
          <View style={styles.contactItem}>
            <Mail size={16} color="#EF4444" />
            <Text style={styles.emergencyContact}>
              report.phishing@rbi.org.in
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderLessons = () => <LessonsPage />;

  const renderResources = () => (
    <View>
      {resources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.resourceCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              borderWidth: 0.4,
            },
          ]}
          onPress={() => handleLinkPress(resource.url)}
          activeOpacity={0.8}
        >
          <View style={styles.resourceHeader}>
            <resource.icon size={24} color="#45b7d1" />
            <View style={styles.resourceContent}>
              <Text
                style={[styles.resourceTitle, { color: theme.colors.text }]}
              >
                {resource.title}
              </Text>
              <Text
                style={[
                  styles.resourceDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {resource.description}
              </Text>
            </View>
            <ExternalLink size={22} color={theme.colors.textSecondary} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={[theme.colors.background[0], theme.colors.background[1]]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Education Center
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Master essential skills through our structured learning modules.
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: "#a59d9d24",
                borderColor: theme.colors.border,
                borderWidth: 0.3,
              },
              selectedTab === "lessons" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("lessons")}
          >
            <Lightbulb
              size={20}
              color={selectedTab === "lessons" ? "white" : theme.colors.icon}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === "lessons" ? "white" : theme.colors.icon,
                },
              ]}
            >
              Lessons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: "#a59d9d24",
                borderColor: theme.colors.border,
                borderWidth: 0.3,
              },
              selectedTab === "glossary" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("glossary")}
          >
            <BookOpen
              size={20}
              color={selectedTab === "glossary" ? "white" : theme.colors.icon}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === "glossary" ? "white" : theme.colors.icon,
                },
              ]}
            >
              Glossary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: "#a59d9d24",
                borderColor: theme.colors.border,
                borderWidth: 0.3,
              },
              selectedTab === "resources" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("resources")}
          >
            <ExternalLink
              size={20}
              color={selectedTab === "resources" ? "white" : theme.colors.icon}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === "resources" ? "white" : theme.colors.icon,
                },
              ]}
            >
              Resources
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === "glossary" && renderGlossary()}
          {selectedTab === "lessons" && renderLessons()}
          {selectedTab === "resources" && renderResources()}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: PSBSpacing.lg,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: PSBColors.primary.gold,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: PSBColors.text.inverse,
    marginTop: 8,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: PSBSpacing.lg,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: PSBColors.primary.green,
  },
  tabText: {
    color: PSBColors.text.inverse,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  activeTabText: {
    color: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: PSBSpacing.lg,
  },
  glossaryCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: PSBSpacing.lg,
    marginBottom: 15,
  },
  glossaryTerm: {
    fontSize: 18,
    fontWeight: "bold",
    color: PSBColors.primary.gold,
    marginBottom: 10,
  },
  glossaryDefinition: {
    fontSize: 14,
    color: PSBColors.text.inverse,
    lineHeight: 20,
    marginBottom: 15,
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: PSBColors.effects.highlight,
    borderRadius: 8,
    padding: 12,
  },
  exampleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  glossaryExample: {
    fontSize: 13,
    color: PSBColors.text.inverse,
    fontStyle: "italic",
    flex: 1,
    lineHeight: 18,
  },
  tipCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: PSBSpacing.lg,
    marginBottom: 15,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipIconText: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: PSBColors.text.inverse,
    marginLeft: 12,
  },
  tipDescription: {
    fontSize: 14,
    color: PSBColors.text.inverse,
    lineHeight: 20,
  },
  resourceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: PSBSpacing.lg,
    marginBottom: 15,
  },
  resourceHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  resourceContent: {
    flex: 1,
    marginLeft: 15,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: PSBColors.text.inverse,
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: PSBColors.text.inverse,
    lineHeight: 18,
  },
  emergencyCard: {
    backgroundColor: PSBColors.background.card,
    marginHorizontal: 2,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PSBColors.status.error,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: PSBColors.status.error,
    marginBottom: 12,
  },
  emergencyText: {
    fontSize: 14,
    color: PSBColors.text.primary,
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyContacts: {
    gap: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emergencyContact: {
    fontSize: 14,
    fontWeight: "600",
    color: PSBColors.text.primary,
  },
});

export default EducationScreen;
