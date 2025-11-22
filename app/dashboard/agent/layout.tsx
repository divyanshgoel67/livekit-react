import { headers } from 'next/headers';
import { getAppConfig } from '@/lib/utils';
import { SessionProvider } from '@/components/app/session-provider';
import { VoiceAgentContent } from './voice-agent-content';

export default async function VoiceAgentLayout({ children }: { children: React.ReactNode }) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);

  return (
    <SessionProvider appConfig={appConfig}>
      <VoiceAgentContent appConfig={appConfig} />
    </SessionProvider>
  );
}

