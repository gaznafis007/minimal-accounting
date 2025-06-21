'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';

type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Expense' | 'Revenue';

export default function AccountForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type }),
      });
      console.log(response);
      toast.success('Account created successfully');
      // if (response.ok) {
      //   toast.success('Account created successfully');
      //   setName('');
      //   setType('');
      // } else {
      //   toast.error('Failed to create account');
      // }
    } catch (error) {
        console.log(error)
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <label className="block text-sm font-medium">Account Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter account name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Account Type</label>
        <Select value={type} onValueChange={(value) => setType(value as AccountType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            {['Asset', 'Liability', 'Equity', 'Expense', 'Revenue'].map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Create Account</Button>
    </form>
  );
}