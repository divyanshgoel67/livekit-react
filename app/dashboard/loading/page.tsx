'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function LoadingPage() {
  const [status, setStatus] = useState<string>('processing');
  const searchParams = useSearchParams()
  const callId = searchParams.get('callId');

  useEffect(() => {
    const pollApi = async () => {
      try {
        const response = await fetch('https://zr1red2j54.execute-api.ap-south-1.amazonaws.com/dev/calls/' + callId);
        const data = await response.json();
        
        setStatus(data.status);
        
        if (data.status === 'completed') {
          // Redirect to transcript URL for download
          const response = await fetch('https://zr1red2j54.execute-api.ap-south-1.amazonaws.com/dev/calls/' + callId +'/transcript');
          const data = await response.json();
          window.location.href = data.downloadUrl;
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    const intervalId = setInterval(pollApi, 5000);

    return () => clearInterval(intervalId);
  }, []);

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