import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/games/qa/db';
import { QACardSchema, QACardUpdateSchema, COLLECTIONS } from '@/lib/games/qa/models';
import { getCurrentUserId } from '@/lib/games/qa/auth';

/**
 * GET /api/qa-cards/:id
 * Get a single Q&A card (must belong to current user)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid card ID' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const card = await db
      .collection(COLLECTIONS.QA_CARDS)
      .findOne({ _id: new ObjectId(id), userId });

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      card: {
        ...card,
        _id: card._id.toString(),
        createdAt: card.createdAt.toISOString(),
        updatedAt: card.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching Q&A card:', error);
    
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
 * PATCH /api/qa-cards/:id
 * Update a Q&A card (must belong to current user)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid card ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const validationResult = QACardUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const updateData = validationResult.data;
    
    // Handle empty meaning string - convert to undefined
    const cleanedUpdateData: any = { ...updateData };
    if ('meaning' in cleanedUpdateData && cleanedUpdateData.meaning === '') {
      cleanedUpdateData.meaning = undefined;
    }

    const db = await getDb();
    
    // Check if card exists and belongs to user
    const existingCard = await db
      .collection(COLLECTIONS.QA_CARDS)
      .findOne({ _id: new ObjectId(id), userId });

    if (!existingCard) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    // Update card
    const result = await db
      .collection(COLLECTIONS.QA_CARDS)
      .updateOne(
        { _id: new ObjectId(id), userId },
        { $set: { ...cleanedUpdateData, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    // Fetch updated card
    const updatedCard = await db
      .collection(COLLECTIONS.QA_CARDS)
      .findOne({ _id: new ObjectId(id) });

    if (!updatedCard) {
      return NextResponse.json(
        { error: 'Failed to fetch updated card' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      card: {
        ...updatedCard,
        _id: updatedCard._id.toString(),
        createdAt: updatedCard.createdAt.toISOString(),
        updatedAt: updatedCard.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating Q&A card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/qa-cards/:id
 * Delete a Q&A card (must belong to current user)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid card ID' },
        { status: 400 }
      );
    }

    const db = await getDb();
    
    // Check if card exists and belongs to user
    const existingCard = await db
      .collection(COLLECTIONS.QA_CARDS)
      .findOne({ _id: new ObjectId(id), userId });

    if (!existingCard) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    // Delete card
    const result = await db
      .collection(COLLECTIONS.QA_CARDS)
      .deleteOne({ _id: new ObjectId(id), userId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting Q&A card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
