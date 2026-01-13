import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/games/qa/db';
import { QACardSchema, COLLECTIONS } from '@/lib/games/qa/models';
import { getCurrentUserId } from '@/lib/games/qa/auth';

/**
 * GET /api/qa-cards
 * Get all Q&A cards for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDb();
    const cards = await db
      .collection(COLLECTIONS.QA_CARDS)
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const cardsWithStringIds = cards.map(card => ({
      ...card,
      _id: card._id.toString(),
      createdAt: card.createdAt.toISOString(),
      updatedAt: card.updatedAt.toISOString(),
    }));

    return NextResponse.json({ cards: cardsWithStringIds });
  } catch (error) {
    console.error('Error fetching Q&A cards:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('MongoClient') || error.message.includes('MongoServerError') || error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          { error: 'Database connection error. Please check your MONGODB_URI in .env.local' },
          { status: 500 }
        );
      }
      if (error.message.includes('Authentication not implemented')) {
        return NextResponse.json(
          { error: 'Authentication error. Please implement getCurrentUserId() in src/lib/games/qa/auth.ts' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/qa-cards
 * Create a new Q&A card for the current user
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const validationResult = QACardSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { question, answer, meaning } = validationResult.data;

    const db = await getDb();
    const now = new Date();
    
    const result = await db.collection(COLLECTIONS.QA_CARDS).insertOne({
      userId,
      question,
      answer,
      meaning: meaning || undefined,
      createdAt: now,
      updatedAt: now,
    });

    const newCard = await db
      .collection(COLLECTIONS.QA_CARDS)
      .findOne({ _id: result.insertedId });

    if (!newCard) {
      return NextResponse.json(
        { error: 'Failed to create card' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        card: {
          ...newCard,
          _id: newCard._id.toString(),
          createdAt: newCard.createdAt.toISOString(),
          updatedAt: newCard.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating Q&A card:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      // Check for MongoDB connection errors
      if (error.message.includes('MongoClient') || error.message.includes('MongoServerError') || error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          { error: 'Database connection error. Please check your MONGODB_URI in .env.local' },
          { status: 500 }
        );
      }
      
      // Check for auth errors
      if (error.message.includes('Authentication not implemented')) {
        return NextResponse.json(
          { error: 'Authentication error. Please implement getCurrentUserId() in src/lib/games/qa/auth.ts' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
