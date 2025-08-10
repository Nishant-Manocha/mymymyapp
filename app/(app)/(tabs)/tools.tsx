import React, { useState, useEffect, useRef } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import {
  Shield,
  CreditCard,
  TrendingUp,
  TriangleAlert as AlertTriangle,
  ChartBar as BarChart3,
  Building,
  ChartPie as PieChart,
  Calculator,
  Zap,
  ChevronRight,
  File,
  Link,
  Sparkles,
  Star,
  Target,
  Lock,
  Eye,
  Search,
  MapPin,
  ChartBar as BarChart,
  Layers,
  Hexagon,
  Rocket,
  Crown,
  Flame,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface SimulatorModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: "fraud" | "financial";
  route: string;
  gradient: readonly [string, string, string];
  accentColor: string;
  popular?: boolean;
  new?: boolean;
}

const simulatorModules: SimulatorModule[] = [
  {
    id: "DocHashVerifier",
    title: "Document Hash Verifier",
    description:
      "Advanced cryptographic verification with blockchain-level security",
    icon: File,
    category: "fraud",
    route: "/pages/DocHashVerifierTool",
    gradient: ["#667eea", "#764ba2", "#8b5cf6"],
    accentColor: "#667eea",
    popular: true,
  },
  {
    id: "url-analysis-tool",
    title: "AI URL Analyzer",
    description:
      "Machine learning-powered threat detection and URL reputation analysis",
    icon: Search,
    category: "fraud",
    route: "/pages/UrlAnalysisTool",
    gradient: ["#f093fb", "#f5576c", "#ec4899"],
    accentColor: "#f093fb",
    new: true,
  },
  {
    id: "nearest-cybercell-finder",
    title: "Cybercell Locator",
    description: "GPS-powered instant cybercrime reporting center discovery",
    icon: MapPin,
    category: "fraud",
    route: "/pages/NearestCybercellFinder",
    gradient: ["#4facfe", "#00f2fe", "#06b6d4"],
    accentColor: "#4facfe",
  },
  {
    id: "scam-heat-map",
    title: "Threat Intelligence Map",
    description: "Real-time global scam monitoring with predictive analytics",
    icon: Target,
    category: "fraud",
    route: "/pages/ScamHeatMap",
    gradient: ["#fa709a", "#fee140", "#fbbf24"],
    accentColor: "#fa709a",
    popular: true,
  },
  {
    id: "sip-calculator",
    title: "SIP Strategy Optimizer",
    description: "Advanced SIP planning with market analysis and projections",
    icon: BarChart,
    category: "financial",
    route: "/pages/SipTool",
    gradient: ["#a8edea", "#fed6e3", "#34d399"],
    accentColor: "#34d399",
  },
  {
    id: "fd-rd-calculator",
    title: "Investment Calculator Pro",
    description:
      "Comprehensive FD & RD analysis with compound interest modeling",
    icon: TrendingUp,
    category: "financial",
    route: "/pages/FdAndRdCalculator",
    gradient: ["#d299c2", "#fef9d7", "#f59e0b"],
    accentColor: "#f59e0b",
    new: true,
  },
  {
    id: "interest-emi-calculator",
    title: "Loan Optimizer Suite",
    description:
      "Smart EMI calculations with amortization schedules and comparisons",
    icon: Calculator,
    category: "financial",
    route: "/pages/InterestCalculator",
    gradient: ["#89f7fe", "#66a6ff", "#3b82f6"],
    accentColor: "#3b82f6",
  },
  {
    id: "tax-calculator",
    title: "Tax Planning Engine",
    description: "Intelligent tax optimization with deduction recommendations",
    icon: BarChart3,
    category: "financial",
    route: "/pages/TaxCalculator",
    gradient: ["#fdbb2d", "#22c1c3", "#059669"],
    accentColor: "#059669",
    popular: true,
  },
];

// Floating particle component
const FloatingParticle: React.FC<{ delay: number; color: string }> = ({
  delay,
  color,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: -20,
              duration: 2000 + Math.random() * 1000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.8,
              duration: 1000,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: 0,
              duration: 2000 + Math.random() * 1000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 1000,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    setTimeout(animate, delay);
  }, []);

  return (
    <Animated.View
      style={[
        styles.floatingParticle,
        {
          backgroundColor: color,
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    />
  );
};

const ModuleCard: React.FC<{ module: SimulatorModule; index: number }> = ({
  module,
  index,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 120,
        friction: 8,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        delay: index * 120,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        delay: index * 120,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(pressAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 400,
        friction: 10,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(pressAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 400,
        friction: 10,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    router.push(module.route as any);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "2deg"],
  });

  const glowIntensity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.moduleCardContainer,
        {
          opacity: opacityAnim,
          transform: [
            { scale: Animated.multiply(scaleAnim, pressAnim) },
            { translateY: translateYAnim },
            { rotate: rotation },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[
          styles.moduleCard,
          {
            shadowColor: module.accentColor,
            borderColor: module.accentColor,
            borderWidth: 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.cardGlow,
            {
              opacity: glowIntensity,
              shadowColor: module.accentColor,
            },
          ]}
        />

        <View style={styles.cardContent}>
          {/* {module.popular && (
            <View style={styles.popularBadge}>
              <Flame size={12} color="#fff" strokeWidth={2} />
              <Text style={styles.popularText}>HOT</Text>
            </View>
          )}

          {module.new && (
            <View style={styles.newBadge}>
              <Sparkles size={12} color="#fff" strokeWidth={2} />
              <Text style={styles.newText}>NEW</Text>
            </View>
          )} */}

          <View style={styles.iconSection}>
            <LinearGradient
              colors={module.gradient}
              style={styles.iconWrapper}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <module.icon size={28} color="#FFFFFF" strokeWidth={2.5} />
              <View style={styles.iconShine} />
            </LinearGradient>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {module.category === "fraud" ? "🛡️" : "💰"}
              </Text>
            </View>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription} numberOfLines={2}>
              {module.description}
            </Text>
            <View style={styles.cardFooter}>
              <View style={styles.statusContainer}>
                <Animated.View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: module.accentColor },
                  ]}
                />
                <Text
                  style={[styles.statusText, { color: module.accentColor }]}
                >
                  Ready to Launch
                </Text>
              </View>
              {/* <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    color="#fbbf24"
                    fill={i < 4 ? "#fbbf24" : "transparent"}
                    strokeWidth={1.5}
                  />
                ))}
              </View> */}
            </View>
          </View>

          <View
            style={[
              styles.chevronContainer,
              {
                backgroundColor: module.accentColor + "20",
                borderColor: module.accentColor,
              },
            ]}
          >
            <ChevronRight
              size={22}
              color={module.accentColor}
              strokeWidth={2.5}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CategoryHeader: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  index: number;
}> = ({ title, subtitle, icon: Icon, color, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 120,
        friction: 8,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.categoryHeader,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
          borderColor: color,
          borderLeftWidth: 8,
          borderRightWidth: 8,
          backgroundColor: color,
        },
      ]}
    >
      <LinearGradient
        colors={[color + "15", color + "08", color + "15"]}
        style={styles.categoryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.categoryContent}>
          <Animated.View
            style={[
              styles.categoryIconContainer,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <Icon size={26} color="rgba(255,255,255,0.8)" strokeWidth={2.5} />
          </Animated.View>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryTitle}>{title}</Text>
            <Text style={styles.categorySubtitle}>{subtitle}</Text>
          </View>
          {/* <LinearGradient
            colors={[color, color + "80"]}
            style={styles.categoryAccent}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          /> */}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

// Animated background shapes
const BackgroundShapes: React.FC = () => {
  const shapes = Array.from({ length: 6 }, (_, i) => i);

  return (
    <View style={styles.backgroundShapes}>
      {shapes.map((shape, index) => {
        const animValue = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.loop(
            Animated.timing(animValue, {
              toValue: 1,
              duration: 8000 + index * 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            })
          ).start();
        }, []);

        const rotate = animValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        });

        const translateX = animValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 50, 0],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.backgroundShape,
              {
                left: `${10 + index * 15}%`,
                top: `${20 + index * 10}%`,
                transform: [{ rotate }, { translateX }],
              },
            ]}
          >
            <Hexagon
              size={40 + index * 10}
              color={`hsl(${200 + index * 40}, 60%, 70%)`}
              strokeWidth={1}
              opacity={0.1}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default function SimulatorsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const heroScaleAnim = useRef(new Animated.Value(0.95)).current;
  const titleWaveAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  const fraudModules = simulatorModules.filter((m) => m.category === "fraud");
  const financialModules = simulatorModules.filter(
    (m) => m.category === "financial"
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Title wave animation
    Animated.loop(
      Animated.timing(titleWaveAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      })
    ).start();

    // Sparkle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ])
    ).start();
  }, []);

  const titleTranslateY = titleWaveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3],
  });

  const sparkleRotate = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const sparkleScale = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.2, 0.8],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <BackgroundShapes />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={["#004025", "#00563F", "#006057"]}
          style={styles.heroHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroOverlay} />
          <FloatingParticle delay={0} color="rgba(255, 215, 0, 0.6)" />
          <FloatingParticle delay={1000} color="rgba(138, 43, 226, 0.4)" />
          <FloatingParticle delay={2000} color="rgba(0, 191, 255, 0.5)" />

          <Animated.View
            style={[
              styles.heroContent,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: heroScaleAnim },
                ],
              },
            ]}
          >
            <View style={styles.brandContainer}>
              <View style={styles.logoSection}>
                <LinearGradient
                  colors={["#FFD700", "#FFA500", "#FF6B35"]}
                  style={styles.logoContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Zap size={36} color="#FFFFFF" strokeWidth={3} />
                  <View style={styles.logoGlow} />
                </LinearGradient>
                <View style={styles.sparkleField}>
                  <Sparkles
                    size={16}
                    color="#FFD700"
                    style={[styles.sparkle, { top: -8, right: -8 }]}
                  />
                  <Star
                    size={12}
                    color="#FFFFFF"
                    style={[styles.sparkle, { bottom: -6, left: -6 }]}
                  />
                  <Hexagon
                    size={10}
                    color="#FFA500"
                    style={[styles.sparkle, { top: 10, right: 15 }]}
                  />
                </View>
              </View>

              <View style={styles.brandTextContainer}>
                <Text style={styles.brandTitle}>Professional Suite</Text>
                <Text style={styles.brandSubtitle}>
                  Next-generation AI-powered tools for security and finance
                </Text>
                <View style={styles.brandFeatures}>
                  <View style={styles.featurePill}>
                    <Lock size={12} color="#10B981" strokeWidth={2} />
                    <Text style={styles.featureText}>Enterprise Security</Text>
                  </View>
                  <View style={styles.featurePill}>
                    <Eye size={12} color="#3B82F6" strokeWidth={2} />
                    <Text style={styles.featureText}>AI Analytics</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Professional Tools</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>99.9%</Text>
                <Text style={styles.statLabel}>Accuracy Rate</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Availability</Text>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        <View style={styles.section}>
          <CategoryHeader
            title="🛡️ Fraud Detection & Prevention"
            subtitle="AI-powered security arsenal for ultimate protection"
            icon={Shield}
            color="#10b981"
            index={0}
          />
          <View style={styles.modulesList}>
            {fraudModules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <CategoryHeader
            title="💰 Financial Analysis & Planning"
            subtitle="Investment wizardry and wealth optimization suite"
            icon={Building}
            color="#667eea"
            index={1}
          />
          <View style={styles.modulesList}>
            {financialModules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </View>
        </View>

        <View style={styles.footerSection}>
          <LinearGradient
            colors={["#667eea15", "#10b98115", "#f093fb15"]}
            style={styles.footerCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.footerContent}>
              <View style={styles.footerIconContainer}>
                <Layers size={28} color="#667eea" strokeWidth={2.5} />
                <View style={styles.footerIconBadge}>
                  <Rocket size={14} color="#fff" strokeWidth={2} />
                </View>
              </View>
              <Text style={styles.footerTitle}>
                🚀 More Amazing Tools Coming
              </Text>
              <Text style={styles.footerDescription}>
                Stay tuned for our revolutionary new features launching soon!
              </Text>
              <View style={styles.comingSoonBadge}>
                <Sparkles size={14} color="#667eea" strokeWidth={2} />
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  backgroundShapes: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundShape: {
    position: "absolute",
  },
  // heroHeader: {
  //   paddingTop: 60,
  //   paddingBottom: 32,
  //   paddingHorizontal: 24,
  //   borderBottomLeftRadius: 24,
  //   borderBottomRightRadius: 24,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 8 },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 20,
  //   elevation: 12,
  //   position: "relative",
  //   overflow: "hidden",
  // },
  floatingParticle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    top: "20%",
    left: "20%",
  },
  // heroContent: {
  //   alignItems: "center",
  // },
  // brandContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 28,
  //   width: "100%",
  // },
  // logoContainer: {
  //   marginRight: 20,
  // },
  logoGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  // brandTextContainer: {
  //   flex: 1,
  // },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  // brandTitle: {
  //   fontSize: 28,
  //   fontWeight: "800",
  //   color: "#FFFFFF",
  //   letterSpacing: -1,
  //   marginRight: 8,
  // },
  sparkleContainer: {
    marginLeft: 4,
  },
  // brandSubtitle: {
  //   fontSize: 16,
  //   color: "#e2e8f0",
  //   fontWeight: "600",
  //   lineHeight: 20,
  // },
  statsContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statsGradient: {
    flexDirection: "row",
    padding: 20,
  },
  // statItem: {
  //   alignItems: "center",
  //   flex: 1,
  // },
  // statNumber: {
  //   fontSize: 22,
  //   fontWeight: "800",
  //   color: "#FFFFFF",
  //   marginBottom: 4,
  //   letterSpacing: -0.5,
  // },
  // statLabel: {
  //   fontSize: 12,
  //   color: "#cbd5e1",
  //   fontWeight: "600",
  //   marginBottom: 8,
  //   textTransform: "uppercase",
  //   letterSpacing: 0.5,
  // },
  // statDivider: {
  //   width: 1.5,
  //   height: 40,
  //   backgroundColor: "rgba(255, 255, 255, 0.25)",
  //   marginHorizontal: 16,
  // },
  // content: {
  //   flex: 1,
  // },
  scrollContent: {
    paddingBottom: 50,
  },
  section: {
    marginTop: 36,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    marginBottom: 24,
    borderRadius: 16,

    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.1,
    // shadowRadius: 12,
    // elevation: 6,
  },
  categoryGradient: {
    borderRadius: 16,
    padding: 24,
    paddingVertical: 20,
    // borderWidth: 1.5,
    // borderColor: "rgba(255, 255, 255, 0.9)",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  categoryIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "rgba(255,255,255,0.95)",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  categorySubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.79)",
    fontWeight: "600",
    lineHeight: 20,
  },
  categoryAccent: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 2,
  },
  modulesList: {
    gap: 16,
  },
  moduleCardContainer: {
    position: "relative",
  },
  moduleCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: "#f1f5f9",
    overflow: "hidden",
    position: "relative",
  },
  cardGlow: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  popularBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#ef4444",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  popularText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  newBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#10b981",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  newText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    position: "relative",
  },
  iconSection: {
    position: "relative",
    marginRight: 20,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  iconShine: {
    position: "absolute",
    top: 0,
    left: -100,
    width: 100,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: [{ skewX: "-20deg" }],
  },
  categoryBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  categoryText: {
    fontSize: 12,
  },
  cardInfo: {
    flex: 1,
    marginRight: 16,
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  moduleDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "column",
    gap: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  chevronContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  footerSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  footerCard: {
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // elevation: 6,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    overflow: "hidden",
  },
  footerContent: {
    alignItems: "center",
  },
  footerIconContainer: {
    position: "relative",
    marginBottom: 16,
  },
  footerIconBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#667eea",
    borderRadius: 10,
    padding: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  footerDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
    marginBottom: 16,
  },
  comingSoonBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#667eea15",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#667eea30",
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#667eea",
    marginLeft: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroHeader: {
    paddingTop: 60,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
    position: "relative",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  particle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    top: "20%",
    right: "15%",
  },
  heroContent: {
    alignItems: "center",
    zIndex: 1,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoSection: {
    position: "relative",
    marginBottom: 24,
  },
  logoContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 15,
    position: "relative",
  },
  logoGlow: {
    position: "absolute",
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 48,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    zIndex: -1,
  },
  sparkleField: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    top: -18,
    left: -18,
  },
  sparkle: {
    position: "absolute",
  },
  brandTextContainer: {
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    marginBottom: 8,
    textAlign: "center",
  },
  brandSubtitle: {
    fontSize: 16,
    color: "#E2E8F0",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  brandFeatures: {
    flexDirection: "row",
    gap: 12,
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    gap: 6,
  },
  featureText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  heroStats: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#CBD5E1",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 10,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
});
