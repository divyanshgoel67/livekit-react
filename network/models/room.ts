import { UUID } from "crypto"

export interface CallEndParams {
    callId: string
}

export interface CallEndResponse {
    callId: string
}

export interface CallStartRequestParams {
    agentId: string
}

export interface CallStartResponse {
    callId: string,
    agentId: string,
    participantToken: string,
    serverUrl: string,
    roomName: string,
    participantName: string,
    participantIdentity: string
}

export interface CallStatusResponse {
    status: string
}

export interface CallTranscriptResponse {
    transcript: string,
    callMetrics: Record<string, unknown>
}