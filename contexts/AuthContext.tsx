import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "../redux/services/operations/initAuth";
import { logout } from "../redux/services/operations/authServices";
import { setUser } from "../redux/slices/profileSlices";
import AsyncStorageService, { STORAGE_KEYS } from "../utils/AsyncStorage";

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useDispatch();

  // Get authentication state from Redux
  let token = useSelector((state: any) => state.auth.token);
  const isAuthenticated = !!token;

  // Initialize auth state on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        await dispatch(initializeAuth() as any);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  // Handle navigation based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to auth if not authenticated and not in auth group
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to app if authenticated and in auth group
      router.replace("/(app)/(tabs)");
    }
  }, [isAuthenticated, segments, isLoading]);

  const signIn = () => {
    // This will be called after successful login
    // The navigation will be handled by the useEffect above
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const result = await dispatch(logout() as any);

      if (result.success) {
        dispatch(setUser(null));
        // Navigation will be handled by useEffect
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
