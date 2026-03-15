'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-full inline-block">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-black tracking-tight text-foreground">Настана неочекувана грешка</h1>
        <p className="text-muted-foreground text-lg font-medium italic">
          &quot;Gegen das Vergessen, aber diesmal hat das System etwas vergessen.&quot;
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed pt-2">
          Се извинуваме за овој мал дефект. Пробајте да ја рестартирате страницата или вратете се на почетна.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg" 
            onClick={() => reset()}
            className="rounded-2xl px-8 font-bold gap-2 bg-primary text-white"
          >
            <RefreshCcw className="w-5 h-5" />
            Пробај повторно
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" className="rounded-2xl px-8 font-bold gap-2">
              <Home className="w-5 h-5" />
              Почетна
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
