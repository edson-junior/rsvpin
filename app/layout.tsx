import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getUserBySessionToken } from '@/database/users';
import { getSessionToken } from '@/lib/auth';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RSVPin',
  description: 'Create events that inspire people.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionToken = await getSessionToken();
  const user = sessionToken
    ? await getUserBySessionToken(sessionToken)
    : undefined;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header
          user={user ? { name: user.name, username: user.username } : undefined}
        />
        {children}
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
