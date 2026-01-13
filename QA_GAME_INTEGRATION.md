# Q&A Typing Game - Integration Guide

This document explains how to integrate the Q&A Typing Game feature into your existing portfolio project.

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── qa-cards/
│   │       ├── route.ts              # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.ts          # GET, PATCH, DELETE endpoints
│   └── games/
│       └── qa/
│           ├── manage/
│           │   └── page.tsx          # Card management page
│           ├── play/
│           │   └── page.tsx          # Game play page
│           ├── new/
│           │   └── page.tsx          # Create new card
│           └── [id]/
│               └── edit/
│                   └── page.tsx      # Edit existing card
├── components/
│   └── games/
│       └── qa/
│           ├── QACardList.tsx        # List of cards with search
│           ├── QACardForm.tsx        # Create/edit form
│           ├── GameSettings.tsx     # Game configuration
│           ├── GamePlay.tsx          # Main game component
│           └── GameResults.tsx      # Results screen
└── lib/
    └── games/
        └── qa/
            ├── db.ts                 # MongoDB connection
            ├── models.ts             # Types and schemas
            ├── answer-checker.ts     # Answer validation logic
            └── auth.ts               # Auth stubs (TODO: implement)
```

## Prerequisites

1. **MongoDB**: You need a MongoDB database. Get your connection string ready.
2. **Environment Variables**: Add to your `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/your-database
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

## Authentication Integration

### Step 1: Implement `getCurrentUserId()`

Edit `src/lib/games/qa/auth.ts` and replace the `getCurrentUserId()` function with your actual authentication logic.

#### Example: NextAuth.js

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}
```

#### Example: Clerk

```typescript
import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}
```

#### Example: Custom JWT

```typescript
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}
```

#### Example: Session-based (custom)

```typescript
import { cookies } from "next/headers";

export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  return userId || null;
}
```

### Step 2: Protect Routes (Optional)

If you want to protect the `/games/qa/*` routes, you can add middleware or use route handlers.

#### Option A: Middleware (Next.js 13+)

Create `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if route is under /games/qa
  if (request.nextUrl.pathname.startsWith('/games/qa')) {
    // TODO: Add your auth check here
    // const userId = await getCurrentUserId();
    // if (!userId) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/games/qa/:path*',
};
```

#### Option B: Route Protection in Layout

Create `src/app/games/qa/layout.tsx`:

```typescript
import { redirect } from 'next/navigation';
import { getCurrentUserId } from '@/lib/games/qa/auth';

export default async function QALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    redirect('/login'); // or your login page
  }
  
  return <>{children}</>;
}
```

## API Endpoints

All endpoints require authentication (via `getCurrentUserId()`).

### GET `/api/qa-cards`
- **Description**: Get all Q&A cards for the current user
- **Response**: `{ cards: QACard[] }`

### POST `/api/qa-cards`
- **Description**: Create a new Q&A card
- **Body**: `{ question: string, answer: string }`
- **Response**: `{ card: QACard }`

### GET `/api/qa-cards/:id`
- **Description**: Get a single card (must belong to user)
- **Response**: `{ card: QACard }`

### PATCH `/api/qa-cards/:id`
- **Description**: Update a card (must belong to user)
- **Body**: `{ question?: string, answer?: string }`
- **Response**: `{ card: QACard }`

### DELETE `/api/qa-cards/:id`
- **Description**: Delete a card (must belong to user)
- **Response**: `{ success: true }`

## Routes

- `/games/qa/manage` - Manage your Q&A cards
- `/games/qa/new` - Create a new card
- `/games/qa/[id]/edit` - Edit an existing card
- `/games/qa/play` - Play the typing game

## Features

### Answer Checking

The game supports flexible answer checking with these options:
- **Trim Whitespace**: Removes leading/trailing spaces (default: true)
- **Case Sensitive**: Strict mode for case matching (default: false)
- **Ignore Extra Spaces**: Collapses multiple spaces (default: false)
- **Ignore Punctuation**: Removes punctuation marks (default: false)

### Game Modes

- **Random Order**: Shuffle questions randomly
- **Strict Mode**: Case-sensitive answer matching
- **Ignore Punctuation**: Ignore punctuation when checking answers

## Database Schema

### Collection: `qaCards`

```typescript
{
  _id: ObjectId,
  userId: string,        // Indexed for fast queries
  question: string,      // Max 5000 chars
  answer: string,        // Max 5000 chars
  createdAt: Date,
  updatedAt: Date
}
```

### Optional Collection: `qaAttempts`

```typescript
{
  _id: ObjectId,
  userId: string,
  cardId: ObjectId,
  userAnswer: string,
  isCorrect: boolean,
  createdAt: Date
}
```

## Testing Checklist

1. **Authentication**
   - [ ] Implement `getCurrentUserId()` in `auth.ts`
   - [ ] Test that unauthenticated users get 401 errors
   - [ ] Test that users can only see their own cards

2. **CRUD Operations**
   - [ ] Create a new card
   - [ ] Edit an existing card
   - [ ] Delete a card
   - [ ] List all cards (should only show user's cards)
   - [ ] Try to access another user's card (should fail)

3. **Game Play**
   - [ ] Start game with no cards (should show message)
   - [ ] Start game with cards
   - [ ] Test answer checking with different settings
   - [ ] Complete a game and view results
   - [ ] Play again functionality

4. **Edge Cases**
   - [ ] Very long questions/answers (5000 chars)
   - [ ] Empty questions/answers (should be rejected)
   - [ ] Delete non-existent card (should return 404)
   - [ ] Edit non-existent card (should return 404)
   - [ ] Search functionality
   - [ ] Empty state when no cards exist

5. **UI/UX**
   - [ ] Loading states
   - [ ] Error messages
   - [ ] Form validation
   - [ ] Character counters
   - [ ] Responsive design

## Troubleshooting

### "Authentication not implemented" error
- Make sure you've implemented `getCurrentUserId()` in `src/lib/games/qa/auth.ts`

### MongoDB connection errors
- Check your `MONGODB_URI` in `.env.local`
- Ensure MongoDB is running (if local)
- Check network/firewall settings (if remote)

### 401 Unauthorized errors
- Verify your auth implementation returns a valid userId
- Check that cookies/sessions are being set correctly

### Cards not showing up
- Check MongoDB connection
- Verify userId is being set correctly
- Check browser console for errors

## Customization

### Styling
The components use Tailwind CSS and follow your existing dark theme. You can customize colors by modifying the Tailwind classes in the components.

### Validation Rules
Edit `src/lib/games/qa/models.ts` to change:
- Min/max lengths
- Required fields
- Additional validation rules

### Answer Checking
Modify `src/lib/games/qa/answer-checker.ts` to add custom normalization logic.

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check server logs for API errors
3. Verify MongoDB connection and auth implementation
4. Review the integration steps above
