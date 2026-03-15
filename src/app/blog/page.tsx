import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Блог | DeutschFlash',
  description: 'Блог за учење германски јазик. Совети, трикови и ресурси за A1, A2 и B1 ниво.',
};

const BLOG_POSTS = [
  {
    slug: '100-germanski-zborovi-za-pocetnici-a1',
    title: '100 Германски зборови за почетници (A1)',
    excerpt: 'Научи ги првите 100 најважни германски зборови. Совршено за почетници.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '10 мин',
  },
  {
    slug: 'germanska-azbuka-izgovor',
    title: 'Германска азбука и изговор - Комплетен водич',
    excerpt: 'Научи како правилно да ги изговараш германските букви. Правилниот изговор е клучен.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '8 мин',
  },
  {
    slug: 'kako-da-nucis-germanski-od-nula',
    title: 'Како да научиш германски од нула',
    excerpt: 'Комплетен водич за германски од почеток. Што ти треба, како да почнеш и како да продолжиш.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '12 мин',
  },
  {
    slug: 'najcesti-germanski-frazi-za-pocetnici',
    title: 'Најчести германски фрази за почетници',
    excerpt: '50 најкористени германски фрази за секојдневна комуникација.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '6 мин',
  },
  {
    slug: 'germanski-broevi-1-100',
    title: 'Германски броеви од 1 до 100',
    excerpt: 'Комплетна листа на германските броеви со изговор и пишување.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '5 мин',
  },
  {
    slug: 'denovi-i-meseci-na-germanski',
    title: 'Денови и месеци на германски',
    excerpt: 'Научи ги деновите и месеците на германски јазик.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '4 мин',
  },
  {
    slug: 'osnovni-germanski-glagoli',
    title: 'Основни германски глаголи што мора да ги знаеш',
    excerpt: '50 најважни германски глаголи за секојдневна употреба.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '7 мин',
  },
  {
    slug: 'kako-se-koristat-der-die-das',
    title: 'Како се користат der, die, das',
    excerpt: 'Објаснување на германските членови. Најголемата пречка за почетници.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '9 мин',
  },
  {
    slug: 'germanski-licni-zamenici',
    title: 'Германски лични заменки - комплетен водич',
    excerpt: 'Научи ги сите германски лични заменки (ich, du, er, sie, wir, ihr).',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '5 мин',
  },
  {
    slug: 'a1-germanski-test-za-pocetnici',
    title: 'A1 германски тест за почетници',
    excerpt: 'Провери го твојот A1 ниво со овој бесплатен тест.',
    category: 'Почетници',
    date: '2026-03-14',
    readTime: '15 мин',
  },
  {
    slug: 'germanski-frazi-za-rabota-vo-germanija',
    title: 'Германски фрази за работа во Германија',
    excerpt: 'Неопходни фрази за работно место во Германија. Bewerbung, Gehalt, Arbeitszeit.',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '8 мин',
  },
  {
    slug: 'germanski-frazi-vo-restoran',
    title: 'Германски фрази во ресторан',
    excerpt: 'Фрази за нарачување во ресторан. Die Speisekarte, bitte.',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '5 мин',
  },
  {
    slug: 'germanski-frazi-za-intervju-za-rabota',
    title: 'Германски фрази на интервју за работа',
    excerpt: 'Подготви се за интервју. Die Bewerbung, Vorstellungsgespräch.',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '7 мин',
  },
  {
    slug: 'germanski-frazi-vo-bolnica',
    title: 'Германски фрази во болница',
    excerpt: 'Важни фрази кај доктор. Ich brauche einen Arzt.',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '6 мин',
  },
  {
    slug: 'germanski-frazi-za-turisti',
    title: 'Германски фрази за туристи',
    excerpt: '20+ фрази за туристи во Германија. Wo ist...?, Wie viel kostet...?',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '5 мин',
  },
  {
    slug: 'kako-da-se-pretstavish-na-germanski',
    title: 'Како да се претставиш на германски',
    excerpt: 'Ich heiße..., Ich bin..., Mein Name ist...',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '4 мин',
  },
  {
    slug: 'germanski-razgovor-vo-prodavnica',
    title: 'Германски разговор во продавница',
    excerpt: 'Разговор кај продавница. Die Kassiererin, das Wechselgeld.',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '5 мин',
  },
  {
    slug: 'germanski-dijalog za-sekojdenevni-situacii',
    title: 'Германски дијалози за секојдневни ситуации',
    excerpt: '10 реални дијалози за секојдневни ситуации.',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '10 мин',
  },
  {
    slug: 'kako-da-narachash-hrana-na-germanski',
    title: 'Како да нарачаш храна на германски',
    excerpt: 'Ich möchte..., Die Rechnung, bitte.',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '6 мин',
  },
  {
    slug: 'germanski-razgovor-na-telefon',
    title: 'Германски разговор на телефон',
    excerpt: 'Како да разговараш на телефон. Am Apparat, Kann ich sprechen mit...?',
    category: 'Практичен',
    date: '2026-03-14',
    readTime: '7 мин',
  },
  {
    slug: 'germanski-padezi-objasnenie',
    title: 'Германски падежи објаснети едноставно',
    excerpt: 'Nominativ, Akkusativ, Dativ, Genitiv - објаснети на македонски.',
    category: 'Граматика',
    date: '2026-03-14',
    readTime: '12 мин',
  },
  {
    slug: 'nominativ-akuzativ-dativ-razliki',
    title: 'Nominativ, Akkusativ и Dativ - Разлики',
    excerpt: 'Кога да го користат секој падеж? Примери и вежби.',
    category: 'Граматика',
    date: '2026-03-14',
    readTime: '10 мин',
  },
  {
    slug: 'redosled-zborovi-vo-germanski-recenici',
    title: 'Редослед на зборови во германски реченици',
    excerpt: 'Основниот редослед: Subjekt + Verb + Objekt.',
    category: 'Граматика',
    date: '2026-03-14',
    readTime: '8 мин',
  },
  {
    slug: 'kako-se-koristat-modalni-glagoli',
    title: 'Како се користат модални глаголи',
    excerpt: 'können, müssen, wollen, sollen, dürfen, mögen.',
    category: 'Граматика',
    date: '2026-03-14',
    readTime: '9 мин',
  },
  {
    slug: 'razdelni-glagoli-vo-germanski',
    title: 'Разделни глаголи во германски (Trennbare Verben)',
    excerpt: 'aufmachen, einkaufen, fernsehen - како работат.',
    category: 'Граматика',
    date: '2026-03-14',
    readTime: '7 мин',
  },
  {
    slug: '100-najceski-germanski-glagoli',
    title: '100 најчести германски глаголи',
    excerpt: 'Листа на 100-те најкористени германски глаголи.',
    category: 'Среден',
    date: '2026-03-14',
    readTime: '15 мин',
  },
  {
    slug: '50-germanski-idiomi',
    title: '50 германски идиоми што Германците ги користат',
    excerpt: 'Идиоми како "Das ist mir Wurst", "Ich habe Hunger".',
    category: 'Среден',
    date: '2026-03-14',
    readTime: '10 мин',
  },
  {
    slug: 'najceski-greški-sh-go-pravat-makedoncite',
    title: 'Најчести грешки што ги прават Македонците во германски',
    excerpt: 'Избегни ги овие чести грешки. Wortstellung, Artikel.',
    category: 'Среден',
    date: '2026-03-14',
    readTime: '8 мин',
  },
  {
    slug: 'kako-da-nauciš-1000-germanski-zborovi-brzо',
    title: 'Како да научиш 1000 германски зборови брзо',
    excerpt: 'Докажани методи за брзо меморирање на зборови.',
    category: 'Среден',
    date: '2026-03-14',
    readTime: '10 мин',
  },
  {
    slug: 'besplaten-germanski-test-a1-b1',
    title: 'Бесплатен германски тест (A1-B1)',
    excerpt: 'Провери го твојот ниво. 50 прашања, итог за 5 минути.',
    category: 'Среден',
    date: '2026-03-14',
    readTime: '10 мин',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      <Link href="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-black text-foreground mb-4">Блог</h1>
        <p className="text-lg text-muted-foreground">
          Совети, трикови и ресурси за учење германски јазик.
        </p>
      </header>

      <div className="grid gap-6">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors bg-card">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} читање</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
