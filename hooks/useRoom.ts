import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Room, RoomEvent, TokenSource } from 'livekit-client';
import { AppConfig } from '@/app-config';
import { toastAlert } from '@/components/livekit/alert-toast';
import type { ConnectionDetails } from '@/network';
import { endRoom, startRoom } from '@/network/room-api';
import { CallEndParams, CallStartRequestParams, CallStartResponse } from '@/network/models/room';

export function useRoom(appConfig: AppConfig) {
  const aborted = useRef(false);
  const room = useMemo(() => new Room(), []);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const currentCallIdRef = useRef<string | undefined>(undefined);
  const getCallId = useCallback(() => currentCallIdRef.current, []);

  // Helper function to call the end call API
  const callEndCallAPI = useCallback(async (callId: string, context: string = '') => {

    try {
      const callEndParams = { callId } as CallEndParams
      endRoom(callEndParams)
    } catch (error) {
      console.error(`Error calling end call API:, ${error}`);
    }
  }, []);

  useEffect(() => {
    async function onDisconnected() {
      setIsSessionActive(false);

      // Call the end call API if callId is available
      const callId = currentCallIdRef.current;
      if (callId) {
        await callEndCallAPI(callId, 'on disconnect');
        // Clear the callId reference
        currentCallIdRef.current = undefined;
      }
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
  }, [room, callEndCallAPI]);

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
        try {
          const params : CallStartRequestParams = {
            agentId: metadata
          }
          const startRoomResponse = await startRoom(params)

          if (!startRoomResponse) {
            console.error('Invalid call start response');
            throw new Error('Invalid response');
          }

          const dialData = startRoomResponse as CallStartResponse

          if (!dialData.serverUrl || !dialData.participantToken) {
            console.error('Invalid call start response');
            throw new Error('Invalid response');
          }
          const callId = dialData.callId;
          if (callId) {
            currentCallIdRef.current = callId;
          }
          const connectionDetails: ConnectionDetails = {
            serverUrl: dialData.serverUrl,
            roomName: dialData.roomName,
            participantToken: dialData.participantToken,
            participantName: dialData.participantName
          };
          return connectionDetails;
        } catch (error) {
           throw new Error(`Error while creating room: ${error}`);
          console.error('Error calling dial API:', error);
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

  const endSession = useCallback(async () => {
    setIsSessionActive(false);

    // Call the end call API if callId is available
    const callId = currentCallIdRef.current;
    if (callId) {
      await callEndCallAPI(callId, 'end session');
      // Clear the callId reference
      currentCallIdRef.current = undefined;
    }

    // Disconnect from the room
    if (room.state !== 'disconnected') {
      room.disconnect();
    }
  }, [room, callEndCallAPI]);

  return { room, isSessionActive, startSession, endSession, getCallId };
}
