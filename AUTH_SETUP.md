# Authentication Setup Complete! ✅

## What's Been Added

1. **Signup Page** (`/signup`) - Create new user accounts
2. **Login Page** (`/login`) - Sign in to existing accounts
3. **Logout Functionality** - Logout button in the manage page
4. **Session Management** - JWT-based sessions stored in cookies
5. **Route Protection** - Middleware protects `/games/qa/*` routes
6. **Password Security** - Passwords are hashed with bcrypt

## Environment Variables

Add to your `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important**: Change `JWT_SECRET` to a random, secure string in production!

## How to Use

### 1. Sign Up
- Visit `/signup`
- Enter your name, email, and password (min 6 characters)
- Click "Sign Up"
- You'll be automatically logged in and redirected to the Q&A game

### 2. Login
- Visit `/login`
- Enter your email and password
- Click "Login"
- You'll be redirected to the Q&A game

### 3. Logout
- Click the "Logout" button in the top-right of the manage page
- You'll be redirected to the login page

## Protected Routes

The following routes require authentication:
- `/games/qa/manage`
- `/games/qa/play`
- `/games/qa/new`
- `/games/qa/[id]/edit`

If you try to access these without being logged in, you'll be redirected to `/login`.

## Database Schema

A new `users` collection is created in MongoDB with:
- `_id`: ObjectId
- `email`: string (unique, lowercase)
- `passwordHash`: string (bcrypt hashed)
- `name`: string
- `createdAt`: Date
- `updatedAt`: Date

## Security Features

✅ Passwords are hashed with bcrypt (10 rounds)
✅ JWT tokens for session management
✅ HTTP-only cookies (prevents XSS)
✅ Secure cookies in production
✅ Email uniqueness enforced
✅ Password minimum length (6 characters)
✅ Input validation with Zod

## Files Created

- `src/app/login/page.tsx` - Login page
- `src/app/signup/page.tsx` - Signup page
- `src/app/api/auth/login/route.ts` - Login API
- `src/app/api/auth/signup/route.ts` - Signup API
- `src/app/api/auth/logout/route.ts` - Logout API
- `src/lib/auth/models.ts` - Auth models and schemas
- `src/lib/auth/session.ts` - Session management
- `src/components/auth/LogoutButton.tsx` - Logout component
- `src/middleware.ts` - Route protection

## Updated Files

- `src/lib/games/qa/auth.ts` - Now uses real session management

## Testing

1. Start your dev server: `npm run dev`
2. Visit `/signup` and create an account
3. Try accessing `/games/qa/manage` - should work
4. Logout and try accessing `/games/qa/manage` - should redirect to login
5. Login again - should work

## Troubleshooting

### "JWT_SECRET not set"
- Add `JWT_SECRET` to your `.env.local` file

### "Database connection error"
- Check your `MONGODB_URI` in `.env.local`
- Make sure MongoDB is running

### "User already exists"
- The email is already registered
- Try logging in instead, or use a different email

### Can't access protected routes
- Make sure you're logged in
- Check that your session cookie is set
- Try logging out and logging back in

## Next Steps

1. Set `JWT_SECRET` in `.env.local` to a secure random string
2. Test signup and login
3. Create your first Q&A card
4. Play the game!
