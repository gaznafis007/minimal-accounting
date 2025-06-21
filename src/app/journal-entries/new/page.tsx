import JournalEntry from '@/components/JournalEntry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewJournalEntry() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Journal Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <JournalEntry />
      </CardContent>
    </Card>
  );
}