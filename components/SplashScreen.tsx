import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const { height } = Dimensions.get("window");

type SplashScreenProps = {
  durationMs?: number;
  onFinish?: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ durationMs = 5200, onFinish }) => {
  const waveAnim = useRef(new Animated.Value(0)).current;
  const splashText1Anim = useRef(new Animated.Value(0)).current;
  const splashPsbLogoAnim = useRef(new Animated.Value(0)).current;
  const splashText2Anim = useRef(new Animated.Value(0)).current;
  const splashPtuLogoAnim = useRef(new Animated.Value(0)).current;
  const splashProjectLogoAnim = useRef(new Animated.Value(0)).current;

  const psbImageScaleAnim = useRef(new Animated.Value(0.3)).current;
  const ptuImageScaleAnim = useRef(new Animated.Value(0.3)).current;
  const projectImageScaleAnim = useRef(new Animated.Value(0.3)).current;

  const patternAnim1 = useRef(new Animated.Value(0)).current;
  const patternAnim2 = useRef(new Animated.Value(0)).current;
  const patternAnim3 = useRef(new Animated.Value(0)).current;
  const patternAnim4 = useRef(new Animated.Value(0)).current;
  const patternAnim5 = useRef(new Animated.Value(0)).current;

  const splashTransitionAnim = useRef(new Animated.Value(0)).current;
  const mainPageAnim = useRef(new Animated.Value(height)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, { toValue: -20, duration: 200, useNativeDriver: true }),
        Animated.timing(waveAnim, { toValue: 10, duration: 200, useNativeDriver: true }),
        Animated.timing(waveAnim, { toValue: -10, duration: 200, useNativeDriver: true }),
        Animated.timing(waveAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.delay(1000),
      ])
    ).start();

    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim1, { toValue: 1, duration: 3000, useNativeDriver: true }),
          Animated.timing(patternAnim1, { toValue: 0, duration: 3000, useNativeDriver: true }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim2, { toValue: 1, duration: 4000, useNativeDriver: true }),
          Animated.timing(patternAnim2, { toValue: 0, duration: 4000, useNativeDriver: true }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim3, { toValue: 1, duration: 5000, useNativeDriver: true }),
          Animated.timing(patternAnim3, { toValue: 0, duration: 5000, useNativeDriver: true }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim4, { toValue: 1, duration: 3500, useNativeDriver: true }),
          Animated.timing(patternAnim4, { toValue: 0, duration: 3500, useNativeDriver: true }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(patternAnim5, { toValue: 1, duration: 6000, useNativeDriver: true }),
          Animated.timing(patternAnim5, { toValue: 0, duration: 6000, useNativeDriver: true }),
        ])
      ),
    ]).start();

    const startContentAnimation = () => {
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(splashText1Anim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.delay(200),
        Animated.parallel([
          Animated.spring(splashPsbLogoAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
          Animated.timing(psbImageScaleAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        ]),
        Animated.delay(300),
        Animated.timing(splashText2Anim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.delay(200),
        Animated.parallel([
          Animated.spring(splashPtuLogoAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
          Animated.timing(ptuImageScaleAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        ]),
        Animated.delay(300),
        Animated.parallel([
          Animated.spring(splashProjectLogoAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
          Animated.timing(projectImageScaleAnim, { toValue: 1.15, duration: 1800, useNativeDriver: true }),
        ]),
      ]).start();
    };

    Animated.timing(progressAnim, { toValue: 1, duration: durationMs - 200, useNativeDriver: false }).start();

    startContentAnimation();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(psbImageScaleAnim, { toValue: 2.5, duration: 800, useNativeDriver: true }),
        Animated.timing(ptuImageScaleAnim, { toValue: 2.5, duration: 800, useNativeDriver: true }),
        Animated.timing(projectImageScaleAnim, { toValue: 2.8, duration: 800, useNativeDriver: true }),
        Animated.timing(blurAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
        Animated.timing(splashTransitionAnim, { toValue: -height, duration: 800, useNativeDriver: true }),
        Animated.timing(mainPageAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]).start(() => {
        onFinish?.();
      });
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onFinish]);

  return (
    <>
      <Animated.View
        style={[styles.splashContainer, { transform: [{ translateY: splashTransitionAnim }] }]}
      >
        <LinearGradient colors={["#F9FAF7", "#E8F5E8", "#F0F8F0"]} style={styles.splashGradientBackground} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />

        <View style={styles.splashPatternContainer}>
          <Animated.View
            style={[
              styles.splashPattern1,
              {
                opacity: patternAnim1.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.3] }),
                transform: [
                  { scale: patternAnim1.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] }) },
                  { rotate: patternAnim1.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.splashPattern2,
              {
                opacity: patternAnim2.interpolate({ inputRange: [0, 1], outputRange: [0.05, 0.2] }),
                transform: [{ translateX: patternAnim2.interpolate({ inputRange: [0, 1], outputRange: [-50, 50] }) }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.splashPattern3,
              {
                opacity: patternAnim3.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.4] }),
                transform: [{ scaleY: patternAnim3.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] }) }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.splashPattern4,
              {
                opacity: patternAnim4.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.25] }),
                transform: [
                  { rotate: patternAnim4.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }) },
                  { scale: patternAnim4.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.3] }) },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.splashPattern5,
              {
                opacity: patternAnim5.interpolate({ inputRange: [0, 1], outputRange: [0.05, 0.3] }),
                transform: [
                  { scale: patternAnim5.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2] }) },
                  { rotate: patternAnim5.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "-360deg"] }) },
                ],
              },
            ]}
          />
        </View>

        <Animated.View
          style={[styles.splashBlurOverlay, { opacity: blurAnim, backgroundColor: blurAnim.interpolate({ inputRange: [0, 1], outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"] }) }]}
        />

        <View style={styles.splashCenterContent}>
          <Animated.Text
            style={[
              styles.splashTitle,
              {
                opacity: splashText1Anim,
                transform: [
                  { scale: splashText1Anim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
                  { translateY: splashText1Anim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
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
                  { scale: splashPsbLogoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) },
                ],
              },
            ]}
          >
            <Animated.Image
              source={{ uri: "https://cdn.jsdelivr.net/gh/Nishant-Manocha/FineduGuard_StaticFiles@main/PSB_transparent.png" }}
              style={[styles.splashLogo, { transform: [{ scale: psbImageScaleAnim }] }]}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.Text
            style={[
              styles.splashSubtitle,
              {
                opacity: splashText2Anim,
                transform: [
                  { scale: splashText2Anim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
                  { translateY: splashText2Anim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
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
                  { scale: splashPtuLogoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) },
                ],
              },
            ]}
          >
            <Animated.Image
              source={{ uri: "https://cdn.jsdelivr.net/gh/Nishant-Manocha/FineduGuard_StaticFiles@main/Ptutransparent.png" }}
              style={[styles.splashLogo, { transform: [{ scale: ptuImageScaleAnim }] }]}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
            style={[styles.splashProjectContainer, { opacity: splashProjectLogoAnim, transform: [{ scale: splashProjectLogoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }] }]}
          >
            <Animated.Image
              source={{ uri: "https://cdn.jsdelivr.net/gh/Nishant-Manocha/FineduGuard_StaticFiles@main/project_logo_transparent.png" }}
              style={[styles.splashBottomLogo, { transform: [{ scale: projectImageScaleAnim }] }]}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <View style={styles.splashProgressContainer}>
          <View style={styles.splashProgressTrack}>
            <Animated.View style={[styles.splashProgressFill, { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]} />
          </View>
          <Text style={styles.splashLoadingText}>Loading FinEduGuard...</Text>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
  splashBlurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
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
});

export default SplashScreen;