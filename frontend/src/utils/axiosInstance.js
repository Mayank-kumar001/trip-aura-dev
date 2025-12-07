import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: "https://nonirritable-kacie-unenrolled.ngrok-free.dev/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
