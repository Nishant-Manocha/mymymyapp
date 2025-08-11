import AsyncStorageService, { STORAGE_KEYS } from "../../../utils/AsyncStorage";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlices";

/**
 * Initializes auth state from AsyncStorage with backward compatibility.
 * - Token: accepts string or coerces other types to string
 * - User: accepts object; if string and looks JSON, parses; otherwise clears
 */
export const initializeAuth = () => async (dispatch) => {
  try {
    const [storedToken, storedUser] = await Promise.all([
      AsyncStorageService.getItem(STORAGE_KEYS.USER_TOKEN),
      AsyncStorageService.getItem(STORAGE_KEYS.USER_PROFILE),
    ]);

    console.log("[AUTH INIT]", {
      tokenType: typeof storedToken,
      userType: typeof storedUser,
      tokenSample: typeof storedToken === "string" ? storedToken.slice(0, 10) : undefined,
    });

    if (storedToken) {
      const token = typeof storedToken === "string" ? storedToken : String(storedToken);
      dispatch(setToken(token));
    }

    if (storedUser && typeof storedUser === "object") {
      dispatch(setUser(storedUser));
    } else if (storedUser && typeof storedUser === "string") {
      const trimmed = storedUser.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          const obj = JSON.parse(trimmed);
          dispatch(setUser(obj));
        } catch {
          console.warn("[AUTH INIT] user string not valid JSON, clearing");
          await AsyncStorageService.removeItem(STORAGE_KEYS.USER_PROFILE);
        }
      } else {
        console.warn("[AUTH INIT] user is non-JSON string, clearing");
        await AsyncStorageService.removeItem(STORAGE_KEYS.USER_PROFILE);
      }
    }
  } catch (e) {
    console.error("Failed to initialize auth from AsyncStorage:", e);
    // Clear corrupted keys to recover next launch
    await AsyncStorageService.removeItem(STORAGE_KEYS.USER_TOKEN);
    await AsyncStorageService.removeItem(STORAGE_KEYS.USER_PROFILE);
  }
};
