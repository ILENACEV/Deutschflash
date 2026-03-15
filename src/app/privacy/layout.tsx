import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика за Приватност | DeutschFlash',
  description: 'Политика за приватност на DeutschFlash - како ги собираме и користиме вашите податоци.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
