'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'w-64 bg-white shadow-md fixed h-full transition-transform duration-300 ease-in-out z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static'
        )}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">MinimalAccounting</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/accounts/new">
                <Button variant="ghost" className="w-full justify-start">
                  Create Account
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/journal-entries/new">
                <Button variant="ghost" className="w-full justify-start">
                  Create Journal Entry
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/accounts">
                <Button variant="ghost" className="w-full justify-start">
                  View Accounts
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/journal-entries">
                <Button variant="ghost" className="w-full justify-start">
                  View Journal Entries
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}