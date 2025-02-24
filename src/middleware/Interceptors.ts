"use client";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = "https://backend-ftpl-production.up.railway.app/api/v1";

const interceptorInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor for adding the bearer token
interceptorInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error.message);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors and responses
interceptorInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default interceptorInstance;
