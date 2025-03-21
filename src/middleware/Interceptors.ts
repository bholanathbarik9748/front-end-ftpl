"use client";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://backend-ftpl-production.up.railway.app/api/v1";

const interceptorInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Flag to prevent multiple token refresh requests at the same time
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * Refresh Token Function
 */
const refreshToken = async (): Promise<string | null> => {
  try {
    const refresh_token = Cookies.get("refresh_token");
    if (!refresh_token) throw new Error("No refresh token available");

    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh-token`,
      { refresh_token },
      { withCredentials: true }
    );

    const newToken = response?.data?.data?.access_token;
    const newRefreshToken = response?.data?.data?.refresh_token;

    if (newToken && newRefreshToken) {
      Cookies.set("access_token", newToken, { expires: 30 });
      Cookies.set("refresh_token", newRefreshToken, { expires: 365 });

      // Notify all subscribers about the new token
      onTokenRefreshed(newToken);
      return newToken;
    }

    throw new Error("Failed to retrieve new tokens");
  } catch (error) {
    console.error("❌ Token refresh failed:", error);

    // If refresh token expired, clear cookies and redirect to login
    if (
      (error as AxiosError)?.response?.data?.errorCode ===
      "REFRESH_TOKEN_EXPIRED"
    ) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.href = "/login";
    }

    return null;
  } finally {
    isRefreshing = false;
  }
};

/**
 * Adds callbacks to wait for the new token
 */
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

/**
 * Axios Request Interceptor - Adds Authorization Token
 */
interceptorInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request error:", error.message);
    return Promise.reject(error);
  }
);

/**
 * Axios Response Interceptor - Handles Token Expiry
 */
interceptorInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // Return response as is when successful
  async (error: AxiosError) => {
    if (!error.response) {
      console.error("❌ Network error:", error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config; // Store the failed request

    // Check if the error is due to an expired access token
    if (
      error.response.status === 401 &&
      error.response.data?.errorCode === "TOKEN_EXPIRED"
    ) {
      console.warn("🔑 Access token expired! Trying to refresh...");

      if (!originalRequest) return Promise.reject(error);

      if (!isRefreshing) {
        isRefreshing = true;

        refreshToken().then((newToken) => {
          if (!newToken) return Promise.reject(error);
        });
      }

      // Queue the request and retry once token is refreshed
      return new Promise((resolve, reject) => {
        refreshSubscribers.push(async (token) => {
          if (!originalRequest) {
            console.error("❌ Original request is undefined. Cannot retry.");
            return reject(error);
          }

          try {
            // Ensure originalRequest has headers
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            const retryResponse = await interceptorInstance(originalRequest);
            resolve(retryResponse);
          } catch (retryError) {
            console.error("❌ Retried request failed:", retryError);
            reject(retryError);
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

export default interceptorInstance;
