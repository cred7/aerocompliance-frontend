import axios from "axios";
import { clearToken, getToken } from "./token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// -----------------------------
// REQUEST INTERCEPTOR
// -----------------------------
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// -----------------------------
// RESPONSE INTERCEPTOR
// -----------------------------
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    // No response from server
    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // -------------------------
    // 401 Unauthorized
    // -------------------------
    if (status === 401) {
      console.log("Unauthorized request");

      // Optional:
      // remove invalid token
      clearToken();
      window.location.href = "/login";

      // Optional:
      // redirect to login
      // window.location.href = "/login";
    }

    // -------------------------
    // 403 Forbidden
    // -------------------------
    if (status === 403) {
      console.log("Forbidden");
    }

    // IMPORTANT:
    // rethrow error so calling file handles it too
    return Promise.reject(error);
  },
);
