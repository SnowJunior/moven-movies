/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance with a base URL
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add an interceptor to inject the token dynamically
client.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_MOVIE_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Define the API client function
export const apiClient = async <T = any>(
  options: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await client(options);
    return response; // Return the full response object
  } catch (error: any) {
    handleApiError(error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Centralized error handling
const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error('API Error Response:', {
      status: error.response.status,
      data: error.response.data,
    });
  } else if (error.request) {
    // Request was made but no response was received
    console.error('API Error Request:', error.request);
  } else {
    // Something else caused the error
    console.error('API Error:', error.message);
  }
};



// ENV variables to store project secrets
export const baseURL = process.env.NEXT_PUBLIC_API_URL
export const imageURL = "https://image.tmdb.org/t/p/original"
export const firebaseAPI = process.env.NEXT_PUBLIC_FIREBASE_API
export const firebaseMessangerID = process.env.NEXT_PUBLIC_FIREBASE_MESSENGER_ID
export const firebaseAPPID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID