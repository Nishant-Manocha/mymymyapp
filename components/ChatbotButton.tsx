import React, { useRef, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from "react-native";
import { MessageCircle } from "lucide-react-native";

interface ChatbotButtonProps {
  onPress: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(100)).current; // Start off-screen

  useEffect(() => {
    // Floating button bounce animation
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();

    // Slide-up entry animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [pulseAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: pulseAnim }, { translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <MessageCircle color="#fff" size={24} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 36,
    right: 24,
    zIndex: 1000,
  } as ViewStyle,
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0070BA",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0070BA",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default ChatbotButton;
