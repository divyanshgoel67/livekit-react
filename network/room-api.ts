import { apiClient, isAxiosError } from "./client";
import { CallEndParams, CallEndResponse, CallStartRequestParams, CallStartResponse, CallStatusResponse, CallTranscriptResponse } from "./models/room";

const baseEndpoint = '/core/calls'

export async function startRoom(params: CallStartRequestParams): Promise<CallStartResponse | undefined> {
  const endpoint = `${baseEndpoint}/dial`;
  try {
    const response = await apiClient.post<CallStartResponse>(endpoint, params);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        `ERROR: ending room with status ${error.response?.status}: ${error.response?.statusText}`
      );
    } else {
      console.error('ERROR:', error);
    }
    return undefined;
  }
}

export async function endRoom(params: CallEndParams): Promise<CallEndResponse | undefined> {
  const endpoint = `${baseEndpoint}/${params.callId}/end`;
  try {
    const response = await apiClient.post<CallEndResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        `ERROR: ending room with status ${error.response?.status}: ${error.response?.statusText}`
      );
    } else {
      console.error('ERROR:', error);
    }
    return undefined;
  }
}

export async function getCallStatus(callId: string): Promise<CallStatusResponse | undefined> {
  const endpoint = `${baseEndpoint}/${callId}`;
  try {
    const response = await apiClient.get<CallStatusResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        `ERROR: ending room with status ${error.response?.status}: ${error.response?.statusText}`
      );
    } else {
      console.error('ERROR:', error);
    }
    return undefined;
  }
}

export async function getCallTranscript(callId: string): Promise<CallTranscriptResponse | undefined> {
  const endpoint = `${baseEndpoint}/${callId}/transcript`;
  try {
    const response = await apiClient.get<CallTranscriptResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        `ERROR: ending room with status ${error.response?.status}: ${error.response?.statusText}`
      );
    } else {
      console.error('ERROR:', error);
    }
    return undefined;
  }
}