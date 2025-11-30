import { useDataChannel } from '@livekit/components-react';
import { useEffect, useState } from 'react';

export function useAgentReady() {
  const [isReady, setIsReady] = useState(false);

  useDataChannel('agent_status', (msg) => {
    try {
      const text = new TextDecoder().decode(msg.payload);
      const data = JSON.parse(text);
      if (data.type === 'agent_ready') {
        setIsReady(true);
      }
    } catch (error) {
      console.error('Failed to parse agent status message:', error);
    }
  });

  return isReady;
}
