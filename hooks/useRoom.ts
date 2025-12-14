import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Room, RoomEvent, TokenSource } from 'livekit-client';
import { AppConfig } from '@/app-config';
import { toastAlert } from '@/components/livekit/alert-toast';
import type { ConnectionDetails } from '@/network';

export function useRoom(appConfig: AppConfig) {
  const aborted = useRef(false);
  const room = useMemo(() => new Room(), []);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    function onDisconnected() {
      setIsSessionActive(false);
    }

    function onMediaDevicesError(error: Error) {
      toastAlert({
        title: 'Encountered an error with your media devices',
        description: `${error.name}: ${error.message}`,
      });
    }

    room.on(RoomEvent.Disconnected, onDisconnected);
    room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);

    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
    };
  }, [room]);

  useEffect(() => {
    return () => {
      aborted.current = true;
      room.disconnect();
    };
  }, [room]);

  const createTokenSource = useCallback(
    (metadata?: string) =>
      TokenSource.custom(async () => {
        if (!metadata) {
          throw new Error('agentId (metadata) is required');
        }

        const dialApiEndpoint =
          process.env.NEXT_PUBLIC_DIAL_API_ENDPOINT ||
          'https://zr1red2j54.execute-api.ap-south-1.amazonaws.com/dev/calls/dial';

        try {
          const response = await fetch(dialApiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agentId: metadata }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Dial API error:', errorText);
            throw new Error(`Dial API error: ${response.status} ${errorText}`);
          }

          const dialData = await response.json();
          console.log('Dial API response:', dialData);

          // Map dial API response to ConnectionDetails format
          const connectionDetails: ConnectionDetails = {
            serverUrl:
              dialData.serverUrl ||
              dialData.server ||
              process.env.NEXT_PUBLIC_LIVEKIT_URL ||
              '',
            roomName:
              dialData.roomName ||
              dialData.room ||
              `voice_assistant_room_${Math.floor(Math.random() * 10_000)}`,
            participantToken: dialData.participantToken || dialData.token,
            participantName: dialData.participantName || dialData.name || 'user',
          };

          if (!connectionDetails.participantToken) {
            throw new Error('participantToken not found in dial API response');
          }

          if (!connectionDetails.serverUrl) {
            throw new Error('serverUrl not found in dial API response and NEXT_PUBLIC_LIVEKIT_URL is not set');
          }

          return connectionDetails;
        } catch (error) {
          console.error('Error calling dial API:', error);
          throw error instanceof Error
            ? error
            : new Error('Error fetching connection details from dial API!');
        }
      }),
    []
  );

  const startSession = useCallback(
    (metadata?: string) => {
    setIsSessionActive(true);

    if (room.state === 'disconnected') {
      const { isPreConnectBufferEnabled } = appConfig;
        const tokenSource = createTokenSource(metadata);
      Promise.all([
        room.localParticipant.setMicrophoneEnabled(true, undefined, {
          preConnectBuffer: isPreConnectBufferEnabled,
        }),
        tokenSource
            .fetch({})
          .then((connectionDetails) =>
            // Connect with the token string
            // Note: LiveKit server automatically refreshes tokens server-side for connected participants
            // If reconnection is needed, the tokenSource callback will be called again with the same metadata (agentId)
            room.connect(connectionDetails.serverUrl, connectionDetails.participantToken)
          ),
      ]).catch((error) => {
        if (aborted.current) {
          // Once the effect has cleaned up after itself, drop any errors
          //
          // These errors are likely caused by this effect rerunning rapidly,
          // resulting in a previous run `disconnect` running in parallel with
          // a current run `connect`
          return;
        }

        toastAlert({
          title: 'There was an error connecting to the agent',
          description: `${error.name}: ${error.message}`,
        });
      });
    }
    },
    [room, appConfig, createTokenSource]
  );

  const endSession = useCallback(() => {
    setIsSessionActive(false);
  }, []);

  return { room, isSessionActive, startSession, endSession };
}
