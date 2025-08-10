import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Brain,
  Flag,
  GraduationCap,
  Eye,
  Shield,
  TrendingUp,
  Target,
  ChevronLeft,
  ChevronRight,
  Calculator,
  MapPin,
  FileText,
  AlertTriangle,
  Zap,
  Users,
  Lock,
  Search,
  BarChart3,
  CreditCard,
  Smartphone,
  Globe,
  ShieldCheck,
  Activity,
  Award,
  DollarSign,
  PieChart,
  Clock,
  AlertCircle,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { PSBColors, PSBShadows, PSBSpacing } from "../../../utils/PSBColors";
import ThemeToggle from "../../../components/ThemeToggle";
import ChatbotButton from "../../../components/ChatbotButton";
import ChatbotPopup from "../../../components/ChatbotPopup";
import { Easing } from "react-native-reanimated"; // if using Reanimated

const { width, height } = Dimensions.get("window");
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

const HomeScreen = () => {
  const { theme } = useTheme();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const waveAnim = useState(new Animated.Value(0))[0];
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideUpAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Wave animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 10,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ])
    ).start();
  }, []);

  const features = [
    {
      id: 1,
      title: "Simulators",
      description: "Understand fraud schemes through live simulations",
      icon: Brain,
      color: PSBColors.primary.green,
      route: "/(tabs)/simulator",
    },
    {
      id: 2,
      title: "Quizzes",
      description: "Test your financial fraud awareness skills",
      icon: Flag,
      color: PSBColors.primary.gold,
      route: "/pages/QuizzesScreen",
    },
    {
      id: 3,
      title: "Decision Scenarios",
      description: "Practice secure financial decision making",
      icon: Target,
      color: PSBColors.primary.gold,
      route: "/pages/ScenarioHub",
    },
    {
      id: 4,
      title: "Education Center",
      description: "Trusted resources for fraud prevention",
      icon: GraduationCap,
      color: PSBColors.primary.green,
      route: "/(app)/(tabs)/education",
    },
  ];

  const exploreTools = [
    {
      id: 1,
      title: "EMI Calculator",
      description: "Calculate loan EMIs with ease",
      icon: Calculator,
      color: "#FF6B35",
      bgColor: "#FFF3E0",
      route: "/pages/FdAndRdCalculator",
      badge: "Popular",
    },
    {
      id: 2,
      title: "Tax Calculator",
      description: "Calculate your tax liability",
      icon: BarChart3,
      color: "#9C27B0",
      bgColor: "#F3E5F5",
      route: "/pages/TaxCalculator",
    },
    {
      id: 3,
      title: "SIP Calculator",
      description: "Plan your investments smartly",
      icon: TrendingUp,
      color: "#4CAF50",
      bgColor: "#E8F5E8",
      route: "/pages/SipTool",
      badge: "New",
    },
    {
      id: 4,
      title: "URL Analyzer",
      description: "Check suspicious URLs",
      icon: Search,
      color: "#FF5722",
      bgColor: "#FBE9E7",
      route: "/pages/UrlAnalysisTool",
    },
  ];

  const ourSimulators = [
    {
      id: 1,
      title: "Phishing Simulator",
      description: "Learn to spot phishing attempts",
      icon: Smartphone,
      color: "#E91E63",
      gradient: ["#FF1744", "#F50057"] as const,
      route: "/pages/PhishingSimulator",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "OTP Fraud",
      description: "Understand OTP scams",
      icon: Lock,
      color: "#9C27B0",
      gradient: ["#9C27B0", "#BA68C8"] as const,
      route: "/pages/identityTheftSimulator/index",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Loan Scams",
      description: "Identify loan fraud patterns",
      icon: CreditCard,
      color: "#00BCD4",
      gradient: ["#00BCD4", "#4DD0E1"] as const,
      route: "/pages/loanScamSimulator/index",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Lottery Fraud",
      description: "Spot lottery scams",
      icon: Award,
      color: "#FF9800",
      gradient: ["#FF9800", "#FFB74D"] as const,
      route: "/pages/lotteryFraudSimulator/index",
      difficulty: "Beginner",
    },
  ];

  const stats = [
    { label: "Schemes Exposed", value: "50+", icon: Eye, color: "#FF6B6B" },
    { label: "Users Protected", value: "10K+", icon: Shield, color: "#4ECDC4" },
    { label: "Success Rate", value: "95%", icon: TrendingUp, color: "#45B7D1" },
  ];

  const tips = [
    {
      title: "Secure Transactions",
      icon: "🔐",
      content: "Never share OTPs—even with bank employees.",
    },
    {
      title: "Check URLs",
      icon: "📦",
      content: "Double-check URLs before entering login info.",
    },
    {
      title: "Avoid Phishing",
      icon: "📧",
      content: "Do not click suspicious links from unknown senders.",
    },
  ];

  const dailyQuiz = {
    title: "Daily Quiz",
    description: "Test your fraud awareness knowledge",
    question: "What should you do if you receive an SMS asking for your OTP?",
    options: [
      "Share it immediately",
      "Ignore and delete",
      "Call the number back",
      "Forward to friends",
    ],
    correctAnswer: 1,
    icon: Flag,
    color: "#FF6B35",
    bgColor: "#FFF3E0",
    route: "/pages/QuizzesScreen",
  };

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const featureScaleAnim = new Animated.Value(1);
  const handlePressIn = () => {
    Animated.spring(featureScaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(featureScaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleCardPress = (route: string) => {
    router.push(route as any);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const correct = optionIndex === dailyQuiz.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleTakeQuizChallenge = () => {
    router.push("/pages/QuizzesScreen");
  };

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    const correct = index === dailyQuiz.correctAnswer;
    setIsCorrect(correct);
  };

  // === TIPS CAROUSEL ===
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % tips.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 60),
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(xOffset / (width - 60));
    setCurrentIndex(newIndex);
  };

  const [isReady, setIsReady] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  // Enhanced Animation Refs
  const splashText1Anim = useRef(new Animated.Value(0)).current;
  const splashPsbLogoAnim = useRef(new Animated.Value(0)).current;
  const splashText2Anim = useRef(new Animated.Value(0)).current;
  const splashPtuLogoAnim = useRef(new Animated.Value(0)).current;
  const splashProjectLogoAnim = useRef(new Animated.Value(0)).current;
  
  // Image specific animations - slow zoom in/out
  const psbImageScaleAnim = useRef(new Animated.Value(0.3)).current;
  const ptuImageScaleAnim = useRef(new Animated.Value(0.3)).current;
  const projectImageScaleAnim = useRef(new Animated.Value(0.3)).current;
  
  // Background pattern animations
  const patternAnim1 = useRef(new Animated.Value(0)).current;
  const patternAnim2 = useRef(new Animated.Value(0)).current;
  const patternAnim3 = useRef(new Animated.Value(0)).current;
  const patternAnim4 = useRef(new Animated.Value(0)).current;
  const patternAnim5 = useRef(new Animated.Value(0)).current;
  
  // Transition animations
  const splashTransitionAnim = useRef(new Animated.Value(0)).current;
  const mainPageAnim = useRef(new Animated.Value(height)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  
  // Progress animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start background patterns first with more variety
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim1, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(patternAnim1, {
            toValue: 0,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim2, {
            toValue: 1,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(patternAnim2, {
            toValue: 0,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim3, {
            toValue: 1,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(patternAnim3, {
            toValue: 0,
            duration: 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim4, {
            toValue: 1,
            duration: 3500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(patternAnim4, {
            toValue: 0,
            duration: 3500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim5, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(patternAnim5, {
            toValue: 0,
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Sequential animations for content with slow image zoom
    const startContentAnimation = () => {
      Animated.sequence([
        // First text with delay
        Animated.delay(500),
        Animated.timing(splashText1Anim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        // PSB Logo with slow zoom in + spring effect
        Animated.delay(200),
        Animated.parallel([
          Animated.spring(splashPsbLogoAnim, {
            toValue: 1,
            tension: 60,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(psbImageScaleAnim, {
            toValue: 1.1, // Slight zoom in
            duration: 1500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        // Second text
        Animated.delay(300),
        Animated.timing(splashText2Anim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        // PTU Logo with slow zoom in + spring effect
        Animated.delay(200),
        Animated.parallel([
          Animated.spring(splashPtuLogoAnim, {
            toValue: 1,
            tension: 60,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(ptuImageScaleAnim, {
            toValue: 1.1, // Slight zoom in
            duration: 1500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        // Project logo with final spring and zoom
        Animated.delay(300),
        Animated.parallel([
          Animated.spring(splashProjectLogoAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(projectImageScaleAnim, {
            toValue: 1.15, // Slightly more zoom for final logo
            duration: 1800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    };

    // Start progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    startContentAnimation();

    const timer = setTimeout(() => {
      setShowTransition(true);
      // Start zoom-out and blur transition animation
      Animated.parallel([
        // Zoom out images dramatically
        Animated.timing(psbImageScaleAnim, {
          toValue: 2.5, // Large zoom out
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(ptuImageScaleAnim, {
          toValue: 2.5, // Large zoom out
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(projectImageScaleAnim, {
          toValue: 2.8, // Even larger zoom out for project logo
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Add blur effect
        Animated.timing(blurAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        // Page transitions
        Animated.timing(splashTransitionAnim, {
          toValue: -height,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(mainPageAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsReady(true);
      });
    }, 5200);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady ) {
    return (
      <>
        {/* Splash Screen with Enhanced Design */}
        <Animated.View 
          style={[
            styles.splashContainer,
            {
              transform: [{ translateY: splashTransitionAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={["#F9FAF7", "#E8F5E8", "#F0F8F0"]}
            style={styles.splashGradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          {/* Animated Background Patterns */}
          <View style={styles.splashPatternContainer}>
            {/* Pattern 1 - Floating Circles */}
            <Animated.View
              style={[
                styles.splashPattern1,
                {
                  opacity: patternAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 0.3],
                  }),
                  transform: [
                    {
                      scale: patternAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                    {
                      rotate: patternAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
            
            {/* Pattern 2 - Geometric Shapes */}
            <Animated.View
              style={[
                styles.splashPattern2,
                {
                  opacity: patternAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.05, 0.2],
                  }),
                  transform: [
                    {
                      translateX: patternAnim2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 50],
                      }),
                    },
                  ],
                },
              ]}
            />

            {/* Pattern 3 - Gradient Waves */}
            <Animated.View
              style={[
                styles.splashPattern3,
                {
                  opacity: patternAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 0.4],
                  }),
                  transform: [
                    {
                      scaleY: patternAnim3.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1.5],
                      }),
                    },
                  ],
                },
              ]}
            />

            {/* Pattern 4 - Hexagonal Pattern */}
            <Animated.View
              style={[
                styles.splashPattern4,
                {
                  opacity: patternAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.08, 0.25],
                  }),
                  transform: [
                    {
                      rotate: patternAnim4.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                    {
                      scale: patternAnim4.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1.3],
                      }),
                    },
                  ],
                },
              ]}
            />

            {/* Pattern 5 - Radial Burst */}
            <Animated.View
              style={[
                styles.splashPattern5,
                {
                  opacity: patternAnim5.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.05, 0.3],
                  }),
                  transform: [
                    {
                      scale: patternAnim5.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 2],
                      }),
                    },
                    {
                      rotate: patternAnim5.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-360deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          {/* Blur Overlay for Transition */}
          <Animated.View
            style={[
              styles.splashBlurOverlay,
              {
                opacity: blurAnim,
                backgroundColor: blurAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)'],
                }),
              },
            ]}
          />

          {/* Main Content */}
          <View style={styles.splashCenterContent}>
            <Animated.Text
              style={[
                styles.splashTitle,
                {
                  opacity: splashText1Anim,
                  transform: [
                    {
                      scale: splashText1Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.7, 1],
                      }),
                    },
                    {
                      translateY: splashText1Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              Organized by Punjab & Sind Bank
            </Animated.Text>

            <Animated.View
              style={[
                styles.splashLogoContainer,
                {
                  opacity: splashPsbLogoAnim,
                  transform: [
                    {
                      scale: splashPsbLogoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                    {
                      rotateY: splashPsbLogoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Animated.Image
                source={{
                  uri: "https://cdn.jsdelivr.net/gh/Nishant-Manocha/FineduGuard_StaticFiles@main/PSB_transparent.png",
                }}
                style={[
                  styles.splashLogo,
                  {
                    transform: [
                      {
                        scale: psbImageScaleAnim,
                      },
                    ],
                  },
                ]}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.Text
              style={[
                styles.splashSubtitle,
                {
                  opacity: splashText2Anim,
                  transform: [
                    {
                      scale: splashText2Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.7, 1],
                      }),
                    },
                    {
                      translateY: splashText2Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              In Collaboration with IKGPTU
            </Animated.Text>

            <Animated.View
              style={[
                styles.splashLogoContainer,
                {
                  opacity: splashPtuLogoAnim,
                  transform: [
                    {
                      scale: splashPtuLogoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                    {
                      rotateY: splashPtuLogoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Animated.Image
                source={{
                  uri: "https://cdn.jsdelivr.net/gh/Nishant-Manocha/FineduGuard_StaticFiles@main/Ptutransparent.png",
                }}
                style={[
                  styles.splashLogo,
                  {
                    transform: [
                      {
                        scale: ptuImageScaleAnim,
                      },
                    ],
                  },
                ]}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.splashProjectContainer,
                {
                  opacity: splashProjectLogoAnim,
                  transform: [
                    {
                      scale: splashProjectLogoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                    },
                    {
                      translateY: splashProjectLogoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Animated.Image
                source={{
                  uri: "https://cdn.jsdelivr.net/gh/Nishant-Manocha/FineduGuard_StaticFiles@main/project_logo_transparent.png",
                }}
                style={[
                  styles.splashBottomLogo,
                  {
                    transform: [
                      {
                        scale: projectImageScaleAnim,
                      },
                    ],
                  },
                ]}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Progress Bar */}
          <View style={styles.splashProgressContainer}>
            <View style={styles.splashProgressTrack}>
              <Animated.View
                style={[
                  styles.splashProgressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.splashLoadingText}>Loading FinEduGuard...</Text>
          </View>
        </Animated.View>

        {/* Main Page (slides up from bottom) */}
        {showTransition && (
          <Animated.View
            style={[
              styles.mainPageContainer,
              {
                transform: [{ translateY: mainPageAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={[PSBColors.background.primary, PSBColors.background.secondary]}
              style={styles.container}
            >
              <StatusBar
                barStyle="light-content"
                backgroundColor={PSBColors.primary.green}
              />
              <SafeAreaView style={styles.safeArea}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
                >
                  {/* Header */}
                  <AnimatedView
                    style={[
                      styles.header,
                      {
                        opacity: fadeInAnim,
                        transform: [{ translateY: slideUpAnim }],
                      },
                    ]}
                  >
                    <View style={styles.greetingWrapper}>
                      <View style={styles.greetingRow}>
                        <Text style={styles.greeting}>Welcome to FinEduGuard</Text>
                        <Animated.Text
                          style={[
                            styles.waveEmoji,
                            {
                              transform: [
                                {
                                  rotate: waveAnim.interpolate({
                                    inputRange: [-20, 10],
                                    outputRange: ["-20deg", "10deg"],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          👋
                        </Animated.Text>
                      </View>
                      <Text style={styles.subtitle}>
                        Empowering safe and secure banking
                      </Text>
                    </View>
                    <ThemeToggle />
                  </AnimatedView>

                  {/* Stats */}
                  <AnimatedView
                    style={[
                      styles.statsContainer,
                      {
                        opacity: fadeInAnim,
                        transform: [{ scale: scaleAnim }],
                      },
                    ]}
                  >
                    <Text style={styles.sectionTitle}>Our Impact</Text>
                    <View style={styles.statsRow}>
                      {stats.map((stat, index) => (
                        <AnimatedView
                          key={index}
                          style={[
                            styles.statCard,
                            {
                              opacity: fadeInAnim,
                              transform: [
                                {
                                  translateY: slideUpAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.statIconContainer,
                              { backgroundColor: stat.color + "20" },
                            ]}
                          >
                            <stat.icon size={24} color={stat.color} />
                          </View>
                          <Text style={styles.statValue}>{stat.value}</Text>
                          <Text style={styles.statLabel}>{stat.label}</Text>
                        </AnimatedView>
                      ))}
                    </View>
                  </AnimatedView>

                  {/* Features - Rest of content abbreviated for space */}
                  <View style={styles.featuresContainer}>
                    <Text style={styles.sectionTitle}>Explore Services</Text>
                    <View style={styles.featuresGrid}>
                      {features.map((feature) => (
                        <AnimatedTouchable
                          key={feature.id}
                          style={[
                            styles.featureCard,
                            { transform: [{ scale: featureScaleAnim }] },
                          ]}
                          onPressIn={handlePressIn}
                          onPressOut={handlePressOut}
                          onPress={() => router.push(feature.route as any)}
                          activeOpacity={0.85}
                        >
                          <LinearGradient
                            colors={["#FFFFFF", "#FFF8E1"]}
                            style={[
                              styles.featureGradient,
                              { borderColor: feature.color },
                            ]}
                          >
                            <feature.icon size={32} color={feature.color} />
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureDescription}>
                              {feature.description}
                            </Text>
                          </LinearGradient>
                        </AnimatedTouchable>
                      ))}
                    </View>
                  </View>
                </ScrollView>

                {/* Chatbot */}
                <ChatbotButton onPress={() => setPopupVisible(true)} />
                <ChatbotPopup
                  visible={isPopupVisible}
                  onClose={() => setPopupVisible(false)}
                />
              </SafeAreaView>
            </LinearGradient>
          </Animated.View>
        )}
      </>
    );
  }
  return (
    <LinearGradient
      colors={[PSBColors.background.primary, PSBColors.background.secondary]}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={PSBColors.primary.green}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <AnimatedView
            style={[
              styles.header,
              {
                opacity: fadeInAnim,
                transform: [{ translateY: slideUpAnim }],
              },
            ]}
          >
            <View style={styles.greetingWrapper}>
              <View style={styles.greetingRow}>
                <Text style={styles.greeting}>Welcome to FinEduGuard</Text>
                <Animated.Text
                  style={[
                    styles.waveEmoji,
                    {
                      transform: [
                        {
                          rotate: waveAnim.interpolate({
                            inputRange: [-20, 10],
                            outputRange: ["-20deg", "10deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  👋
                </Animated.Text>
              </View>
              <Text style={styles.subtitle}>
                Empowering safe and secure banking
              </Text>
            </View>
            <ThemeToggle />
          </AnimatedView>

          {/* Stats */}
          <AnimatedView
            style={[
              styles.statsContainer,
              {
                opacity: fadeInAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Our Impact</Text>
            <View style={styles.statsRow}>
              {stats.map((stat, index) => (
                <AnimatedView
                  key={index}
                  style={[
                    styles.statCard,
                    {
                      opacity: fadeInAnim,
                      transform: [
                        {
                          translateY: slideUpAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.statIconContainer,
                      { backgroundColor: stat.color + "20" },
                    ]}
                  >
                    <stat.icon size={24} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </AnimatedView>
              ))}
            </View>
          </AnimatedView>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Explore Services</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature) => (
                <AnimatedTouchable
                  key={feature.id}
                  style={[
                    styles.featureCard,
                    { transform: [{ scale: featureScaleAnim }] },
                  ]}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={() => router.push(feature.route as any)}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={["#FFFFFF", "#FFF8E1"]}
                    style={[
                      styles.featureGradient,
                      { borderColor: feature.color },
                    ]}
                  >
                    <feature.icon size={32} color={feature.color} />
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  </LinearGradient>
                </AnimatedTouchable>
              ))}
            </View>
          </View>

          {/* Explore Tools Section */}
          <View style={styles.toolsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Explore Tools</Text>
              <AnimatedTouchable
                style={styles.viewAllButton}
                onPress={() => router.push("/(tabs)/tools")}
                activeOpacity={0.8}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color={PSBColors.primary.green} />
              </AnimatedTouchable>
            </View>
            <View style={styles.toolsGrid}>
              {exploreTools.map((tool, index) => (
                <AnimatedTouchable
                  key={tool.id}
                  style={[
                    styles.toolCard,
                    {
                      backgroundColor: tool.bgColor,
                      opacity: fadeInAnim,
                      transform: [
                        {
                          translateY: slideUpAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                  onPress={() => handleCardPress(tool.route)}
                  activeOpacity={0.9}
                >
                  <View
                    style={[
                      styles.toolIconContainer,
                      { backgroundColor: tool.color + "20" },
                    ]}
                  >
                    <tool.icon size={24} color={tool.color} />
                  </View>
                  <View style={styles.toolContent}>
                    <Text style={[styles.toolTitle, { color: tool.color }]}>
                      {tool.title}
                    </Text>
                    <Text style={styles.toolDescription}>
                      {tool.description}
                    </Text>
                  </View>
                  {tool.badge && (
                    <View
                      style={[
                        styles.toolBadge,
                        { backgroundColor: tool.color },
                      ]}
                    >
                      <Text style={styles.toolBadgeText}>{tool.badge}</Text>
                    </View>
                  )}
                </AnimatedTouchable>
              ))}
            </View>
          </View>

          {/* Our Simulators Section */}
          <View style={styles.simulatorsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Simulators</Text>
              <AnimatedTouchable
                style={styles.viewAllButton}
                onPress={() => router.push("/(tabs)/simulator")}
                activeOpacity={0.8}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color={PSBColors.primary.green} />
              </AnimatedTouchable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.simulatorsScroll}
            >
              {ourSimulators.map((simulator, index) => (
                <AnimatedTouchable
                  key={simulator.id}
                  style={[
                    styles.simulatorCard,
                    {
                      opacity: fadeInAnim,
                      transform: [
                        {
                          translateX: slideUpAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                  onPress={() => handleCardPress(simulator.route)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={simulator.gradient}
                    style={styles.simulatorGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.simulatorHeader}>
                      <View style={styles.simulatorIconContainer}>
                        <simulator.icon size={28} color="#FFFFFF" />
                      </View>
                      <View
                        style={[
                          styles.difficultyBadge,
                          { backgroundColor: simulator.color + "40" },
                        ]}
                      >
                        <Text style={styles.difficultyText}>
                          {simulator.difficulty}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.simulatorContent}>
                      <Text style={styles.simulatorTitle}>
                        {simulator.title}
                      </Text>
                      <Text style={styles.simulatorDescription}>
                        {simulator.description}
                      </Text>
                    </View>
                    <View style={styles.simulatorFooter}>
                      <Text style={styles.simulatorAction}>
                        Start Simulation →
                      </Text>
                    </View>
                  </LinearGradient>
                </AnimatedTouchable>
              ))}
            </ScrollView>
          </View>

          {/* Daily Quiz Section */}
          {/* Daily Quiz Section */}
          {/* Daily Quiz Section */}
          <View style={styles.quizContainer}>
            <Text style={[styles.sectionTitle, { marginBottom: -5 }]}>
              Daily Quiz
            </Text>
            <AnimatedTouchable
              style={[
                styles.quizCard,
                {
                  backgroundColor: dailyQuiz.bgColor,
                  opacity: fadeInAnim,
                  transform: [
                    {
                      translateY: slideUpAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      }),
                    },
                  ],
                },
              ]}
              activeOpacity={0.9}
            >
              <View style={styles.quizHeader}>
                <View
                  style={[
                    styles.quizIconContainer,
                    { backgroundColor: dailyQuiz.color + "20" },
                  ]}
                >
                  <dailyQuiz.icon size={28} color={dailyQuiz.color} />
                </View>
                <View
                  style={[
                    styles.quizBadge,
                    { backgroundColor: dailyQuiz.color },
                  ]}
                >
                  <Text style={styles.quizBadgeText}>NEW</Text>
                </View>
              </View>

              <View style={styles.quizContent}>
                <Text style={[styles.quizTitle, { color: dailyQuiz.color }]}>
                  {dailyQuiz.title}
                </Text>
                <Text style={styles.quizDescription}>
                  {dailyQuiz.description}
                </Text>
                <View style={styles.quizQuestionContainer}>
                  <Text style={styles.quizQuestion}>{dailyQuiz.question}</Text>
                  <View style={styles.quizOptionsContainer}>
                    {dailyQuiz.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const correct = index === dailyQuiz.correctAnswer;

                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.quizOption,
                            isSelected &&
                              (isCorrect
                                ? styles.correctOption
                                : styles.wrongOption),
                            // Show correct option in green if user was wrong
                            selectedOption !== null &&
                              !isCorrect &&
                              correct &&
                              styles.correctOption,
                          ]}
                          activeOpacity={0.8}
                          onPress={() => handleOptionPress(index)}
                          disabled={selectedOption !== null}
                        >
                          <Text
                            style={[
                              styles.quizOptionText,
                              isSelected &&
                                (isCorrect
                                  ? styles.correctOptionText
                                  : styles.wrongOptionText),
                              selectedOption !== null &&
                                !isCorrect &&
                                correct &&
                                styles.correctOptionText,
                            ]}
                          >
                            {String.fromCharCode(65 + index)}. {option}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* Feedback Message */}
                  {selectedOption !== null && (
                    <Text
                      style={[
                        styles.quizFeedbackText,
                        { color: isCorrect ? "#4CAF50" : "#F44336" },
                      ]}
                    >
                      {isCorrect
                        ? "🎉 Correct! You're a fraud-busting pro!"
                        : "😅 Oops! Learn more in our quizzes!"}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.quizFooter}>
                {selectedOption !== null && (
                  <TouchableOpacity
                    onPress={() => router.push(dailyQuiz.route)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.quizAction, { color: dailyQuiz.color }]}
                    >
                      Take Full Quiz →
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </AnimatedTouchable>
          </View>

          {/* Swipeable Tips Carousel */}
          <View style={styles.tipsContainer}>
            <Text style={[styles.sectionTitle, { marginBottom: 20 }]}>
              Security Tips
            </Text>
            <AnimatedView style={{ opacity: fadeAnim }}>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tipsScroll}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {tips.map((tip, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tipCard,
                      { width: width - 60, marginRight: 20 },
                    ]}
                  >
                    <View style={styles.tipIconContainer}>
                      <Text style={styles.tipIcon}>{tip.icon}</Text>
                    </View>
                    <View style={styles.tipContent}>
                      <Text style={styles.tipTitle}>{tip.title}</Text>
                      <Text style={styles.tipText}>{tip.content}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </AnimatedView>
          </View>
        </ScrollView>

        {/* Chatbot */}
        <ChatbotButton onPress={() => setPopupVisible(true)} />
        <ChatbotPopup
          visible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: "#F9FAF7",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  splashGradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  
  // Pattern Styles
  splashPatternContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  splashPattern1: {
    position: "absolute",
    top: "10%",
    right: "10%",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 106, 78, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(0, 106, 78, 0.2)",
  },
  splashPattern2: {
    position: "absolute",
    bottom: "15%",
    left: "5%",
    width: 150,
    height: 150,
    backgroundColor: "rgba(184, 134, 11, 0.1)",
    transform: [{ rotate: "45deg" }],
    borderRadius: 20,
  },
  splashPattern3: {
    position: "absolute",
    top: "30%",
    left: "-10%",
    width: 300,
    height: 100,
    backgroundColor: "rgba(0, 106, 78, 0.05)",
    borderRadius: 50,
    transform: [{ rotate: "-15deg" }],
  },
  splashPattern4: {
    position: "absolute",
    top: "60%",
    right: "-5%",
    width: 120,
    height: 120,
    backgroundColor: "rgba(184, 134, 11, 0.08)",
    borderWidth: 3,
    borderColor: "rgba(184, 134, 11, 0.15)",
    borderRadius: 60,
    transform: [{ rotate: "30deg" }],
  },
  splashPattern5: {
    position: "absolute",
    top: "75%",
    left: "20%",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "rgba(0, 106, 78, 0.12)",
    backgroundColor: "transparent",
  },

  splashCenterContent: {
    alignItems: "center",
    zIndex: 2,
    paddingHorizontal: 20,
  },
  
  // Logo Container Styles (without background circles)
  splashLogoContainer: {
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogo: {
    width: 140,
    height: 140,
  },
  
  splashProjectContainer: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  splashBottomLogo: {
    width: 120,
    height: 120,
  },

  // Blur Overlay
  splashBlurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  
  // Text Styles
  splashTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#006A4E",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 32,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  splashSubtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#B8860B",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
    lineHeight: 28,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // Progress Bar Styles
  splashProgressContainer: {
    position: "absolute",
    bottom: 80,
    left: 40,
    right: 40,
    alignItems: "center",
    zIndex: 3,
  },
  splashProgressTrack: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(0, 106, 78, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 15,
  },
  splashProgressFill: {
    height: "100%",
    backgroundColor: "#006A4E",
    borderRadius: 2,
  },
  splashLoadingText: {
    fontSize: 14,
    color: "#006A4E",
    fontWeight: "500",
    textAlign: "center",
  },

  // Transition Styles
  mainPageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
  },
  transitionPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  transitionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006A4E",
    textAlign: "center",
  },
  mainPage: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  // '''''''''''''''''''''''
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PSBSpacing.lg,
    paddingTop: 20,
    paddingBottom: 25,
    backgroundColor: PSBColors.primary.green,
    borderBottomWidth: 3,
    borderBottomColor: PSBColors.primary.gold,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  greetingWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    color: PSBColors.primary.gold,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  waveEmoji: {
    marginLeft: 8,
    fontSize: 28,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 6,
    opacity: 0.9,
  },

  statsContainer: {
    paddingHorizontal: PSBSpacing.lg,
    marginTop: 14,
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: PSBColors.primary.green,
    marginBottom: 10,
    marginTop: 0,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: -26,
  },
  statCard: {
    flex: 1,
    backgroundColor: PSBColors.background.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: PSBColors.primary.green,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: PSBColors.text.secondary,
    textAlign: "center",
    marginTop: 4,
    fontWeight: "500",
  },

  featuresContainer: {
    paddingHorizontal: PSBSpacing.lg,
    marginBottom: 18,
    // marginTop: 0,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 6,
  },
  featureCard: {
    width: (width - 60) / 2,
    height: 160,
    marginBottom: 15,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureGradient: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
    color: PSBColors.primary.green,
  },
  featureDescription: {
    fontSize: 12,
    color: PSBColors.text.secondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 16,
  },

  // Tools Section - Different Design
  toolsContainer: {
    paddingHorizontal: PSBSpacing.lg,
    marginBottom: 66,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -36,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: PSBColors.primary.green + "20",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: PSBColors.primary.green,
    marginRight: 4,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toolCard: {
    width: (width - 60) / 2,
    height: 140,
    marginBottom: 15,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    position: "relative",
  },
  toolIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  toolDescription: {
    fontSize: 11,
    color: PSBColors.text.secondary,
    lineHeight: 14,
  },
  toolBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  toolBadgeText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // Simulators Section - Completely Different Design
  simulatorsContainer: {
    paddingHorizontal: PSBSpacing.lg,
    marginBottom: 35,
    marginTop: 6,
  },
  simulatorsScroll: {
    paddingRight: -20,
    marginLeft: -96,
    marginTop: 50,
  },
  simulatorCard: {
    width: 280,
    height: 200,
    marginRight: 30,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  simulatorGradient: {
    flex: 1,
    padding: 20,
  },
  simulatorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  simulatorIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  simulatorContent: {
    flex: 1,
  },
  simulatorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  simulatorDescription: {
    fontSize: 13,
    color: "#FFFFFF",
    lineHeight: 18,
    opacity: 0.9,
  },
  simulatorFooter: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  simulatorAction: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  tipsContainer: {
    paddingHorizontal: PSBSpacing.lg,
    marginBottom: -60,
    marginTop: 0,
  },

  // Quiz Section - New Design
  quizContainer: {
    paddingHorizontal: PSBSpacing.lg,
    marginBottom: 70,
    marginTop: 6,
  },
  quizCard: {
    backgroundColor: PSBColors.background.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  quizIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  quizBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quizBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  quizContent: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 14,
    color: PSBColors.text.secondary,
    marginBottom: 15,
    lineHeight: 20,
  },
  quizQuestionContainer: {
    marginBottom: 15,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: PSBColors.primary.green,
    marginBottom: 12,
    lineHeight: 22,
  },
  quizOptionsContainer: {
    gap: 8,
  },
  quizOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  quizOptionText: {
    fontSize: 13,
    color: PSBColors.text.secondary,
    lineHeight: 18,
  },
  quizFooter: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  quizAction: {
    fontSize: 14,
    fontWeight: "bold",
  },
  quizFeedbackText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
  },

  // Feedback styles
  correctOption: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderColor: "#4CAF50",
  },
  wrongOption: {
    backgroundColor: "rgba(244, 67, 54, 0.2)",
    borderColor: "#F44336",
  },
  correctOptionText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  wrongOptionText: {
    color: "#F44336",
    fontWeight: "bold",
  },
  tipsScroll: {
    paddingHorizontal: 10,
  },
  tipCard: {
    backgroundColor: PSBColors.background.card,
    borderRadius: 16,
    padding: PSBSpacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  tipIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 193, 7, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: PSBColors.primary.green,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: PSBColors.text.secondary,
    lineHeight: 20,
  },
});

export default HomeScreen;