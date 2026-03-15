"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад кон почетна
          </Button>
        </Link>

        <h1 className="text-3xl font-black text-foreground mb-8">Политика за Приватност</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">Последна ажурирање: 14 Март 2026</p>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Вовед</h2>
            <p>
              DeutschFlash ( &quot;ние&quot;, &quot;нас&quot; или &quot;апликацијата&quot; ) го почитува вашиот приватност. 
              Оваа Политика за Приватност објаснува како собираме, користиме, откриваме и ги заштитуваме 
              вашите податоци кога ја користите нашата апликација.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Податоци кои ги собираме</h2>
            <p className="font-semibold text-foreground mb-2">2.1 Податоци што ги давате вие:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Вокабулар и прогрес (зборови, преводи, резултати)</li>
              <li>Статистика за учење (streak, XP, завршени сесии)</li>
              <li>Поставки и преференции (тема, дневна цел)</li>
            </ul>
            
            <p className="font-semibold text-foreground mt-4 mb-2">2.2 Автоматски собирани податоци:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Анонимизирани податоци за користење (преку Google Analytics 4, само ако се согласите)</li>
              <li>Информации за уред (тип, оперативен систем)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Како ги користиме податоците</h2>
            <p>Вашите податоци ги користиме за:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Да ви овозможиме учење со SM-2 алгоритам</li>
              <li>Да го следиме вашиот прогрес и статистика</li>
              <li>Да ја подобриме апликацијата (преку GA4, само со согласност)</li>
              <li>Да ви обезбедиме офлајн функционалност</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Складирање на податоци</h2>
            <p>
              Сите ваши податоци се складираат локално на вашиот уред преку IndexedDB. 
              Ние не ги чуваме вашите податоци на надворешни сервери, освен анонимизираните 
              аналитички податоци (ако сте даделе согласност за GA4).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Колчиња и Трети Лица</h2>
            <p>
              Ние не ги продаваме, разменуваме или пренесуваме вашите лични податоци на трети страни, 
              освен кога тоа е побарано од законот или потребно за функционирање на апликацијата.
            </p>
            <p className="mt-2">
              <strong>Google Analytics 4:</strong> Ако се согласите на колчиња, GA4 може да собира 
              анонимизирани податоци за користење на апликацијата. Овие податоци се чуваат од Google 
              според нивната политика за приватност.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">6. Вашите Права</h2>
            <p>Имате право да:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Ги избришете сите ваши податоци од апликацијата (преку поставките)</li>
              <li>Ги извезете вашите податоци</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">7. Детски Приватност</h2>
            <p>
              Нашата апликација не е наменета за лица под 13 години. Ние намерно не собираме 
              лични податоци од деца.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">8. Промени во Политиката</h2>
            <p>
              Може да ја ажурираме оваа Политика за Приватност во кое било време. 
              За сите промени ќе ве известиме преку апликацијата.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">9. Контакт</h2>
            <p>
              Ако имате прашања за оваа Политика за Приватност, контактирајте нè на:{' '}
              <a href="mailto:contact@deutschflash.mk" className="text-primary hover:underline">
                contact@deutschflash.mk
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
