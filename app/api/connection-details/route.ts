import { NextResponse } from 'next/server';
import { AccessToken, type AccessTokenOptions, type VideoGrant } from 'livekit-server-sdk';
import { RoomConfiguration, RoomAgentDispatch } from '@livekit/protocol';

type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
};

// NOTE: you are expected to define the following environment variables in `.env.local`:
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;
const AGENT_NAME = 'default';

// don't cache the results
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    if (LIVEKIT_URL === undefined) {
      throw new Error('LIVEKIT_URL is not defined');
    }
    if (API_KEY === undefined) {
      throw new Error('LIVEKIT_API_KEY is not defined');
    }
    if (API_SECRET === undefined) {
      throw new Error('LIVEKIT_API_SECRET is not defined');
    }

    // Parse metadata (UUID) from request body
    const body = await req.json();
    // Get room-level metadata (prefer room-level, fallback to agent-level for backward compatibility)
    const roomMetadata: string = body?.room_config?.metadata || body?.room_config?.agents?.[0]?.metadata;
    // Get agent-level metadata
    const agentMetadata: string = body?.room_config?.agents?.[0]?.metadata;

    // Generate participant token
    const participantName = 'user';
    const participantIdentity = `voice_assistant_user_${Math.floor(Math.random() * 10_000)}`;
    const roomName = `voice_assistant_room_${Math.floor(Math.random() * 10_000)}`;

    const participantToken = await createParticipantToken(
      { identity: participantIdentity, name: participantName },
      roomName,
      roomMetadata,
      agentMetadata
    );

    // Return connection details
    const data: ConnectionDetails = {
      serverUrl: LIVEKIT_URL,
      roomName,
      participantToken: participantToken,
      participantName,
    };
    const headers = new Headers({
      'Cache-Control': 'no-store',
    });
    return NextResponse.json(data, { headers });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new NextResponse(error.message, { status: 500 });
    }
  }
}

function createParticipantToken(
  userInfo: AccessTokenOptions,
  roomName: string,
  roomMetadata?: string,
  agentMetadata?: string
): Promise<string> {
  const at = new AccessToken(API_KEY, API_SECRET, {
    ...userInfo,
    ttl: '15m',
  });
  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  at.addGrant(grant);

  // Always create roomConfig with fixed agent name "default" and UUID in metadata
  // Create RoomAgentDispatch with agent name "default" and metadata containing the UUID
  const roomAgentDispatch = new RoomAgentDispatch({
    agentName: AGENT_NAME,
    metadata: agentMetadata || '',
  });
  
  // Create RoomConfiguration with room-level metadata and agents
  // Set room-level metadata to the same UUID
  const roomConfig = new RoomConfiguration();
  roomConfig.metadata = roomMetadata || '';
  roomConfig.agents = [roomAgentDispatch];
  
  at.roomConfig = roomConfig;

  return at.toJwt();
}
