import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DollarSign, FileText, List } from 'lucide-react';

type Stats = {
  accountCount: number;
  journalEntryCount: number;
};

async function fetchStats(): Promise<Stats> {
  try {
    const [accountsRes, journalEntriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accounts`, { cache: 'no-store' }),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries`, { cache: 'no-store' }),
    ]);

    if (!accountsRes.ok || !journalEntriesRes.ok) {
      throw new Error('Failed to fetch stats');
    }

    const accounts = await accountsRes.json();
    const journalEntries = await journalEntriesRes.json();

    return {
      accountCount: accounts.length,
      journalEntryCount: journalEntries.length,
    };
  } catch (error) {
    console.error(error);
    return { accountCount: 0, journalEntryCount: 0 };
  }
}

export default async function Home() {
  const stats = await fetchStats();

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 rounded-lg shadow-lg animate-fade-in">
        <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to MinimalAccounting
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Streamline your financial management with our intuitive system for
            accounts and journal entries.
          </p>
          <Link href="/accounts/new">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 md:grid-cols-3 animate-fade-in-up">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-indigo-600" />
              <CardTitle>Create Accounts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Easily add and manage accounts for Assets, Liabilities, Equity,
              Expenses, and Revenue.
            </p>
            <Link href="/accounts/new">
              <Button variant="link" className="mt-2 p-0">
                Start Now
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-indigo-600" />
              <CardTitle>Create Journal Entries</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Record transactions with multiple lines, ensuring balanced debits
              and credits.
            </p>
            <Link href="/journal-entries/new">
              <Button variant="link" className="mt-2 p-0">
                Start Now
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <List className="h-6 w-6 text-indigo-600" />
              <CardTitle>View Records</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Access your chart of accounts and journal entries with clear,
              organized views.
            </p>
            <Link href="/accounts">
              <Button variant="link" className="mt-2 p-0">
                View Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8 px-6 rounded-lg shadow-md animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center mb-6">
          Your Accounting at a Glance
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-indigo-600">
                {stats.accountCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Total Accounts</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-indigo-600">
                {stats.journalEntryCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Total Journal Entries</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}