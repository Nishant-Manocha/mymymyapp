import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const LearnScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView
          source={{
            uri: "https://www.chatbase.co/chatbot-iframe/HfkB8AwS8RkSfjW84TkZB",
          }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default LearnScreen;
