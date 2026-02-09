# Redux User Authentication Guide

## Overview
User data is now automatically stored in Redux when users log in via Google OAuth.

## How It Works

### 1. Login Flow
```
Google OAuth → Auth Callback → API User Sync → Redux Store
```

### 2. Auth Callback (`/app/auth/callback/page.tsx`)
- User completes Google OAuth
- JWT is created from Appwrite session
- User data is synced with MongoDB via API
- **User is dispatched to Redux store** using `setCurrentUser()`
- User is redirected to `/dashboard`

## Usage

### Get Current User
```tsx
import { useCurrentUser } from '@/redux';

export function MyComponent() {
  const user = useCurrentUser();
  
  if (!user) {
    return <div>Not logged in</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

### Check Authentication Status
```tsx
import { useIsAuthenticated } from '@/redux';

export function ProtectedComponent() {
  const isAuthenticated = useIsAuthenticated();
  
  return isAuthenticated ? <Dashboard /> : <SignIn />;
}
```

### Access All Users (Admin)
```tsx
import { useUsers } from '@/redux';

export function UsersList() {
  const users = useUsers();
  
  return (
    <ul>
      {users.map(user => (
        <li key={user._id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Available Hooks
```tsx
import {
  useCurrentUser,      // Returns User | null
  useIsAuthenticated,  // Returns boolean
  useUsers,            // Returns User[]
  useUsersLoading,     // Returns boolean
  useUsersError,       // Returns string | null
} from '@/redux';
```

### Access via useAppSelector
```tsx
import { useAppSelector } from '@/redux';

export function Profile() {
  const currentUser = useAppSelector(state => state.users.currentUser);
  const allUsers = useAppSelector(state => state.users.users);
  const loading = useAppSelector(state => state.users.loading);
  const error = useAppSelector(state => state.users.error);
  
  return (
    // Your JSX here
  );
}
```

## Redux State Structure

```typescript
// users slice
{
  currentUser: User | null,  // Currently authenticated user
  users: User[],             // All users
  loading: boolean,          // Loading state
  error: string | null       // Error messages
}

// User type
interface User {
  _id?: string;
  appwriteUserId: string;
  email: string;
  name?: string;
  provider: 'google' | 'github' | 'email';
  createdAt?: string;
  updatedAt?: string;
}
```

## Actions Available

```tsx
import { 
  setCurrentUser,     // Set current user
  clearCurrentUser,   // Clear current user (logout)
  setUsers,           // Set all users
  addUser,            // Add single user
  updateUser,         // Update user data
  deleteUser,         // Delete user
  setUsersLoading,    // Set loading state
  setUsersError,      // Set error state
} from '@/redux';
```

## Next Steps

1. **Logout Implementation**: Create a logout action that calls `clearCurrentUser()`
2. **Protected Routes**: Use `useIsAuthenticated()` to protect routes
3. **User Profile**: Display user info using `useCurrentUser()`
4. **Admin Pages**: Use `useUsers()` to manage all users
