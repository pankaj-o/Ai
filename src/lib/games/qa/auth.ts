import { getSession } from '@/lib/auth/session';

/**
 * Gets the current authenticated user ID
 * @returns User ID string or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.userId || null;
}

/**
 * Checks if the current user is authenticated
 * @returns true if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const userId = await getCurrentUserId();
  return userId !== null;
}
