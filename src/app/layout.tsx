import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'DeutschFlash - Паметно учење германски (SM-2)',
    template: '%s | DeutschFlash',
  },
  description: 'Бесплатна платформа за учење германски јазик со SM-2 алгоритам. Научи германски брзо и ефикасно преку интерактивни вежби, дијалози и приказни.',
  keywords: ['германски јазик', 'учење германски', 'вокабулар', 'македонски германски', 'DeutschFlash', 'SM-2 алгоритам', 'германски зборови', 'курсеви германски', 'јазичен курс', 'германски онлајн'],
  authors: [{ name: 'И.Н.' }],
  creator: 'И.Н.',
  publisher: 'DeutschFlash',
  metadataBase: new URL('https://www.deutschflash.mk'),
  alternates: {
    canonical: '/',
    languages: {
      'mk': '/mk',
      'de': '/de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'mk_MK',
    alternateLocale: 'de_DE',
    url: 'https://www.deutschflash.mk',
    siteName: 'DeutschFlash',
    title: 'DeutschFlash - Паметно учење германски',
    description: 'Бесплатна платформа за учење германски јазик со SM-2 алгоритам за долготрајно паметење.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DeutschFlash - Германски јазик',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeutschFlash - Паметно учење германски',
    description: 'Бесплатна платформа за учење германски јазик со SM-2.',
    images: ['/og-image.png'],
    creator: '@deutschflash',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#139443" />
      </head>
      <body className={`${inter.variable} font-body antialiased selection:bg-accent selection:text-accent-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
