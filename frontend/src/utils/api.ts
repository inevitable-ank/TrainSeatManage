import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`, // Base URL for API requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
