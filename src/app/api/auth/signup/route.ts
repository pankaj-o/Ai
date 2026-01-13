import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/games/qa/db';
import { SignupSchema, COLLECTIONS } from '@/lib/auth/models';
import { createSession } from '@/lib/auth/session';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = SignupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { email, password, name } = validationResult.data;

    const db = await getDb();

    // Check if user already exists
    const existingUser = await db
      .collection(COLLECTIONS.USERS)
      .findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const now = new Date();
    const result = await db.collection(COLLECTIONS.USERS).insertOne({
      email: email.toLowerCase(),
      passwordHash,
      name,
      createdAt: now,
      updatedAt: now,
    });

    // Create session
    await createSession(result.insertedId.toString());

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: result.insertedId.toString(),
          email,
          name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
