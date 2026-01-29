import axios, { AxiosError, AxiosInstance } from 'axios';

/**
 * Creates a configured axios instance
 */
export function createAxiosClient(baseURL?: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return client;
}

/**
 * Get the base URL from the enviromnemt
 */
const baseUrl = process.env.NEXT_PUBLIC_BASE_END_POINT || ""

/**
 * Default axios client instance
 */
export const apiClient = createAxiosClient(baseUrl);

/**
 * Helper to check if an error is an Axios error
 */
export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}
