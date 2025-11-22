import { apiClient, isAxiosError } from './client';

export interface SandboxConfig {
  [key: string]:
    | { type: 'string'; value: string }
    | { type: 'number'; value: number }
    | { type: 'boolean'; value: boolean }
    | null;
}

export interface GetAppConfigParams {
  endpoint: string;
  sandboxId: string;
}

/**
 * Fetches app configuration from the config endpoint
 */
export async function getAppConfig(params: GetAppConfigParams): Promise<SandboxConfig> {
  const { endpoint, sandboxId } = params;

  try {
    const response = await apiClient.get<SandboxConfig>(endpoint, {
      headers: { 'X-Sandbox-ID': sandboxId },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        `ERROR: querying config endpoint failed with status ${error.response?.status}: ${error.response?.statusText}`
      );
    } else {
      console.error('ERROR: getAppConfig() - network/config-api.ts', error);
    }
    throw error;
  }
}

