import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlices";

/**
 * Initialize authentication state from AsyncStorage
 * This function should be called when the app starts
 */
export const initializeAuth = () => async (dispatch) => {
  try {
    console.log("Initializing auth from AsyncStorage...");

    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem("user_token");
    console.log(
      "Token from AsyncStorage:",
      token ? "Found" : "Not found",
      token
    );

    const userString = await AsyncStorage.getItem("user_profile");
    console.log(
      "User data from AsyncStorage:",
      userString ? "Found" : "Not found"
    );

    if (token) {
      // Parse token if it was stored as JSON string
      const parsedToken = token.startsWith("{") ? JSON.parse(token) : token;
      console.log("Setting token in Redux store");
      dispatch(setToken(parsedToken));

      // If we also have user data, set it in Redux
      if (userString) {
        const user = JSON.parse(userString);
        console.log("Setting user data in Redux store:", user.email);
        dispatch(setUser(user));
      } else {
        console.log("No user data found in AsyncStorage");
      }

      console.log("Auth successfully initialized from AsyncStorage");
      return { success: true };
    } else {
      console.log("No token found in AsyncStorage, user is not authenticated");
    }
  } catch (error) {
    console.error("Failed to initialize auth from AsyncStorage:", error);
    return { error: "Failed to initialize auth" };
  }

  return { success: false };
};
