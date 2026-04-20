import axios from 'axios';

// In prod, set VITE_API_URL to your deployed API origin (e.g. https://ransan-api.onrender.com/api).
// Falls back to localhost for dev.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ransan_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
