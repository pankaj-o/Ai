import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/games/qa/db';
import { getCurrentUserId } from '@/lib/games/qa/auth';
import { COLLECTIONS, JiraIssueSchema } from '@/lib/jira/models';

type JiraIssueDocument = {
  _id: { toString(): string };
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

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const issues = await db
      .collection(COLLECTIONS.JIRA_ISSUES)
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      issues: issues.map((issue) => serializeIssue(issue as unknown as JiraIssueDocument)),
    });
  } catch (error) {
    console.error('Error fetching Jira issues:', error);
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = JiraIssueSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { title, description, status, priority, tags, dueDate } = validationResult.data;
    const db = await getDb();
    const now = new Date();

    const result = await db.collection(COLLECTIONS.JIRA_ISSUES).insertOne({
      userId,
      title,
      description: description || '',
      status,
      priority,
      tags: tags.map((tag) => tag.toLowerCase()).filter((tag) => tag.length > 0),
      dueDate: dueDate ? new Date(dueDate) : null,
      createdAt: now,
      updatedAt: now,
    });

    const createdIssue = await db.collection(COLLECTIONS.JIRA_ISSUES).findOne({ _id: result.insertedId });
    if (!createdIssue) {
      return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
    }

    return NextResponse.json({ issue: serializeIssue(createdIssue as unknown as JiraIssueDocument) }, { status: 201 });
  } catch (error) {
    console.error('Error creating Jira issue:', error);
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}
