
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
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [sessionSize, setSessionSize] = useState(10);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    storage.getSettings().then(settings => {
      setSessionSize(settings.sessionSize);
    });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSaveSize = (val: string) => {
    const size = parseInt(val);
    setSessionSize(size);
    storage.saveSettings({ sessionSize: size });
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

  const handleClearData = () => {
    if (confirm('Дали сте сигурни дека сакате да ги избришете сите податоци? Оваа акција е неповратна.')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-6 max-w-md mx-auto font-body flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
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
                <Link href="#" className="p-2 bg-secondary/30 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link href="#" className="p-2 bg-secondary/30 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link href="#" className="p-2 bg-secondary/30 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </Link>
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
          <Button 
            variant="destructive" 
            className="w-full py-6 rounded-2xl font-bold shadow-lg"
            onClick={handleClearData}
          >
            <Trash2 className="w-5 h-5 mr-2" />
            ИЗБРИШИ СИ ПОДАТОЦИ
          </Button>
        </section>
      </div>

      <div className="mt-12 text-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] pb-6">
        DeutschFlash v1.4.0 • Made by И.Н.
      </div>
    </div>
  );
}
