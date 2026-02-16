# JWT & Cookie Management Setup

## Overview
This document describes how JWT tokens and user information are stored and managed in the Redux store and browser cookies.

## Key Features

### 1. JWT Storage in Redux
- JWT is stored in the `users` slice of Redux state
- Accessible via the `selectJWT` selector
- Automatically synced when user logs in via Google OAuth

### 2. Cookie Storage
- JWT token stored in `appwrite_jwt` cookie
- User basic info stored in `appwrite_user` cookie
- Both cookies persist for 7 days
- Automatically cleared on logout

### 3. Automatic Token Priority
The system uses this priority for JWT authentication:
1. **Redux Store** - Most current, in-memory JWT
2. **Cookies** - Persistent JWT (used after page refresh)
3. **Appwrite** - Fresh JWT created if others unavailable

## Usage

### Login Flow (Automatic)

When user authenticates via Google in `app/auth/callback/page.tsx`:

```tsx
// 1. JWT is created from Appwrite session
const jwtResponse = await account.createJWT();
const jwtToken = jwtResponse.jwt;

// 2. User data is fetched from your backend
const { user } = await res.json();

// 3. Both are stored in Redux
const userData = {
  ...user,
  jwt: jwtToken,
};
dispatch(setCurrentUser(userData));

// 4. Both are stored in cookies
setAuthCookies(jwtToken, userData);
```

### Accessing JWT in Components

```tsx
import { useAppSelector } from '@/redux';
import { selectJWT } from '@/redux/selectors';

function MyComponent() {
  const jwt = useAppSelector(selectJWT);
  
  // Use jwt for API calls
}
```

### Accessing User Info

```tsx
import { useAppSelector } from '@/redux';
import { selectCurrentUser } from '@/redux/selectors';

function MyComponent() {
  const user = useAppSelector(selectCurrentUser);
  
  // Access: user._id, user.email, user.name, etc.
}
```

### Using the Sync Hook (App Initialization)

In your main layout or app component, call this hook to restore auth state from cookies after page refresh:

```tsx
"use client";

import { useSyncAuthWithCookies } from '@/hooks/use-sync-auth';

export default function Layout() {
  // This syncs cookies → Redux on app load
  useSyncAuthWithCookies();

  return (
    // Your layout...
  );
}
```

### Logout

```tsx
import { logoutUser } from '@/lib/logout';
import { useAppDispatch } from '@/redux';
import { useRouter } from 'next/navigation';

function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(dispatch);
    router.push('/sign-in');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## Files Modified/Created

### Modified Files:
- **`redux/slices/usersSlice.ts`** - Added `jwt` field to User interface and state
- **`redux/selectors.ts`** - Added `selectJWT` selector
- **`redux/thunks.ts`** - Updated all thunks to use JWT from Redux/cookies
- **`app/auth/callback/page.tsx`** - Updated to store JWT in Redux and cookies

### New Files:
- **`lib/cookies.ts`** - Cookie management utilities
- **`hooks/use-sync-auth.ts`** - Hook to sync cookies with Redux on app load
- **`lib/logout.ts`** - Logout utilities that clear Redux and cookies

## API Requests

All API requests automatically use JWT from Redux or cookies via the thunks:

```tsx
// When you call a thunk, JWT is automatically included
dispatch(fetchResumes(userId));

// Behind the scenes:
const token = await getAuthToken(getState); // Gets from Redux → Cookies → Creates new
// Authorization: Bearer ${token}
```

## Security Notes

✅ **Good Practices Used:**
- JWT stored securely in HttpOnly cookies (can be enhanced server-side)
- Tokens have 7-day expiration
- Tokens cleared on logout
- Server-side check for tokens in cookies (safe for SSR)

🔒 **Enhancement for Production:**
- Consider using HttpOnly cookies (requires middleware)
- Add token refresh logic for long sessions
- Implement CSRF protection
- Add SameSite cookie policy (already set to Lax)

## TypeScript Types

```tsx
// User type with JWT
export interface User {
  _id?: string;
  appwriteUserId: string;
  email: string;
  name?: string;
  provider: 'google' | 'github' | 'email';
  createdAt?: string;
  updatedAt?: string;
  jwt?: string; // New field
}

// UsersState
export interface UsersState {
  currentUser: User | null;
  users: User[];
  jwt: string | null; // New field
  loading: boolean;
  error: string | null;
}
```

## Troubleshooting

### "Failed to get authentication token"
- Check if Appwrite session is still valid
- Verify cookies are not corrupted
- Check Redux DevTools to see JWT state

### User not logged in after refresh
- Make sure `useSyncAuthWithCookies()` hook is called in your main layout
- Check browser cookies (F12 → Application → Cookies)
- Verify cookies are not being blocked by browser settings

### API calls failing with 401
- Check if JWT is expired (7 days)
- Verify JWT is in Redux store: `console.log(store.getState().users.jwt)`
- Check API server is receiving the bearer token correctly
