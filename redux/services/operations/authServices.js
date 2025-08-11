import Toast from "react-native-toast-message";
import { apiConnector } from "../apiConnector";
import { authApi } from "../api";
import {
  setLoading,
  setToken,
  logout as logoutAction,
} from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlices";
import AsyncStorageService, { STORAGE_KEYS } from "../../../utils/AsyncStorage";
import { deleteToken, saveToken } from "../../../utils/SecureStore";

/**
 * ✅ Utility: Extracts proper backend message
 */
const getErrorMessage = (error, fallback = "Something went wrong") => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

/**
 * 🔑 LOGIN USER
 */
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("🚀 [login] Called with email:", email);
  Toast.show({ type: "info", text1: "Logging in..." });

  try {
    const response = await apiConnector("POST", authApi.POST_LOGIN_USER_API, {
      email,
      password,
    });

    console.log("✅ [login] API Response:", response);

    Toast.show({ type: "success", text1: "Login Successful" });
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));
    await saveToken(response.data.token);

    console.log(response.data.token, "login token");

    await AsyncStorageService.setItem(
      STORAGE_KEYS.USER_TOKEN,
      response.data.token
    );
    await AsyncStorageService.setItem(
      STORAGE_KEYS.USER_PROFILE,
      response.data.user
    );
    await AsyncStorageService.setItem(
      STORAGE_KEYS.LAST_LOGIN,
      new Date().toISOString()
    );

    dispatch(setLoading(false));
    return {
      success: true,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Login Failed");
    console.error("❌ Login Error:", errorMessage);

    Toast.show({ type: "error", text1: errorMessage });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 📝 SIGNUP USER
 */
export const signUp = (signUpData) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Signing up..." });

  try {
    const response = await apiConnector(
      "POST",
      authApi.POST_SIGNUP_USER_API,
      signUpData
    );

    Toast.show({ type: "success", text1: "Signup Successful" });
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));

    await AsyncStorageService.setItem(
      STORAGE_KEYS.USER_TOKEN,
      response.data.token
    );
    await AsyncStorageService.setItem(
      STORAGE_KEYS.USER_PROFILE,
      response.data.user
    );
    await AsyncStorageService.setItem(
      STORAGE_KEYS.LAST_LOGIN,
      new Date().toISOString()
    );
    await AsyncStorageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
    await saveToken(response.data.token);

    dispatch(setLoading(false));
    return {
      success: true,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Signup Failed");
    console.error("❌ Signup Error:", errorMessage);

    Toast.show({ type: "error", text1: errorMessage });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🔐 SEND OTP (for signup or forgot password)
 */
export const sendOtp = (email) => async (dispatch) => {
  console.log("🚀 [sendOtp] Called with email:", email);
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Sending OTP..." });

  try {
    const response = await apiConnector("POST", authApi.POST_SEND_OTP_API, {
      email,
    });
    console.log("✅ [sendOtp] API Response:", response);

    Toast.show({ type: "success", text1: "OTP sent successfully" });
    dispatch(setLoading(false));
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to send OTP");
    console.error("❌ [sendOtp] API Error:", errorMessage);

    Toast.show({ type: "error", text1: errorMessage });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * ✅ VERIFY OTP
 */
export const verifyOtp = (email, otp) => async (dispatch) => {
  console.log("🔐 [verifyOtp] Verifying OTP for:", email);
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Verifying OTP..." });

  try {
    const response = await apiConnector("POST", authApi.POST_VERIFY_OTP_API, {
      email,
      otp,
    });
    Toast.show({ type: "success", text1: "OTP verified!" });
    dispatch(setLoading(false));
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = getErrorMessage(error, "OTP Verification Failed");
    console.error("❌ [verifyOtp] Error:", errorMessage);
    Toast.show({ type: "error", text1: errorMessage });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🔑 FORGOT PASSWORD (uses OTP now)
 */
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Sending OTP for password reset..." });

  try {
    await apiConnector("POST", authApi.POST_FORGOT_PASSWORD_API, { email });
    Toast.show({ type: "success", text1: "OTP sent to your email!" });
    dispatch(setLoading(false));
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to send OTP");
    console.error("❌ Forgot Password Error:", errorMessage);

    Toast.show({ type: "error", text1: errorMessage });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🔑 RESET PASSWORD (after OTP verification)
 */
export const resetPassword = (email, password, otp) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Resetting password..." });

  try {
    console.log("🔑 [resetPassword] Data:", { email, password, otp });
    const response = await apiConnector(
      "POST",
      authApi.POST_RESET_PASSWORD_API,
      { email, password, otp }
    );

    Toast.show({ type: "success", text1: "Password reset successful!" });
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to reset password");
    console.error("❌ Reset Password Error:", error);

    Toast.show({ type: "error", text1: errorMessage });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🚪 LOGOUT USER
 */
export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(logoutAction());

    await AsyncStorageService.removeItem(STORAGE_KEYS.USER_TOKEN);
    await AsyncStorageService.removeItem(STORAGE_KEYS.USER_PROFILE);
    await AsyncStorageService.removeItem(STORAGE_KEYS.LAST_LOGIN);
    await deleteToken();

    Toast.show({ type: "success", text1: "Logged out successfully" });
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    console.error("❌ Logout Error:", error);
    Toast.show({ type: "error", text1: "Error during logout" });
    dispatch(setLoading(false));
    return { error: "Logout failed" };
  }
};
