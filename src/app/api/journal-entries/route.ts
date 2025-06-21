import { NextResponse } from 'next/server';

import { journalEntrySchema } from '@/lib/validation';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const journalEntries = await prisma.journalEntry.findMany({
      include: {
        lines: {
          include: {
            account: {
              select: { name: true },
            },
          },
        },
      },
    });
    return NextResponse.json(journalEntries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch journal entries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = journalEntrySchema.parse(body);

    const journalEntry = await prisma.journalEntry.create({
      data: {
        date: new Date(validatedData.date),
        memo: validatedData.memo,
        lines: {
          create: validatedData.lines.map(line => ({
            accountId: line.accountId,
            debit: line.debit,
            credit: line.credit,
          })),
        },
      },
      include: { lines: true },
    });

    return NextResponse.json(journalEntry, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create journal entry' }, { status: 500 });
  }
}