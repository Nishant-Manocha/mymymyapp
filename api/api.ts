import axios from "axios";
import store from "../redux/store"; // Adjust the import path as necessary
import { getToken, saveToken } from "../utils/SecureStore";
import { secureApiService } from "../utils/apiSecurity";
import { SECURITY_CONFIG } from "../utils/securityConfig";

// Honor SERVER_URL if provided at runtime
const resolvedBaseURL = process.env.SERVER_URL || SECURITY_CONFIG.API.BASE_URL;
secureApiService.updateBaseURL(resolvedBaseURL);

// Use secureApiService axios client
const API = secureApiService.getApiClient();

// Intercept all requests to attach the token
API.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      // Keep using Authorization header, but also keep secure service in sync
      (config.headers = (config.headers || {} as any)) as any;
      (config.headers as any).authorization = `Bearer ${token}`;
      secureApiService.setAuthToken(token);
    }

    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default API;
