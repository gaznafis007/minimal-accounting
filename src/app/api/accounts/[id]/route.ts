import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { accountSchema } from '@/lib/validation';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = accountSchema.parse(body);

    const account = await prisma.account.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(account);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if account is referenced in JournalEntryLine
    const journalEntryLine = await prisma.journalEntryLine.findFirst({
      where: { accountId: params.id },
    });

    if (journalEntryLine) {
      return NextResponse.json({ error: 'Cannot delete account used in journal entries' }, { status: 400 });
    }

    const deletedAccount = await prisma.account.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedAccount);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}