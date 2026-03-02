'use client';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User, updateUser } from '@/redux/slices/usersSlice';
import { account } from '@/config/appwrite';

interface UseEditProfileReturn {
  updateProfile: (updatedUser: Partial<User>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing profile edit operations
 * Handles API calls, loading states, and Redux state updates
 *
 * @returns {UseEditProfileReturn} - updateProfile function, loading state, and error state
 */
export const useEditProfile = (): UseEditProfileReturn => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(
    async (updatedUser: Partial<User>): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        // Validate input
        if (!updatedUser || Object.keys(updatedUser).length === 0) {
          throw new Error('No data to update');
        }
        const jwt = await account.createJWT();

        // API call to update user profile
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: jwt.jwt,
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              errorData.error ||
              `Failed to update profile: ${response.status}`,
          );
        }

        const data = await response.json();

        // Validate response data
        if (!data.user) {
          throw new Error('Invalid response from server');
        }

        // Update Redux state with the updated user
        dispatch(updateUser(data.user));

        return Promise.resolve();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';

        setError(errorMessage);
        return Promise.reject(new Error(errorMessage));
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  return {
    updateProfile,
    isLoading,
    error,
  };
};
