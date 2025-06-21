'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Menu, DollarSign, FileText, List, X, Home } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    {
        href: '/',
        label: 'Home',
        icon: Home,
    },
    {
      href: '/accounts/new',
      label: 'Create Account',
      icon: DollarSign,
    },
    {
      href: '/journal-entries/new',
      label: 'Create Journal Entry',
      icon: FileText,
    },
    {
      href: '/accounts',
      label: 'View Accounts',
      icon: List,
    },
    {
      href: '/journal-entries',
      label: 'View Journal Entries',
      icon: List,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        className={`md:hidden fixed top-4 left-4 z-50 bg-white shadow-md rounded-full p-2 transition-transform duration-300 ${isOpen && 'rotate-90'}`}
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5 text-indigo-600" /> : <Menu className="h-5 w-5 text-indigo-600" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'w-64 bg-gradient-to-b from-indigo-600 to-blue-500 text-white shadow-xl fixed h-full transition-transform duration-500 ease-in-out z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static'
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl text-center font-bold animate-fade-in">MinimalAccounting</h1>
        </div>
        <nav className="mt-4 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/20 hover:text-white transition-transform duration-200 transform hover:scale-105 animate-slide-in"
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}