'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

interface JournalEntry {
  id: string;
  date: string;
  memo?: string;
  lines: { id: string; account: { name: string }; debit: number; credit: number }[];
}

export default function JournalEntries() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJournalEntries() {
      try {
        const res = await fetch('/api/journal-entries');
        if (!res.ok) throw new Error('Failed to fetch journal entries');
        const data = await res.json();
        setJournalEntries(data);
      } catch (err) {
        setError('Error fetching journal entries');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJournalEntries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/journal-entries/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      setJournalEntries(journalEntries.filter(entry => entry.id !== id));
      setDeleteId(null);
    } catch (err) {
      setError('Error deleting journal entry: ' + (err instanceof Error ? err.message : 'Unknown error'));
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Journal Entries
          <Link href="/journal-entries/new">
            <Button>Create Journal Entry</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {journalEntries.length === 0 ? (
          <p className="text-gray-600">No journal entries found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Memo</TableHead>
                <TableHead>Lines</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journalEntries.map(entry => (
                <TableRow key={entry.id} className="hover:bg-gray-50">
                  <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.memo || '-'}</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4">
                      {entry.lines.map(line => (
                        <li key={line.id}>
                          {line.account.name}: Debit {line.debit}, Credit {line.credit}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(entry.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the journal entry and its lines.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}