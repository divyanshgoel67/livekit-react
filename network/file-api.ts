import { apiClient, isAxiosError } from './client';

/**
 * Fetches a file as ArrayBuffer from a remote URL
 */
export async function fetchFileAsArrayBuffer(url: string): Promise<ArrayBuffer> {
  try {
    const response = await apiClient.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer',
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        `Failed to fetch ${url} - ${error.response?.status} ${error.response?.statusText}`
      );
    }
    throw error;
  }
}
