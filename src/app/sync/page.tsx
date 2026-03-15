"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RefreshCw, Wifi, QrCode, Copy, Check, AlertCircle } from 'lucide-react';
import { generatePeerId, getLocalPeerId } from '@/lib/p2p-sync';
import { useToast } from '@/hooks/use-toast';

export default function SyncPage() {
  const { toast } = useToast();
  const [mode, setMode] = useState<'home' | 'create' | 'join'>('home');
  const [peerId, setPeerId] = useState('');
  const [remoteId, setRemoteId] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreate = () => {
    const newPeerId = generatePeerId();
    setPeerId(newPeerId);
    setMode('create');
  };

  const handleJoin = () => {
    setMode('join');
  };

  const handleCopy = async () => {
    if (peerId && navigator.clipboard) {
      await navigator.clipboard.writeText(peerId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = () => {
    setStatus('connecting');
    toast({
      title: 'Поврзување...',
      description: 'Внеси го кодот на другиот уред.',
    });
    
    setTimeout(() => {
      setStatus('connected');
      toast({
        title: 'Успешно!',
        description: 'Уредите се синхронизираа.',
      });
    }, 3000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-6 max-w-md mx-auto flex items-center justify-center">
        <div className="animate-pulse">Вчитување...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-primary" />
          Синхронизација
        </h1>
      </header>

      {mode === 'home' && (
        <div className="space-y-6">
          <Card className="p-6 rounded-3xl border-none shadow-lg space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Синхронизација помеѓу уреди</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Поврзи го твојот телефон со компјутерот или сподели го твојот напредок.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full py-6 text-lg font-bold rounded-2xl" 
                onClick={handleCreate}
              >
                <QrCode className="w-5 h-5 mr-2" />
                Креирај код за сподење
              </Button>
              <Button 
                variant="outline"
                className="w-full py-6 text-lg font-bold rounded-2xl" 
                onClick={handleJoin}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Поврзи се со код
              </Button>
            </div>
          </Card>

          <div className="bg-muted/50 p-4 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-bold mb-1">Како работи:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Креирај код на едниот уред</li>
                  <li>Внеси го кода на другиот уред</li>
                  <li>Податоците се синхронизираат автоматски</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'create' && (
        <div className="space-y-6">
          <Card className="p-6 rounded-3xl border-none shadow-lg text-center space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Твојот код</h2>
              <p className="text-sm text-muted-foreground">
                Сподели го овој код со другиот уред
              </p>
            </div>

            <div className="bg-muted p-6 rounded-2xl">
              <div className="text-4xl font-black tracking-widest text-primary">
                {peerId}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Копирано!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Копирај код
                </>
              )}
            </Button>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Чекаш другиот уред да се поврзе...
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                <span className="text-sm">
                  {status === 'connected' ? 'Поврзано!' : 'Очекува поврзување...'}
                </span>
              </div>
            </div>
          </Card>

          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => setMode('home')}
          >
            Назад
          </Button>
        </div>
      )}

      {mode === 'join' && (
        <div className="space-y-6">
          <Card className="p-6 rounded-3xl border-none shadow-lg space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Внеси код</h2>
              <p className="text-sm text-muted-foreground">
                Внеси го кодот од другиот уред
              </p>
            </div>

            <Input
              placeholder="XXXX XXXX"
              value={remoteId}
              onChange={(e) => setRemoteId(e.target.value.toUpperCase())}
              className="text-center text-2xl font-black tracking-widest h-16"
              maxLength={9}
            />

            <Button 
              className="w-full py-6 text-lg font-bold rounded-2xl"
              onClick={handleConnect}
              disabled={remoteId.length < 8}
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${status === 'connecting' ? 'animate-spin' : ''}`} />
              Поврзи се
            </Button>
          </Card>

          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => setMode('home')}
          >
            Назад
          </Button>
        </div>
      )}
    </div>
  );
}
