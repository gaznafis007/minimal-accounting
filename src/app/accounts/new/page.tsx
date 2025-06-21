import AccountForm from '@/components/AccountForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewAccount() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Account</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm />
      </CardContent>
    </Card>
  );
}