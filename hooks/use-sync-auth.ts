"use client";

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux';
import { setCurrentUser, setJWT } from '@/redux/slices/usersSlice';
import { getJWTCookie, getUserCookie } from '@/lib/cookies';
import type { User } from '@/redux/slices/usersSlice';

/**
 * Hook to sync auth state from cookies to Redux on app initialization
 * This ensures that if user has valid cookies, they remain logged in after page refresh
 */
export const useSyncAuthWithCookies = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwt = getJWTCookie();
    const user = getUserCookie();

    if (jwt && user) {
      // Sync user with JWT to Redux
      const userData: User = {
        ...user,
        jwt,
      };
      dispatch(setCurrentUser(userData));
      dispatch(setJWT(jwt));
    }
  }, [dispatch]);
};
