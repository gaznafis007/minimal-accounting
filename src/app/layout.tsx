import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MinimalAccounting',
  description: 'A minimal accounting system for managing accounts and journal entries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} 'min-h-screen bg-gray-100`}>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-64">
            <div className="p-6 max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}