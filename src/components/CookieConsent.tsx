"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const COOKIE_KEY = 'cookie_consent';

interface CookieConsentProps {
  onConsentChange?: (consented: boolean) => void;
}

export function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted' && onConsentChange) {
      onConsentChange(true);
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setShowBanner(false);
    if (onConsentChange) {
      onConsentChange(true);
    }
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setShowBanner(false);
    if (onConsentChange) {
      onConsentChange(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Колчиња</p>
                <p>
                  Оваа апликација користи аналитики за подобрување на корисничкото искуство.{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Дознај повеќе
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDecline}
                className="text-muted-foreground"
              >
                Не се согласувам
              </Button>
              <Button 
                size="sm" 
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Се согласувам
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(COOKIE_KEY) === 'accepted';
}
