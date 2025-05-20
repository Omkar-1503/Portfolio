import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SmoothScrollProvider } from '@/providers/smooth-scroll-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'A showcase of my work and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrollProvider>
          {children}
          <Toaster position="top-right" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
