# Q&A Typing Game - Quick Start

## Installation Complete! ✅

The Q&A Typing Game feature has been added to your portfolio. Here's what you need to do next:

## 1. Set Up MongoDB

Add to your `.env.local` file:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## 2. Implement Authentication

**CRITICAL**: You must implement authentication before the game will work.

Edit `src/lib/games/qa/auth.ts` and replace the `getCurrentUserId()` function with your actual auth logic.

### Quick Examples:

**NextAuth.js:**
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}
```

**Clerk:**
```typescript
import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}
```

**Custom Session:**
```typescript
import { cookies } from "next/headers";

export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("userId")?.value || null;
}
```

## 3. Access the Game

Once auth is set up, visit:
- **Manage Cards**: `http://localhost:3000/games/qa/manage`
- **Play Game**: `http://localhost:3000/games/qa/play`
- **Create Card**: `http://localhost:3000/games/qa/new`

## Features

✅ Create, edit, and delete Q&A cards
✅ Search and filter cards
✅ Play typing game with customizable settings
✅ Track score, streak, and accuracy
✅ Review answers after game completion

## File Locations

- **API Routes**: `src/app/api/qa-cards/`
- **Pages**: `src/app/games/qa/`
- **Components**: `src/components/games/qa/`
- **Utilities**: `src/lib/games/qa/`

## Need Help?

See `QA_GAME_INTEGRATION.md` for detailed integration instructions and troubleshooting.
