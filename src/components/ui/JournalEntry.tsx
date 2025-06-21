import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';

type LineItem = {
  accountId: string;
  debit: number;
  credit: number;
};

export default function JournalEntry() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [memo, setMemo] = useState('');
  const [lines, setLines] = useState<LineItem[]>([{ accountId: '', debit: 0, credit: 0 }]);
  const [accounts, setAccounts] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch('/api/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data));
  }, []);

  const addLine = () => {
    setLines([...lines, { accountId: '', debit: 0, credit: 0 }]);
  };

  const updateLine = (index: number, field: keyof LineItem, value: string | number) => {
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], [field]: value };
    setLines(newLines);
  };

  const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/journal-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date(date).toISOString(),
          memo,
          lines,
        }),
      });

      if (response.ok) {
        toast.success('Journal entry created successfully');
        setLines([{ accountId: '', debit: 0, credit: 0 }]);
        setMemo('');
        setDate(new Date().toISOString().split('T')[0]);
      } else {
        toast.error('Failed to create journal entry');
      }
    } catch (error) {
        console.log(error)
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div>
        <label className="block text-sm font-medium">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Memo</label>
        <Input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Enter memo (optional)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Journal Entry Lines</label>
        <div className="space-y-2">
          {lines.map((line, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <Select
                value={line.accountId}
                onValueChange={(value) => updateLine(index, 'accountId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Debit"
                value={line.debit || ''}
                onChange={(e) => updateLine(index, 'debit', Number(e.target.value))}
              />
              <Input
                type="number"
                placeholder="Credit"
                value={line.credit || ''}
                onChange={(e) => updateLine(index, 'credit', Number(e.target.value))}
              />
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addLine} className="mt-2">
          Add Line
        </Button>
      </div>
      <div className="flex justify-between">
        <p>Total Debit: {totalDebit.toFixed(2)}</p>
        <p>Total Credit: {totalCredit.toFixed(2)}</p>
      </div>
      <Button type="submit" disabled={totalDebit !== totalCredit}>
        Submit Journal Entry
      </Button>
    </form>
  );
}