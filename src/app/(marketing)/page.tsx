"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const currentYear = new Date().getFullYear();
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  WifiOff, 
  Flag, 
  Sparkles, 
  Volume2, 
  BookOpen,
  GitBranch, 
  Grid3X3, 
  MessageSquare,
  Plane,
  GraduationCap,
  ArrowRight,
  Check,
  Menu,
  X,
  Trophy,
  Flame,
  Users,
  ChevronRight,
  BookMarked
} from 'lucide-react';

const MODULES = [
  { name: 'Goethe Тест', icon: '🎓', desc: 'A1/A2/B1 сертификат', href: '/goethe', color: 'bg-green-600', badge: 'Топ' },
  { name: 'German Test', icon: '🔥', desc: 'Вирален тест', href: '/test', color: 'bg-orange-500', badge: 'Популарно' },
  { name: 'VocaSwipe', icon: '🃏', desc: 'Swipe картички', href: '/dashboard', color: 'bg-green-500' },
  { name: 'ГерманскиСпелувач', icon: '✍️', desc: 'Правопис', href: '/spelling', color: 'bg-blue-500' },
  { name: 'Слухо-Профи', icon: '👂', desc: 'Слушање', href: '/listening', color: 'bg-purple-500' },
  { name: 'Story Mode', icon: '📖', desc: 'Приказни', href: '/stories', color: 'bg-amber-500' },
  { name: 'Падежен Мајстор', icon: '📐', desc: 'Граматика', href: '/cases', color: 'bg-red-500' },
  { name: 'Глаголски Мајстор', icon: '🔄', desc: 'Глаголи', href: '/verbs', color: 'bg-indigo-500' },
  { name: 'DeutschWordle', icon: '🟩', desc: 'Игра', href: '/wordle', color: 'bg-green-600' },
  { name: 'Дијалози', icon: '💬', desc: 'Разговори', href: '/dialogs', color: 'bg-pink-500' },
  { name: 'Фрази', icon: '✈️', desc: 'Патување', href: '/phrases', color: 'bg-sky-500' },
  { name: 'Граматички Лекции', icon: '📚', desc: 'Теорија', href: '/lessons', color: 'bg-teal-500' },
];

const TESTIMONIALS = [
  {
    text: "За 2 месеци го положив Goethe A2. DeutschFlash ми помогна со вокабуларот секој ден.",
    name: "Марија К.",
    city: "Скопје",
    initials: "МК"
  },
  {
    text: "Најдоброт алатка за германски што ја користам. Стварно работи!",
    name: "Александар Т.",
    city: "Битола",
    initials: "АТ"
  },
  {
    text: "30 дена streak! Германскит е секој ден. Фајл е што е бесплатен.",
    name: "Никола М.",
    city: "Тетово",
    initials: "НМ"
  }
];

export default function MarketingPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">DeutschFlash</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/goethe" className="text-sm text-green-600 font-bold hover:text-green-700 transition-colors">Тест ниво</Link>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Функции</a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Како работи</a>
              <a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Модули</a>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Блог</Link>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Искуства</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  Почни бесплатно
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Мени"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-4 space-y-3">
              <Link href="/goethe" className="block py-2 text-green-600 font-bold" onClick={() => setMobileMenuOpen(false)}>Тест ниво</Link>
              <a href="#features" className="block py-2 text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Функции</a>
              <a href="#how-it-works" className="block py-2 text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Како работи</a>
              <a href="#modules" className="block py-2 text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Модули</a>
              <Link href="/blog" className="block py-2 text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Блог</Link>
              <a href="#testimonials" className="block py-2 text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Искуства</a>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mt-4">
                  Почни бесплатно
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>100% Бесплатно • Офлајн • Без регистрација</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
              Научи германски за <br className="hidden sm:block" />
              <span className="text-primary">10 минути на ден</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              DeutschFlash користи научно докажан метод за меморирање. 
              Бесплатно, офлајн, на македонски.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/25">
                  Почни бесплатно
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-2xl">
                  Дознај повеќе
                </Button>
              </Link>
            </div>

            {/* Goethe Test CTA */}
            <Link href="/goethe" className="inline-flex">
              <div className="group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-xl shadow-green-600/25 transition-all duration-300 hover:shadow-2xl hover:shadow-green-600/40 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    🎓
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Тестирај го твоето ниво</div>
                    <div className="text-green-100 text-sm">Goethe A1/A2/B1 сертификат • Бесплатно</div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">МК</div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">АТ</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">НМ</div>
                </div>
                <span>500+ користат</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Average 7 day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>4.9 App Store</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="max-w-sm mx-auto">
              <div className="bg-card rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">VocaSwipe</div>
                      <div className="text-xs text-muted-foreground">SM-2 Алгоритам</div>
                    </div>
                  </div>
                  <div className="bg-background rounded-2xl p-4 mb-4">
                    <div className="text-3xl font-black text-primary mb-2">Apfel</div>
                    <div className="text-muted-foreground">јаболко</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-red-100 dark:bg-red-900/30 rounded-xl py-3 text-center">
                      <div className="text-xs text-muted-foreground">Не го знаев</div>
                    </div>
                    <div className="flex-1 bg-green-100 dark:bg-green-900/30 rounded-xl py-3 text-center">
                      <div className="text-xs text-muted-foreground">Го знаев</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-bold">7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="font-bold">150 XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Зошто DeutschFlash?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Три клучни предности кои го прават најдобриот избор за учење германски.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Паметно меморирање</h3>
              <p className="text-muted-foreground">
                SM-2 алгоритмот знае кога точно да ти го покаже зборот — пред да го заборавиш. 
                Исто како Anki, но подобар UX.
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <WifiOff className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">100% Офлајн</h3>
              <p className="text-muted-foreground">
                Учи во воз, авион, или без интернет. 
                Сите 3000+ зборови се на уредот — не ти треба конекција.
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Flag className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">На Македонски</h3>
              <p className="text-muted-foreground">
                Преводи, примери и интерфејс на македонски — не на англиски.
                Разбираш сè подобро.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Како работи?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Три едноставни чекори до германска fluentност.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Свипај картички</h3>
              <p className="text-muted-foreground">
                Гледаш збор на германски, слушаш изговорот, одлучуваш дали го знаеш.
              </p>
              <div className="hidden md:block absolute top-8 -right-4 text-primary">
                <ChevronRight className="w-8 h-8" />
              </div>
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Алгоритмот учи со тебе</h3>
              <p className="text-muted-foreground">
                SM-2 автоматски одлучува кога повторно да ти го покаже секој збор.
                Повеќе повторување на тешките зборови.
              </p>
              <div className="hidden md:block absolute top-8 -right-4 text-primary">
                <ChevronRight className="w-8 h-8" />
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Напредуваш брзо</h3>
              <p className="text-muted-foreground">
                A1 → A2 → B1. Следи го прогресот со XP, streak и статистика.
                Најди ги тешките зборови во My Mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black">3000+</div>
              <div className="text-primary-foreground/80 text-sm">Зборови</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">10+</div>
              <div className="text-primary-foreground/80 text-sm">Модули</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">100%</div>
              <div className="text-primary-foreground/80 text-sm">Бесплатно</div>
            </div>
          </div>
        </div>
      </section>

      {/* Goethe Test Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            <span>Официјален формат</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Тестирај го твоето ниво
          </h2>
          
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Не знаеш од каде да почнеш? Направи го нашиот Goethe тест и дознај 
            дали си A1, A2 или B1. Бесплатно, за 20 минути.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/goethe">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-white text-green-700 hover:bg-green-50 font-bold rounded-2xl shadow-xl">
                Започни тест сега
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/goethe">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-2xl">
                Дознај повеќе
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-green-100 text-sm">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> 30 прашања
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> 20 минути
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> A1 / A2 / B1
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Бесплатно
            </span>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Сите Модули
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              10+ различни начина за учење — избери што ти одговара.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES.map((mod) => (
              <Link key={mod.name} href={mod.href}>
                <Card className="p-4 h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{mod.icon}</span>
                    {mod.badge && (
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {mod.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{mod.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Што велат корисниците?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.city}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            Спремен да почнеш?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Без регистрација. Без претплата. Почни за 10 секунди.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto px-12 py-6 text-xl bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/25">
              Почни бесплатно
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-foreground">DeutschFlash © {currentYear}</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Апликација</Link>
              <Link href="/words" className="hover:text-foreground transition-colors">Вокабулар</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
