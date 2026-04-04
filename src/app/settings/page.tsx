
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { 
  ArrowLeft, 
  Trash2, 
  Check, 
  Globe, 
  Facebook, 
  Instagram, 
  Twitter, 
  Heart, 
  Download, 
  Upload, 
  ShieldCheck,
  Moon,
  Sun,
  Sparkles,
  Volume2,
  Settings2,
  Music
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { VocabularyWord, UserStats, Settings } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [sessionSize, setSessionSize] = useState(10);
  const [algorithm, setAlgorithm] = useState<'sm2' | 'fsrs'>('sm2');
  const [voiceSpeed, setVoiceSpeed] = useState(0.9);
  const [voicePitch, setVoicePitch] = useState(1.0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    storage.getSettings().then(s => {
      setSessionSize(s.sessionSize || 10);
      setAlgorithm(s.algorithm || 'sm2');
      setVoiceSpeed(s.voiceSpeed || 0.9);
      setVoicePitch(s.voicePitch || 1.0);
      setAutoPlay(s.autoPlay !== undefined ? s.autoPlay : true);
    });
    storage.getStats().then(setStats);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSaveSize = async (value: string) => {
    const size = parseInt(value);
    setSessionSize(size);
    const currentSettings = await storage.getSettings();
    await storage.saveSettings({ ...currentSettings, sessionSize: size });
  };

  const handleSaveAlgorithm = async (value: 'sm2' | 'fsrs') => {
    setAlgorithm(value);
    const currentSettings = await storage.getSettings();
    await storage.saveSettings({ ...currentSettings, algorithm: value });
    toast({
      title: "Алгоритмот е променет",
      description: `Сега користите ${value.toUpperCase()} за учење.`,
    });
  };

  const handleUpdateAudio = async (updates: Partial<Settings>) => {
    const currentSettings = await storage.getSettings();
    const newSettings = { ...currentSettings, ...updates };
    await storage.saveSettings(newSettings);
    
    if (updates.voiceSpeed !== undefined) setVoiceSpeed(updates.voiceSpeed);
    if (updates.voicePitch !== undefined) setVoicePitch(updates.voicePitch);
    if (updates.autoPlay !== undefined) setAutoPlay(updates.autoPlay);
  };

  const handleExport = () => {
    storage.exportFullBackup();
    toast({
      title: "Бакап успешен",
      description: "Твоите податоци се преземени како JSON фајл.",
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const success = await storage.importFullBackup(content);
      if (success) {
        toast({
          title: "Успешен увоз",
          description: "Податоците се успешно вчитани. Апликацијата ќе се освежи.",
        });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast({
          variant: "destructive",
          title: "Грешка при увоз",
          description: "Невалиден JSON формат.",
        });
      }
    };
    reader.readAsText(file);
  };

  const executeClearData = async () => {
    localStorage.clear();
    const DB_NAME = 'deutschflash-db';
    const DB_DELETE_REQ = indexedDB.deleteDatabase(DB_NAME);
    
    DB_DELETE_REQ.onsuccess = () => {
      window.location.href = '/';
    };
    DB_DELETE_REQ.onerror = () => {
      window.location.href = '/';
    };
    DB_DELETE_REQ.onblocked = () => {
      window.location.href = '/';
    };
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Назад">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Подесувања</h1>
      </header>

      <div className="space-y-8 flex-1">
        {/* Theme Toggle */}
        <section className="bg-card p-6 rounded-3xl shadow-sm border border-accent/10">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            {theme === 'light' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-400" />}
            Изглед (Тема)
          </h2>
          <Button 
            variant="outline" 
            className="w-full py-8 rounded-2xl font-bold text-lg border-2"
            onClick={toggleTheme}
          >
            {theme === 'light' ? 'ПРЕФРЛИ НА ТЕМНА' : 'ПРЕФРЛИ НА СВЕТЛА'}
          </Button>
        </section>

        <section className="bg-card p-6 rounded-3xl shadow-sm border border-accent/10">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Управување со податоци
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="w-full py-6 rounded-xl font-bold border-2" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              ЕКСПОРТ (Бекап)
            </Button>
            <Button variant="outline" className="w-full py-6 rounded-xl font-bold border-2" onClick={handleImportClick}>
              <Upload className="w-4 h-4 mr-2" />
              ИМПОРТ (Вчитај)
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".json" 
              onChange={handleFileChange}
            />
          </div>
        </section>
        <section className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-6 rounded-3xl border border-amber-500/20 shadow-sm relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Статус на профил</h2>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{stats?.isPremium ? 'Premium (Active)' : 'Free Tier'}</p>
              </div>
            </div>
            {!stats?.isPremium && (
               <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-[10px] uppercase h-8 px-4">
                Upgrade
              </Button>
            )}
          </div>
        </section>

        <section className="bg-card p-6 rounded-3xl shadow-sm border border-accent/10">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary" />
            Аудио и Глас
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-bold text-sm">Автоматско пуштање</Label>
                <div className="text-[10px] text-muted-foreground">Пушти изговор при секое вртење</div>
              </div>
              <Switch 
                checked={autoPlay} 
                onCheckedChange={(val) => handleUpdateAudio({ autoPlay: val })}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold flex items-center gap-2">
                  Брзина на зборување
                  <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{voiceSpeed.toFixed(1)}x</span>
                </span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="1.5" 
                step="0.1" 
                value={voiceSpeed}
                onChange={(e) => handleUpdateAudio({ voiceSpeed: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[8px] font-black text-muted-foreground uppercase tracking-widest px-1">
                <span>Бавно</span>
                <span>Нормално</span>
                <span>Брзо</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold flex items-center gap-2">
                  Висина на гласот (Pitch)
                  <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{voicePitch.toFixed(1)}</span>
                </span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="1.5" 
                step="0.1" 
                value={voicePitch}
                onChange={(e) => handleUpdateAudio({ voicePitch: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[8px] font-black text-muted-foreground uppercase tracking-widest px-1">
                <span>Длабоко</span>
                <span>Природно</span>
                <span>Високо</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card p-6 rounded-3xl shadow-sm border border-accent/10">
          <h2 className="text-lg font-bold mb-4">Експериментални опции</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl">
              <div>
                <div className="font-bold text-sm">Паметен Алгоритам</div>
                <div className="text-[10px] text-muted-foreground">SM-2 (класичен) или FSRS (напреден)</div>
              </div>
              <div className="flex border border-accent/10 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => handleSaveAlgorithm('sm2')}
                  className={cn("px-4 py-2 text-xs font-bold transition-all", algorithm === 'sm2' ? "bg-primary text-white" : "bg-card text-muted-foreground hover:bg-muted/50")}
                >
                  SM-2
                </button>
                <button 
                  onClick={() => handleSaveAlgorithm('fsrs')}
                  className={cn("px-4 py-2 text-xs font-bold transition-all", algorithm === 'fsrs' ? "bg-primary text-white" : "bg-card text-muted-foreground hover:bg-muted/50")}
                >
                  FSRS
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card p-6 rounded-3xl shadow-sm border border-accent/10">
          <h2 className="text-lg font-bold mb-6">Големина на сесија</h2>
          <RadioGroup 
            value={sessionSize.toString()} 
            onValueChange={handleSaveSize}
            className="grid grid-cols-2 gap-4"
          >
            {[5, 10, 15, 20].map(size => (
              <div key={size}>
                <RadioGroupItem
                  value={size.toString()}
                  id={`size-${size}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`size-${size}`}
                  className="flex items-center justify-between p-4 bg-muted/30 border border-transparent rounded-xl cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                >
                  <span className="font-bold text-lg">{size}</span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">зборови</span>
                  {sessionSize === size && <Check className="w-4 h-4 text-primary" />}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>

        <section className="bg-card p-6 rounded-3xl shadow-sm border border-accent/10">
          <h2 className="text-lg font-bold mb-4">За DeutschFlash</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <div className="text-sm font-bold">www.deutschflash.mk</div>
            </div>
            <p className="text-xs text-muted-foreground">
              DeutschFlash користи математички SM-2 алгоритам за оптимизирано учење.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-card-foreground">Следете нè</span>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61582273304437" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/30 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Facebook className="w-5 h-5 fill-current" />
                </a>
                <a 
                  href="https://www.tiktok.com/@naucijaziksonas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/30 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Music className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card p-6 rounded-3xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Heart className="w-5 h-5 fill-current" />
            <h2 className="text-lg font-bold">Кредити</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Платформата е изработена од <strong>И.Н.</strong>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-destructive">Опасна зона</h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="w-full py-6 rounded-2xl font-bold shadow-lg"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                ИЗБРИШИ СИ ПОДАТОЦИ
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Дали сте сигурни?</AlertDialogTitle>
                <AlertDialogDescription>
                  Оваа акција е неповратна. Сите ваши податоци, статистика и вокабулар ќе бидат засекогаш избришани од овој уред.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>ОТКАЖИ</AlertDialogCancel>
                <AlertDialogAction onClick={executeClearData} className="bg-destructive hover:bg-destructive/90">
                  ДА, ИЗБРИШИ СЀ
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>

      <div className="mt-12 text-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] pb-6">
        DeutschFlash v1.4.0 • Made by И.Н.
      </div>
    </div>
  );
}
