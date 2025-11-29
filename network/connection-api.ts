import { apiClient } from './client';

export interface ConnectionDetails {
  serverUrl: string;
  roomName: string;
  participantToken: string;
  participantName: string;
}

export interface RoomConfig {
  metadata?: string;
  agents?: Array<{ agent_name?: string; metadata?: string }>;
}

export interface GetConnectionDetailsParams {
  url: string;
  sandboxId: string;
  roomConfig?: RoomConfig;
}

/**
 * Fetches connection details for LiveKit room
 */
export async function getConnectionDetails(
  params: GetConnectionDetailsParams
): Promise<ConnectionDetails> {
  const { url, sandboxId, roomConfig } = params;

  try {
    const response = await apiClient.post<ConnectionDetails>(
      url,
      {
        room_config: roomConfig,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Sandbox-Id': sandboxId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching connection details:', error);
    throw new Error('Error fetching connection details!');
  }
}
