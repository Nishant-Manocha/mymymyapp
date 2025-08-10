import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1a1a2e",
          }}
        >
          <ActivityIndicator size="large" color="#ff6b6b" />
        </View>
      </>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
