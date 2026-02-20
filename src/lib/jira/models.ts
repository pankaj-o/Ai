import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const IssueStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
export const IssuePrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const JiraIssueSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z.string().trim().max(2000, 'Description must be 2000 characters or less').optional(),
  status: IssueStatusSchema.default('TODO'),
  priority: IssuePrioritySchema.default('MEDIUM'),
  tags: z.array(z.string().trim().max(30, 'Each tag must be 30 characters or less')).max(10, 'Max 10 tags').default([]),
  dueDate: z.string().datetime().optional().nullable(),
});

export const JiraIssueUpdateSchema = JiraIssueSchema.partial();

export type JiraIssueInput = z.infer<typeof JiraIssueSchema>;
export type JiraIssueUpdate = z.infer<typeof JiraIssueUpdateSchema>;
export type IssueStatus = z.infer<typeof IssueStatusSchema>;
export type IssuePriority = z.infer<typeof IssuePrioritySchema>;

export interface JiraIssue {
  _id: ObjectId;
  userId: string;
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  tags: string[];
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const COLLECTIONS = {
  JIRA_ISSUES: 'jiraIssues',
} as const;
