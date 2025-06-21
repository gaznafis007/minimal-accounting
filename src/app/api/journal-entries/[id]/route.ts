import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { journalEntrySchema } from '@/lib/validation';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = journalEntrySchema.parse(body);

    const journalEntry = await prisma.journalEntry.update({
      where: { id: params.id },
      data: {
        date: new Date(validatedData.date),
        memo: validatedData.memo,
        lines: {
          deleteMany: {}, // Clear existing lines
          create: validatedData.lines.map(line => ({
            accountId: line.accountId,
            debit: line.debit,
            credit: line.credit,
          })),
        },
      },
      include: { lines: true },
    });

    return NextResponse.json(journalEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Journal entry not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update journal entry' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deletedJournalEntry = await prisma.journalEntry.delete({
      where: { id: params.id },
      include: { lines: true },
    });

    return NextResponse.json(deletedJournalEntry);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Journal entry not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete journal entry' }, { status: 500 });
  }
}