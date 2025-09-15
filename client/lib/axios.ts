import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1",
  withCredentials: true,
});

// Store accessToken in memory (not localStorage for security)
let accessToken: string | null = null;

// Extend AxiosRequestConfig to include `_retry`
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Expected API response shape
interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

// Auth refresh token response type
interface RefreshTokenResponse {
  accessToken: string;
}

// Error response shape
interface ErrorResponse {
  message: string;
}

// Request interceptor → attach accessToken
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle expired tokens and license check
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig;

    // 🚫 License expired
    if (error.response?.status === 403 && error.response.data?.message?.toLowerCase().includes("license")) {
      if (typeof window !== "undefined") {
        window.location.href = "/license-expired";
      }
      return Promise.reject(error);
    }

    // 🔑 Access token expired → try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post<ApiResponse<RefreshTokenResponse>>("/auth/refresh-token");

        // Update access token in memory
        accessToken = res.data.data.accessToken;

        // Retry original request with new access token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid", refreshError);

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Function to set accessToken after login
 */
export const setAccessToken = (token: string) => {
  accessToken = token;
};

/**
 * Function to clear tokens (e.g. on logout)
 */
export const clearAccessToken = () => {
  accessToken = null;
};

export default api;
