import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to MinimalAccounting</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            This is a minimal accounting system to manage your chart of accounts and journal entries.
            Use the sidebar to create new accounts, add journal entries, or view existing records.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}