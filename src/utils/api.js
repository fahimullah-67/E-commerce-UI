import axios from "axios";

const API_BASE_URL = "/api";

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
