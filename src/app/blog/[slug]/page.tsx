import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

const BLOG_CONTENT: Record<string, { title: string; content: string; category: string }> = {
  '100-germanski-zborovi-za-pocetnici-a1': {
    title: '100 Германски зборови за почетници (A1)',
    category: 'Почетници',
    content: `
## Вовед

Ако почнуваш да го учиш германскиот, овој чланак е перфектен почеток. Овде ќе најдеш 100-те најважни зборови за A1 ниво.

## Основни зборови

### Семејство
- die Familie = семејство
- die Mutter = мајка
- der Vater = татко
- das Kind = дете
- die Schwester = сестра
- der Bruder = брат

### Боја
- rot = црвен
- blau = плав
- grün = зелен
- gelb = жолт
- schwarz = црн
- weiß = бел

### Броеви
- eins = еден
- zwei = два
- drei = три
- vier = четири
- fünf = пет

### Глаголи
- sein = да биде
- haben = да има
- machen = да направи
- gehen = да оди
- kommen = да дојде
- sehen = да види

## Заклучок

Овие зборови се основа за секој кој почнува да го учиш германскиот. Вежбувај ги секој ден и ќе видиш подобрување!

**[Почни да ги учиш со DeutschFlash →](/session)**
    `,
  },
  'kako-da-nucis-germanski-od-nula': {
    title: 'Како да научиш германски од нула',
    category: 'Почетници',
    content: `
## Вовед

Учењето германски од нула може да биде предизвикувачки, но со правилниот пристап можеш да го научиш брзо отколку што мислиш.

## Чекор 1: Постави јасна цел

Пред да почнеш, одлучи зошто го учиш германскиот:
- За работа во Германија?
- За студиирање?
- За лични причини?

## Чекор 2: Користи квалитетни материјали

- DeutschFlash - за интерактивно учење
- YouTube канали
- Книги за A1 ниво

## Чекор 3: Вежбувај секој ден

Најдобриот начин да научиш јазик е секојдневна практика. Чак и 15 минути на ден прават разлика.

## Чекор 4: Говори

Најди некого да зборуваш. Може онлајн или локално.

## Чекор 5: Немој да се откажеш

Ќе имаш лоши денови. Немој да се предадеш!

**[Почни да го учиш германскиот бесплатно →](/session)**
    `,
  },
  'kako-se-koristat-der-die-das': {
    title: 'Како се користат der, die, das',
    category: 'Почетници',
    content: `
## Вовед

Една од најголемите пречки за Македонците кога го учат германскиот е разбирањето кога да се користат der, die, das.

## Основно правило

Во германскиот, секој именка има еден од трите членови:
- **der** = машки род
- **die** = женски род
- **das** = среден род

## Како да го знаеш родот?

### 1. Запамети ги кратките зборови
- der Mann = човек
- die Frau = жена
- das Kind = дете

### 2. Користи трик со "die"
Зборовите што завршуваат на -ung, -heit, -schaft, -tion се секогаш die.

### 3. Користи трик со "das"
Зборовите што завршуваат на -chen, -lein, -um се секогаш das.

## Таблица

| Машки | Женски | Среден |
|-------|--------|--------|
| der | die | das |
| Mann | Frau | Kind |
| Vater | Mutter | Haus |

## Вежби

Најдобриот начин да го научиш ова е преку вежби и повторување.

**[Вежбувај со DeutschFlash →](/session)**
    `,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_CONTENT[slug];
  
  if (!post) {
    return {
      title: 'Блог | DeutschFlash',
    };
  }

  return {
    title: `${post.title} | DeutschFlash`,
    description: `Научи ${post.title.toLowerCase()} со DeutschFlash - бесплатна платформа за учење германски.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_CONTENT[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад кон блогот
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Постот не е пронајден</h1>
        <p className="text-muted-foreground mt-4">Овој пост уште не постои.</p>
      </div>
    );
  }

  const paragraphs = post.content.trim().split('\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад кон блогот
        </Button>
      </Link>

      <article>
        <header className="mb-8">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium text-sm">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-4 mb-4">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {paragraphs.map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- ')) {
              return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
            }
            if (paragraph.startsWith('|')) {
              return null;
            }
            if (paragraph.includes('→')) {
              return (
                <p key={index} className="mt-6">
                  <Link href={paragraph.split('→')[1]?.trim() || '/'} className="text-primary hover:underline font-medium">
                    {paragraph}
                  </Link>
                </p>
              );
            }
            return <p key={index} className="mb-4 text-muted-foreground leading-relaxed">{paragraph}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
