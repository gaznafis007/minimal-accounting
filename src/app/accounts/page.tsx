import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Account = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

async function fetchAccounts(): Promise<Account[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accounts`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch accounts');
  }
  return response.json();
}

export default async function Accounts() {
  const accounts = await fetchAccounts();

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Chart of Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No accounts found
                </TableCell>
              </TableRow>
            ) : (
              accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell>{new Date(account.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}