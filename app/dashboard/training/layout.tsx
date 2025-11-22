import { headers } from 'next/headers';
import { SessionProvider } from '@/components/app/session-provider';
import { getAppConfig } from '@/lib/utils';

export default async function TrainingLayout({ children }: { children: React.ReactNode }) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);

  return <SessionProvider appConfig={appConfig}>{children}</SessionProvider>;
}
