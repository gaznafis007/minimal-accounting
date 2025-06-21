import { z } from 'zod';

// Schema for Account creation/update
export const accountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  type: z.enum(['Asset', 'Liability', 'Equity', 'Expense', 'Revenue'], {
    errorMap: () => ({ message: 'Invalid account type' }),
  }),
});

// Schema for Journal Entry creation
export const journalEntrySchema = z.object({
  date: z.string().datetime({ message: 'Invalid date format' }),
  memo: z.string().max(500, 'Memo is too long').optional(),
  lines: z
    .array(
      z.object({
        accountId: z.string().min(1, 'Account ID is required'),
        debit: z.number().nonnegative('Debit must be non-negative'),
        credit: z.number().nonnegative('Credit must be non-negative'),
      })
    )
    .min(2, 'At least two lines are required'),
}).refine(
  (data) => {
    const totalDebit = data.lines.reduce((sum, line) => sum + line.debit, 0);
    const totalCredit = data.lines.reduce((sum, line) => sum + line.credit, 0);
    return totalDebit === totalCredit;
  },
  { message: 'Total debit must equal total credit' }
);