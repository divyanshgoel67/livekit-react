import { headers } from 'next/headers';
import { getAppConfig } from '@/lib/utils';
import { VoiceAgentContent } from './voice-agent-content';

export default async function VoiceAgentPage() {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);

  return <VoiceAgentContent appConfig={appConfig} />;
}
