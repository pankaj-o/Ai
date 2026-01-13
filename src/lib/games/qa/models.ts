import { z } from 'zod';
import { ObjectId } from 'mongodb';

// Zod schemas for validation
export const QACardSchema = z.object({
  question: z.string().min(1, 'Question is required').max(5000, 'Question must be 5000 characters or less'),
  answer: z.string().min(1, 'Answer is required').max(5000, 'Answer must be 5000 characters or less'),
  meaning: z.string().max(5000, 'Meaning must be 5000 characters or less').optional(),
});

export const QACardUpdateSchema = QACardSchema.partial();

// TypeScript types
export type QACardInput = z.infer<typeof QACardSchema>;
export type QACardUpdate = z.infer<typeof QACardUpdateSchema>;

export interface QACard {
  _id: ObjectId;
  userId: string;
  question: string;
  answer: string;
  meaning?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QAAttempt {
  _id: ObjectId;
  userId: string;
  cardId: ObjectId;
  userAnswer: string;
  isCorrect: boolean;
  createdAt: Date;
}

// Collection names
export const COLLECTIONS = {
  QA_CARDS: 'qaCards',
  QA_ATTEMPTS: 'qaAttempts',
} as const;
