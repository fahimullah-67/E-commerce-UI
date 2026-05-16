import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/`
  : "/api/";

export const publicRequest = axios.create({
  baseURL: API_BASE_URL,
});

export const authRequest = (token) =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      token: `Bearer ${token}`,
    },
  });
