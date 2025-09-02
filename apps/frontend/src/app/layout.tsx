import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from '@/core/providers/Provider';
import { Toaster } from '@/shared/primitives/sonner';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Loyal Code',
  description: 'Loyal code test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider>
          <main>{children}</main>
        </Provider>
        <Toaster position={'top-right'} richColors={true} />
      </body>
    </html>
  );
}
