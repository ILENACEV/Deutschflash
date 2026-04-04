"use client";

import { ThemeProvider } from '@/components/ThemeProvider';
import { OfflineProvider } from '@/components/OfflineProvider';
import { StorageProvider } from '@/components/StorageProvider';
import { CookieConsent } from '@/components/CookieConsent';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StorageProvider>
        <OfflineProvider>
          <GoogleAnalytics />
          {children}
          <CookieConsent />
        </OfflineProvider>
      </StorageProvider>
    </ThemeProvider>
  );
}
