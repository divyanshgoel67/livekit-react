import { headers } from 'next/headers';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { NavigationMenu } from '@/components/app/navigation-menu';
import { getAppConfig } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const hdrs = await headers();
  const { companyName, logo, logoDark } = await getAppConfig(hdrs);

  return (
    <>
      <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 z-50 w-full border-b backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="scale-100 transition-transform duration-300 hover:scale-110">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt={`${companyName} Logo`} className="block size-6 dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoDark ?? logo}
                alt={`${companyName} Logo`}
                className="hidden size-6 dark:block"
              />
            </Link>

            <NavigationMenu />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
            >
              <Home className="h-4 w-4" />
              <span>Menu</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-16">{children}</div>
    </>
  );
}
