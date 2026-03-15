"use client";

import { ThemeProvider } from '@/components/ThemeProvider';
import { OfflineProvider } from '@/components/OfflineProvider';
import { CookieConsent } from '@/components/CookieConsent';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <OfflineProvider>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </OfflineProvider>
    </ThemeProvider>
  );
}
