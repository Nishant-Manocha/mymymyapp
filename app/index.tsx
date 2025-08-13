import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import PermissionManager from "../utils/PermissionManager";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const [permissionsReady, setPermissionsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const requestPermissions = async () => {
      try {
        await PermissionManager.requestPermissionsWithExplanation();
      } catch (error) {
        console.warn("Permission request failed:", error);
      } finally {
        if (isMounted) setPermissionsReady(true);
      }
    };

    requestPermissions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || !permissionsReady) {
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
  }

  return <Redirect href="/(auth)/login" />;
}
