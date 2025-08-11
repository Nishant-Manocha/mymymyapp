import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import Animated, {
  FadeInUp,
  FadeInDown,
  SlideInRight,
} from "react-native-reanimated";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";
import { Alert as CustomAlert, AlertTitle, AlertDescription } from "./ui/Alert";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import API from "../api/api"; // adjust the path if needed

interface AnalysisResult {
  score: number;
  verdict: string;
  flags: Array<{
    type: string;
    severity: "low" | "medium" | "high";
    description: string;
    recommendation?: string;
  }>;
  analysis: string;
  timestamp: Date;
  reason?: string[];
  dangerous_links?: Array<{
    url: string;
    virustotal_score: number;
    message: string;
  }>;
}

interface AnalysisHistory {
  id: string;
  type: "email" | "url";
  content: string;
  result: AnalysisResult;
}

export function FraudAnalyzer() {
  const [emailContent, setEmailContent] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [emailResult, setEmailResult] = useState<AnalysisResult | null>(null);
  const [urlResult, setUrlResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState("email");
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  // const [backendStatus, setBackendStatus] = useState<
  //   "checking" | "ok" | "fail"
  // >("checking");
  const [copied, setCopied] = useState(false);
  const [selectedHistory, setSelectedHistory] =
    useState<AnalysisHistory | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Enhanced fraud detection with more sophisticated patterns
  const suspiciousEmails = [
    "support@paypal.verify.com",
    "admin@updatemybank.ru",
    "security@bankofamerica-update.com",
    "noreply@amazon.secure-verify.net",
    "account@microsoft-security.co",
    "service@apple-id-locked.org",
    "billing@netflix-suspended.com",
    "team@facebook-security.net",
    "support@google-account.org",
  ];

  const redFlagDomains = [
    "xyz",
    "tk",
    "ml",
    "ga",
    "cf",
    "top",
    "click",
    "download",
    "stream",
    "phishing.com",
    "scamlink.net",
    "secure-bank.tk",
    "paypal-verify.ml",
    "amazon-security.xyz",
    "microsoft-update.top",
    "apple-support.click",
  ];

  const phishingKeywords = [
    "urgent",
    "verify account",
    "suspended",
    "click here",
    "act now",
    "limited time",
    "congratulations",
    "you've won",
    "claim now",
    "update payment",
    "confirm identity",
    "security alert",
    "unusual activity",
    "account locked",
    "expires today",
    "final notice",
    "immediate action",
    "verify now",
    "account closure",
    "refund pending",
    "tax refund",
  ];

  const suspiciousPatterns = [
    /\b\d{4}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}\b/, // Credit card pattern
    /\b\d{3}[-\s]\d{2}[-\s]\d{4}\b/, // SSN pattern
    /password.*[:=]\s*\w+/i, // Password requests
    /pin.*[:=]\s*\d+/i, // PIN requests
    /routing.*number/i, // Banking info
    /account.*number/i, // Account numbers
  ];

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    triggerHaptic();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const extractEmailFromContent = (content: string): string | null => {
    const emailMatch = content.match(/from:\s*([^\s@]+@[^\s@]+\.[^\s@]+)/i);
    return emailMatch ? emailMatch[1].toLowerCase() : null;
  };

  const analyzeEmailSender = (
    content: string
  ): { flags: any[]; score: number } => {
    const flags = [];
    let score = 100;

    const senderEmail = extractEmailFromContent(content);
    if (senderEmail) {
      if (suspiciousEmails.includes(senderEmail)) {
        flags.push({
          type: "Known Malicious Sender",
          severity: "high" as const,
          description: `Sender ${senderEmail} is in our threat intelligence database`,
          recommendation: "Block this sender immediately and report as spam",
        });
        score -= 50;
      }

      const domain = senderEmail.split("@")[1];
      if (domain) {
        for (let redDomain of redFlagDomains) {
          if (domain.includes(redDomain)) {
            flags.push({
              type: "High-Risk Domain",
              severity: "high" as const,
              description: `Domain uses suspicious TLD or pattern: ${redDomain}`,
              recommendation: "Avoid clicking any links from this domain",
            });
            score -= 40;
            break;
          }
        }

        // Check for domain impersonation
        const legitimateDomains = [
          "paypal.com",
          "amazon.com",
          "microsoft.com",
          "apple.com",
          "google.com",
        ];
        for (let legitDomain of legitimateDomains) {
          if (
            domain.includes(legitDomain.split(".")[0]) &&
            !domain.endsWith(legitDomain)
          ) {
            flags.push({
              type: "Domain Impersonation",
              severity: "high" as const,
              description: `Domain mimics legitimate ${legitDomain} but is not official`,
              recommendation:
                "Verify sender through official channels before taking any action",
            });
            score -= 45;
            break;
          }
        }
      }
    }

    return { flags, score };
  };

  const generateDetailedAnalysis = (
    level: string,
    flagCount: number,
    type: string
  ): string => {
    const typeText = type === "email" ? "Email" : "Website";

    if (level === "safe") {
      return `${typeText} analysis complete. ${flagCount === 0
        ? "No security issues detected."
        : `${flagCount} minor issue(s) found.`
        } This appears to be legitimate and safe to interact with.`;
    } else if (level === "suspicious") {
      return `${typeText} analysis complete. Found ${flagCount} security concern(s). Exercise caution and verify authenticity through official channels before taking any action.`;
    } else {
      return `${typeText} analysis complete. DANGER: Found ${flagCount} critical security issue(s). This shows strong indicators of fraud or malicious intent. Do not interact with this ${type}.`;
    }
  };

  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      Alert.alert("Input Required", "Please paste email content to analyze");
      return;
    }
    triggerHaptic();
    setIsAnalyzing(true);
    setProgress(0);
    setEmailResult(null);
    try {
      const res = await API.post("/check", { input: emailContent.trim() });
      const data = res.data;
      console.log("API response:", data);
      setEmailResult({
        score: data.final_score,
        verdict: data.verdict,
        flags: [],
        analysis: data.reason ? data.reason.join("\n") : data.verdict,
        timestamp: new Date(),
        reason: data.reason,
        dangerous_links: data.dangerous_links,
      });
      // Add to history
      const historyItem = {
        id: Date.now().toString(),
        type: "email" as "email",
        content: emailContent.substring(0, 100) + "...",
        result: {
          score: data.final_score,
          verdict: data.verdict,
          flags: [],
          analysis: data.reason ? data.reason.join("\n") : data.verdict,
          timestamp: new Date(),
          reason: data.reason,
          dangerous_links: data.dangerous_links,
        },
      } as AnalysisHistory;
      setHistory((prev) => [historyItem, ...prev.slice(0, 9)]);
      triggerHaptic();
      Alert.alert("Analysis Complete", `Result: ${data.verdict} (Score: ${data.final_score}/100)`);
    } catch (error) {
      Alert.alert("Analysis Failed", "Could not analyze email. Please try again.");
    } finally {
      setIsAnalyzing(false);
      setProgress(0);

    }
  };

  const analyzeUrl = async () => {
    if (!websiteUrl.trim()) {
      Alert.alert("Input Required", "Please enter a website URL to analyze");
      return;
    }
    triggerHaptic();
    setIsAnalyzing(true);
    setProgress(0);
    setUrlResult(null);
    try {
      const response = await fetch(`${process.env.SERVER_URL}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: websiteUrl.trim() }),
      });
      const data = await response.json();
      console.log("API response:", data);
      setUrlResult({
        score: data.final_score,
        verdict: data.verdict,
        flags: [],
        analysis: data.reason ? data.reason.join("\n") : data.verdict,
        timestamp: new Date(),
        reason: data.reason,
        dangerous_links: data.dangerous_links,
      });
      // Add to history
      const historyItem = {
        id: Date.now().toString(),
        type: "url" as "url",
        content: websiteUrl,
        result: {
          score: data.final_score,
          verdict: data.verdict,
          flags: [],
          analysis: data.reason ? data.reason.join("\n") : data.verdict,
          timestamp: new Date(),
          reason: data.reason,
          dangerous_links: data.dangerous_links,
        },
      } as AnalysisHistory;
      setHistory((prev) => [historyItem, ...prev.slice(0, 9)]);
      triggerHaptic();
      Alert.alert(
        "Analysis Complete",
        `Result: ${data.verdict} (Score: ${data.final_score}/100)`
      );
    } catch (error) {
      Alert.alert(
        "Analysis Failed",
        "Could not analyze website. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  const getScoreIcon = (level: string) => {
    switch (level) {
      case "safe":
        return "shield-checkmark";
      case "suspicious":
        return "warning";
      case "danger":
        return "alert-circle";
      default:
        return "scan";
    }
  };

  const getScoreColor = (level: string) => {
    switch (level) {
      case "safe":
        return "#10b981";
      case "suspicious":
        return "#f59e0b";
      case "danger":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getBadgeVariant = (verdict: string) => {
    if (verdict.toLowerCase().includes("safe")) return "default"; // green
    if (
      verdict.toLowerCase().includes("danger") ||
      verdict.toLowerCase().includes("phishing")
    )
      return "destructive"; // red
    if (
      verdict.toLowerCase().includes("caution") ||
      verdict.toLowerCase().includes("suspicious")
    )
      return "secondary"; // yellow
    return "default";
  };

  const renderResult = (result: AnalysisResult) => {
    const scoreIcon = getScoreIcon(result.verdict);
    const scoreColor = getScoreColor(result.verdict);
    const urlScanResults = result.dangerous_links || [];
    const showIssues = result.score < 80;
    // Get first 1-2 key reasons for summary
    const summaryReasons = result.reason ? result.reason.slice(0, 2) : [];
    // Determine card background color
    let cardBg = styles.resultCard.backgroundColor;
    if (result.score < 50) cardBg = "#2d1a1a"; // deep red for dangerous
    else if (result.score < 80) cardBg = "#332a1a"; // yellowish for caution

    return (
      <Card
        style={[styles.resultCard, { backgroundColor: cardBg }]}
        animated
        delay={200}
      >
        <CardHeader>
          <Animated.View
            entering={SlideInRight.delay(300)}
            style={styles.resultHeader}
          >
            <View style={styles.resultHeaderLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${scoreColor}20` },
                ]}
              >
                <Ionicons
                  name={scoreIcon as any}
                  size={28}
                  color={scoreColor}
                />
              </View>
              <View style={styles.resultHeaderText}>
                <CardTitle style={styles.resultTitle}>
                  Security Analysis
                </CardTitle>
                {/* Show verdict badge first */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Badge
                    variant={
                      result.score < 50
                        ? "destructive"
                        : result.score < 80
                          ? "secondary"
                          : "default"
                    }
                    style={[styles.levelBadge, { marginRight: 8 }]}
                  >
                    {result.verdict}
                  </Badge>
                  {/* Remove score here, move to right side */}
                </View>
                {/* Show summary reasons (first 1-2) as a paragraph */}
                {summaryReasons.length > 0 && (
                  <Text
                    style={[
                      styles.resultDescription,
                      { marginBottom: 4, color: "#f59e0b" },
                    ]}
                  >
                    {summaryReasons.join(" ")}
                  </Text>
                )}
              </View>
            </View>
            {/* Score on the right, large */}
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "center",
                minWidth: 70,
              }}
            >
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  color: scoreColor,
                  lineHeight: 52,
                }}
              >
                {result.score}
              </Text>
              <Text
                style={{ fontSize: 16, color: scoreColor, fontWeight: "600" }}
              >
                / 100
              </Text>
            </View>
          </Animated.View>
        </CardHeader>
        <CardContent style={styles.resultContent}>
          {/* Security Issues Detected section */}
          {showIssues ? (
            <Animated.View
              entering={FadeInUp.delay(500)}
              style={styles.flagsSection}
            >
              <View style={styles.flagsHeader}>
                <Ionicons name="warning" size={20} color="#f59e0b" />
                <Text style={styles.flagsTitle}>Security Issues Detected</Text>
              </View>
              {/* Show all reasons as bullet points */}
              {result.reason && result.reason.length > 0 && (
                <View style={{ marginBottom: 8 }}>
                  {result.reason.map((msg, idx) => (
                    <Text
                      key={idx}
                      style={[styles.flagDescription, { color: "#f59e0b" }]}
                    >
                      • {msg}
                    </Text>
                  ))}
                </View>
              )}
              {/* Show urlScanResults if available */}
              {urlScanResults.length > 0 ? (
                <View style={styles.flagsList}>
                  {urlScanResults.map((scan, idx) => (
                    <Animated.View
                      key={idx}
                      entering={FadeInUp.delay(600 + idx * 100)}
                      style={styles.flagItem}
                    >
                      <Badge
                        variant={
                          scan.virustotal_score >= 7
                            ? "destructive"
                            : scan.virustotal_score >= 4
                              ? "secondary"
                              : "outline"
                        }
                        style={styles.flagBadge}
                      >
                        {scan.message}
                      </Badge>
                      <View style={styles.flagContent}>
                        <Text style={styles.flagType}>{scan.url}</Text>
                        <Text style={styles.flagDescription}>
                          VirusTotal Score: {scan.virustotal_score}
                        </Text>
                        {scan.virustotal_score >= 7 && (
                          <Text
                            style={[
                              styles.flagRecommendation,
                              { color: "#ef4444" },
                            ]}
                          >
                            This URL is considered dangerous because it has a
                            high VirusTotal score.
                          </Text>
                        )}
                      </View>
                    </Animated.View>
                  ))}
                </View>
              ) : (
                <Text style={styles.flagDescription}>
                  Potential security issues detected. Please review the input
                  carefully.
                </Text>
              )}
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeInUp.delay(500)}
              style={styles.noFlags}
            >
              <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              <Text style={styles.noFlagsText}>
                No security issues detected
              </Text>
              <Text style={styles.noFlagsSubtext}>
                This appears to be legitimate and safe
              </Text>
            </Animated.View>
          )}
          <Animated.View
            entering={FadeInUp.delay(700)}
            style={styles.actionButtons}
          >
            {/* Copy button with no border, show 'Copied' if copied */}
            {copied ? (
              <Text
                style={{ color: "#10b981", fontWeight: "bold", fontSize: 14 }}
              >
                Copied
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => copyToClipboard(JSON.stringify(result, null, 2))}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  padding: 0,
                  margin: 0,
                  minWidth: 0,
                  minHeight: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="copy" size={16} color="#9ca3af" />
                <Text
                  style={[
                    styles.actionButtonText,
                    { fontSize: 14, marginLeft: 2 },
                  ]}
                >
                  Copy
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.timestamp}>
              Analyzed: {result.timestamp.toLocaleTimeString()}
            </Text>
          </Animated.View>
        </CardContent>
      </Card>
    );
  };

  const renderHistory = () => {
    if (history.length === 0) {
      return (
        <Card style={styles.historyCard}>
          <CardContent style={styles.emptyHistory}>
            <Ionicons name="time" size={48} color="#6b7280" />
            <Text style={styles.emptyHistoryText}>No analysis history yet</Text>
            <Text style={styles.emptyHistorySubtext}>
              Your recent analyses will appear here
            </Text>
          </CardContent>
        </Card>
      );
    }

    return (
      <View style={styles.historyList}>
        {history.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => {
              setSelectedHistory(item);
              setModalVisible(true);
            }}
            style={styles.historyItem} // use historyItem for Pressable
          >
            <Card
              style={{
                backgroundColor: "transparent",
                elevation: 0,
                shadowOpacity: 0,
              }} // no border for Pressable
              animated
              delay={index * 100}
            >
              <CardContent style={styles.historyItemContent}>
                <View style={styles.historyItemHeader}>
                  <View style={styles.historyItemLeft}>
                    <Ionicons
                      name={item.type === "email" ? "mail" : "globe"}
                      size={20}
                      color={getScoreColor(item.result.verdict)}
                    />
                    <View style={styles.historyItemText}>
                      <Text style={styles.historyItemTitle}>
                        {item.type === "email"
                          ? "Email Analysis"
                          : "Website Analysis"}
                      </Text>
                      <Text style={styles.historyItemContent} numberOfLines={1}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.historyItemRight}>
                    <Text
                      style={[
                        styles.historyScore,
                        { color: getScoreColor(item.result.verdict) },
                      ]}
                    >
                      {item.result.score}
                    </Text>
                    <Badge
                      variant={getBadgeVariant(item.result.verdict)}
                      style={styles.historyBadge}
                    >
                      {item.result.verdict.toUpperCase()}
                    </Badge>
                  </View>
                </View>
              </CardContent>
            </Card>
          </Pressable>
        ))}
        {/* Modal for details */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#1a2332",
                borderRadius: 16,
                padding: 24,
                width: "90%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#10b981",
                  marginBottom: 8,
                }}
              >
                Detection Details
              </Text>
              {selectedHistory && (
                <>
                  <Text
                    style={{
                      color: "#9ca3af",
                      marginBottom: 8,
                      fontWeight: "bold",
                    }}
                  >
                    Full Content:
                  </Text>
                  <Text style={{ color: "#f9fafb", marginBottom: 16 }}>
                    {selectedHistory.content}
                  </Text>
                  <Text
                    style={{
                      color: "#9ca3af",
                      marginBottom: 8,
                      fontWeight: "bold",
                    }}
                  >
                    Detected Issues:
                  </Text>
                  {selectedHistory.result.reason &&
                    selectedHistory.result.reason.length > 0 ? (
                    selectedHistory.result.reason.map((msg, idx) => (
                      <Text
                        key={idx}
                        style={{ color: "#f59e0b", marginBottom: 4 }}
                      >
                        • {msg}
                      </Text>
                    ))
                  ) : (
                    <Text style={{ color: "#10b981" }}>
                      No suspicious activity detected.
                    </Text>
                  )}
                </>
              )}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ marginTop: 20, alignSelf: "center" }}
              >
                <Text
                  style={{ color: "#10b981", fontWeight: "bold", fontSize: 16 }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Backend connection status message */}
        {/* <View style={{ marginBottom: 16 }}>
          {backendStatus === "checking" && (
            <Text
              style={{
                color: "#f59e0b",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Checking backend connection...
            </Text>
          )}
          {backendStatus === "ok" && (
            <Text
              style={{
                color: "#10b981",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Backend connection successful!
            </Text>
          )}
          {backendStatus === "fail" && (
            <Text
              style={{
                color: "#ef4444",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Backend connection failed!
            </Text>
          )}
        </View> */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.headerTitle}>
            <View style={styles.logoContainer}>
              <Ionicons name="shield-checkmark" size={36} color="#10b981" />
            </View>
            <Text style={styles.title}>PhishEye Pro</Text>
          </View>
          <Text style={styles.subtitle}>
            Advanced AI-powered fraud detection and security analysis. Protect
            yourself from phishing, scams, and malicious websites with real-time
            threat intelligence.
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>99.9%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Protection</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>Real-time</Text>
              <Text style={styles.statLabel}>Analysis</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            style={styles.tabs}
          >
            <TabsList style={styles.tabsList}>
              <TabsTrigger value="email" style={styles.tabTrigger}>
                <Ionicons
                  name="mail"
                  size={18}
                  color={activeTab === "email" ? "#10b981" : "#9ca3af"}
                  style={{ marginRight: 16 }}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: activeTab === "email" ? "#10b981" : "#9ca3af" },
                  ]}
                >
                  Email Analysis
                </Text>
              </TabsTrigger>
              <TabsTrigger value="website" style={styles.tabTrigger}>
                <Ionicons
                  name="globe"
                  size={18}
                  color={activeTab === "website" ? "#10b981" : "#9ca3af"}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: activeTab === "website" ? "#10b981" : "#9ca3af" },
                  ]}
                >
                  Website Analysis
                </Text>
              </TabsTrigger>
              <TabsTrigger value="history" style={styles.tabTrigger}>
                <Ionicons
                  name="time"
                  size={18}
                  color={activeTab === "history" ? "#10b981" : "#9ca3af"}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: activeTab === "history" ? "#10b981" : "#9ca3af" },
                  ]}
                >
                  History
                </Text>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" style={styles.tabContent}>
              <Card animated>
                <CardHeader>
                  <View style={styles.cardHeaderWithIcon}>
                    <View style={styles.cardIconContainer}>
                      <Ionicons name="mail" size={24} color="#10b981" />
                    </View>
                    <View style={styles.cardHeaderText}>
                      <CardTitle>Email Security Analysis</CardTitle>
                      <CardDescription>
                        Paste suspicious email content for comprehensive fraud
                        detection and threat analysis
                      </CardDescription>
                    </View>
                  </View>
                </CardHeader>
                <CardContent style={styles.cardContent}>
                  <Input
                    label="Email Content"
                    placeholder="Paste the complete email here (headers, body, links, attachments info)..."
                    value={emailContent}
                    onChangeText={setEmailContent}
                    multiline
                    numberOfLines={8}
                    style={styles.emailInput}
                  />

                  {isAnalyzing && (
                    <Animated.View entering={FadeInUp} style={styles.analyzing}>
                      <View style={styles.analyzingHeader}>
                        <LoadingSpinner size={20} color="#10b981" />
                        <Text style={styles.analyzingText}>
                          Analyzing email content with AI threat detection...
                        </Text>
                      </View>
                      <Progress
                        value={progress}
                        variant={
                          progress < 50
                            ? "default"
                            : progress < 80
                              ? "warning"
                              : "success"
                        }
                        style={styles.progress}
                      />
                      <Text style={styles.progressText}>
                        {progress}% Complete
                      </Text>
                    </Animated.View>
                  )}

                  <Button
                    onPress={analyzeEmail}
                    disabled={isAnalyzing || !emailContent.trim()}
                    variant="scan"
                    size="lg"
                    loading={isAnalyzing}
                    style={styles.analyzeButton}
                  >
                    {isAnalyzing
                      ? "Analyzing Email..."
                      : "🔍 Analyze Email Security"}
                  </Button>
                </CardContent>
              </Card>

              {emailResult && renderResult(emailResult)}
            </TabsContent>

            <TabsContent value="website" style={styles.tabContent}>
              <Card animated>
                <CardHeader>
                  <View style={styles.cardHeaderWithIcon}>
                    <View style={styles.cardIconContainer}>
                      <Ionicons name="globe" size={24} color="#10b981" />
                    </View>
                    <View style={styles.cardHeaderText}>
                      <CardTitle>Website Security Scanner</CardTitle>
                      <CardDescription>
                        Enter a website URL to check for phishing indicators,
                        domain reputation, and security issues
                      </CardDescription>
                    </View>
                  </View>
                </CardHeader>
                <CardContent style={styles.cardContent}>
                  <Input
                    label="Website URL"
                    placeholder="https://example.com or example.com"
                    value={websiteUrl}
                    onChangeText={setWebsiteUrl}
                    style={styles.urlInput}
                  />

                  {isAnalyzing && (
                    <Animated.View entering={FadeInUp} style={styles.analyzing}>
                      <View style={styles.analyzingHeader}>
                        <LoadingSpinner size={20} color="#10b981" />
                        <Text style={styles.analyzingText}>
                          Scanning domain reputation and security
                          certificates...
                        </Text>
                      </View>
                      <Progress
                        value={progress}
                        variant={
                          progress < 50
                            ? "default"
                            : progress < 80
                              ? "warning"
                              : "success"
                        }
                        style={styles.progress}
                      />
                      <Text style={styles.progressText}>
                        {progress}% Complete
                      </Text>
                    </Animated.View>
                  )}

                  <Button
                    onPress={analyzeUrl}
                    disabled={isAnalyzing || !websiteUrl.trim()}
                    variant="scan"
                    size="lg"
                    loading={isAnalyzing}
                    style={styles.analyzeButton}
                  >
                    {isAnalyzing
                      ? "Scanning Website..."
                      : "🌐 Scan Website Security"}
                  </Button>
                </CardContent>
              </Card>

              {urlResult && renderResult(urlResult)}
            </TabsContent>

            <TabsContent value="history" style={styles.tabContent}>
              <Card animated>
                <CardHeader>
                  <View style={styles.cardHeaderWithIcon}>
                    <View style={styles.cardIconContainer}>
                      <Ionicons name="time" size={24} color="#10b981" />
                    </View>
                    <View style={styles.cardHeaderText}>
                      <CardTitle>Analysis History</CardTitle>
                      <CardDescription>
                        Review your recent security analyses and threat
                        assessments
                      </CardDescription>
                    </View>
                  </View>
                </CardHeader>
              </Card>

              {renderHistory()}
            </TabsContent>
          </Tabs>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#10b981",
    letterSpacing: -1,
  },
  subtitle: {
    color: "#9ca3af",
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 24,
    fontSize: 16,
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#374151",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    minWidth: 0,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "500",
    color: "#10b981",
    marginBottom: 4,
    flexShrink: 0,
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
    flexShrink: 0,
    flexWrap: "nowrap",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#374151",
    marginHorizontal: 16,
  },
  tabs: {
    width: "100%",
  },
  tabsList: {
    marginBottom: 32,
    backgroundColor: "#1f2937",
    borderRadius: 16,
    paddingVertical: 8, // add vertical padding
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 0,
    minHeight: 48, // ensure enough height
    overflow: "visible",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: undefined,
    marginLeft: 4,
    textAlignVertical: "center", // for Android
  },
  tabTrigger: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
    minHeight: 40, // ensure enough height for icon+text
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "transparent",
    flexDirection: "row",
    overflow: "visible",
  },
  tabContent: {
    gap: 32,
  },
  cardHeaderWithIcon: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardContent: {
    gap: 20,
  },
  emailInput: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
    minHeight: 120,
  },
  urlInput: {
    fontSize: 16,
  },
  analyzing: {
    gap: 12,
    padding: 20,
    backgroundColor: "rgba(16, 185, 129, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  analyzingHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  analyzingText: {
    fontSize: 15,
    color: "#f9fafb",
    fontWeight: "500",
    flex: 1,
  },
  progress: {
    height: 8,
  },
  progressText: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    fontWeight: "500",
  },
  analyzeButton: {
    marginTop: 8,
  },
  resultCard: {
    borderColor: "rgba(16, 185, 129, 0.2)",
    backgroundColor: "#1a2332",
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  resultHeaderLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  resultHeaderText: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  resultHeaderRight: {
    alignItems: "flex-end",
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 36,
  },
  scoreLabel: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resultContent: {
    gap: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 16,
  },
  domainInfo: {
    padding: 20,
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151",
  },
  domainGrid: {
    gap: 16,
  },
  domainInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  domainInfoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#d1d5db",
  },
  domainInfoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f9fafb",
  },
  sslStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  flagsSection: {
    gap: 16,
  },
  flagsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flagsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f9fafb",
  },
  flagsList: {
    gap: 12,
  },
  flagItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    padding: 16,
    backgroundColor: "rgba(55, 65, 81, 0.3)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151",
  },
  flagBadge: {
    marginTop: 2,
  },
  flagContent: {
    flex: 1,
    gap: 6,
  },
  flagType: {
    fontWeight: "600",
    fontSize: 15,
    color: "#f9fafb",
  },
  flagDescription: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
  flagRecommendation: {
    fontSize: 13,
    color: "#10b981",
    fontStyle: "italic",
    lineHeight: 18,
  },
  noFlags: {
    alignItems: "center",
    gap: 12,
    padding: 24,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  noFlagsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#10b981",
  },
  noFlagsSubtext: {
    fontSize: 14,
    color: "#9ca3af",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButtonText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
  },
  historyCard: {
    marginTop: 16,
  },
  emptyHistory: {
    alignItems: "center",
    gap: 16,
    paddingVertical: 40,
  },
  emptyHistoryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9ca3af",
  },
  emptyHistorySubtext: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  historyList: {
    gap: 16,
    marginTop: 16,
  },
  historyItem: {
    backgroundColor: "#1a2332",
    borderColor: "#374151",
  },
  historyItemContent: {
    padding: 16,
    fontSize: 14,
    color: "#9ca3af",
  },
  historyItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  historyItemText: {
    flex: 1,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 4,
  },

  historyItemRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  historyScore: {
    fontSize: 20,
    fontWeight: "700",
  },
  historyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
