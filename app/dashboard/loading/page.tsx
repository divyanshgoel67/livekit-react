'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';

export default function LoadingPage() {
  const [status, setStatus] = useState<string>('processing');
  const [transcript, setTranscript] = useState<string | null>(null);
  const [callMetrics, setCallMetrics] = useState<Record<string, unknown> | null>(null);
  const searchParams = useSearchParams();
  const callId = searchParams.get('callId');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const pollApi = async () => {
      try {
        const response = await fetch('https://zr1red2j54.execute-api.ap-south-1.amazonaws.com/dev/calls/' + callId);
        const data = await response.json();
        
        setStatus(data.status);
        
        if (data.status === 'completed') {
          const transcriptResponse = await fetch('https://zr1red2j54.execute-api.ap-south-1.amazonaws.com/dev/calls/' + callId + '/transcript');
          const transcriptData = await transcriptResponse.json();
          setTranscript(transcriptData.transcript);
          setCallMetrics(transcriptData.callMetrics);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    intervalRef.current = setInterval(pollApi, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [callId]);

  if (transcript && callMetrics) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold text-slate-900">Call Results</h1>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Transcript</h2>
            <p className="text-slate-700 whitespace-pre-wrap">{transcript}</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">Call Metrics</h2>
            <pre className="bg-slate-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(callMetrics, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Processing your call...</h2>
          <p className="text-slate-500">Please wait while we analyze your session</p>
        </div>
      </div>
    </div>
  );
}
