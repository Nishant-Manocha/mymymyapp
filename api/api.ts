import axios from "axios";
import store from "../redux/store"; // Adjust the import path as necessary
import { getToken, saveToken } from "../utils/SecureStore";

const API = axios.create({
  baseURL: process.env.SERVER_URL,
});

// Intercept all requests to attach the token
API.interceptors.request.use(
  async (config) => {
    // const state = store.getState();

    // Debug logs
    // console.log("Redux state in API:", state);
    const token = await getToken(); // Adjust if your slice key is different
    console.log("Access token from Redux:", token);

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.authorization);
    } else {
      console.log("No token found, request sent without Authorization header.");
    }

    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default API;
