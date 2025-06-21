import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Minimal Accounting',
  description: 'A minimal accounting system for managing accounts and journal entries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen')}>
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-indigo-600">
                MinimalAccounting
              </h1>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-gray-200">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-64 animate-fade-in">
            <div className="p-6 max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}