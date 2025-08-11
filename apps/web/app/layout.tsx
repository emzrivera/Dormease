import './globals.css'
import 'tailwindcss';
import type { Metadata } from 'next'
import { Figtree, Montserrat } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dormease',
  description: 'Search and manage dorms effortlessly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
