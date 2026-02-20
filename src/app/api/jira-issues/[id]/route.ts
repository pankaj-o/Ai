import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/games/qa/db';
import { getCurrentUserId } from '@/lib/games/qa/auth';
import { COLLECTIONS, JiraIssueUpdateSchema } from '@/lib/jira/models';

type JiraIssueDocument = {
  _id: ObjectId;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  tags?: string[];
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function serializeIssue(issue: JiraIssueDocument) {
  return {
    ...issue,
    _id: issue._id.toString(),
    tags: issue.tags ?? [],
    dueDate: issue.dueDate ? issue.dueDate.toISOString() : null,
    createdAt: issue.createdAt.toISOString(),
    updatedAt: issue.updatedAt.toISOString(),
  };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
    }

    const body = await request.json();
    const validationResult = JiraIssueUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updateData = validationResult.data;
    const cleanedUpdateData: Record<string, unknown> = { ...updateData };

    if ('tags' in cleanedUpdateData && Array.isArray(cleanedUpdateData.tags)) {
      cleanedUpdateData.tags = cleanedUpdateData.tags
        .map((tag) => String(tag).toLowerCase().trim())
        .filter((tag) => tag.length > 0);
    }

    if ('dueDate' in cleanedUpdateData) {
      cleanedUpdateData.dueDate = cleanedUpdateData.dueDate
        ? new Date(String(cleanedUpdateData.dueDate))
        : null;
    }

    const db = await getDb();
    const issueId = new ObjectId(id);
    const existingIssue = await db.collection(COLLECTIONS.JIRA_ISSUES).findOne({ _id: issueId, userId });

    if (!existingIssue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    await db.collection(COLLECTIONS.JIRA_ISSUES).updateOne(
      { _id: issueId, userId },
      { $set: { ...cleanedUpdateData, updatedAt: new Date() } }
    );

    const updatedIssue = await db.collection(COLLECTIONS.JIRA_ISSUES).findOne({ _id: issueId, userId });
    if (!updatedIssue) {
      return NextResponse.json({ error: 'Failed to fetch updated issue' }, { status: 500 });
    }

    return NextResponse.json({ issue: serializeIssue(updatedIssue as unknown as JiraIssueDocument) });
  } catch (error) {
    console.error('Error updating Jira issue:', error);
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(COLLECTIONS.JIRA_ISSUES).deleteOne({
      _id: new ObjectId(id),
      userId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting Jira issue:', error);
    return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
  }
}
