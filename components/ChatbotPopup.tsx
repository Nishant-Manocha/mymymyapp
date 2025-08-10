import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

interface ChatbotPopupProps {
  visible: boolean;
  onClose: () => void;
}

const ChatbotPopup: React.FC<ChatbotPopupProps> = ({ visible, onClose }) => {
  const slideAnim = React.useRef(new Animated.Value(width)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.popupContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>FinGuard Assistant</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Chatbot */}
          <WebView
            source={{
              uri: "https://www.chatbase.co/chatbot-iframe/HfkB8AwS8RkSfjW84TkZB",
            }}
            style={styles.webView}
            javaScriptEnabled
            domStorageEnabled
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  popupContainer: {
    width: width * 0.72,
    height: height * 0.65,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    marginRight: 32, // ✅ Added space from the right
    marginBottom:16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: -2, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    backgroundColor: "#0070BA",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    color: "#fff",
    fontSize: 20,
  },
  webView: {
    flex: 1,
  },
});

export default ChatbotPopup;
