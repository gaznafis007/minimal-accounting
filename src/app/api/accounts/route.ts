import { NextResponse } from 'next/server';
import { accountSchema } from '@/lib/validation';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const accounts = await prisma.account.findMany();
    return NextResponse.json(accounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = accountSchema.parse(body);

    const account = await prisma.account.create({
      data: validatedData,
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}