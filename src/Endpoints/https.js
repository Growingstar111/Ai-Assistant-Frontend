import axios from "axios";
import { store } from '../redux/store'
export const https = axios.create({
  baseURL: "https://ai-assistant-backend-6aaq.onrender.com/api",
});

https.interceptors.request.use((config) => {
  const token = store.getState().user?.details?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
