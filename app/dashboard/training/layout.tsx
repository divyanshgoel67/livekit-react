import { headers } from 'next/headers';
import { getAppConfig } from '@/lib/utils';
import { SessionProvider } from '@/components/app/session-provider';

export default async function TrainingLayout({ children }: { children: React.ReactNode }) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);

  return <SessionProvider appConfig={appConfig}>{children}</SessionProvider>;
}

