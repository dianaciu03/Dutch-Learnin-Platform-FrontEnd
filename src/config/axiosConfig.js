import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create();

// Check if we're running in Docker environment
const isDocker = process.env.REACT_APP_DOCKER_ENV === 'true';

// Set the base URL based on environment
const baseURL = isDocker ? 'http://localhost:8086' : 'http://localhost:5000';

console.log('Current environment:', {
  isDocker,
  baseURL,
  env: process.env.REACT_APP_DOCKER_ENV
});

// Add request interceptor to add base URL to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Only add baseURL if it's not already set
    if (!config.baseURL) {
      config.baseURL = baseURL;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance; 