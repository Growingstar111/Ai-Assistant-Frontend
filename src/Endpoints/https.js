import axios from "axios";
import { store } from '../redux/store'
export const https = axios.create({
  baseURL: "http://localhost:8000/api",
});

https.interceptors.request.use((config) => {
  const token = store.getState().user?.details?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
