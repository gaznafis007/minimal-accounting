import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type JournalEntry = {
  id: string;
  date: string;
  memo?: string;
  lines: { account: { name: string }; debit: number; credit: number }[];
  createdAt: string;
};

async function fetchJournalEntries(): Promise<JournalEntry[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/journal-entries`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch journal entries');
  }
  return response.json();
}

export default async function JournalEntries() {
  const journalEntries = await fetchJournalEntries();

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Journal Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Memo</TableHead>
              <TableHead>Lines</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No journal entries found
                </TableCell>
              </TableRow>
            ) : (
              journalEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.memo || '-'}</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4">
                      {entry.lines.map((line, index) => (
                        <li key={index}>
                          {line.account.name}: Debit {line.debit.toFixed(2)}, Credit {line.credit.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}