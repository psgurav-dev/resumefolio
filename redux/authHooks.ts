import { useAppSelector } from './hooks';
import type { User } from './slices/usersSlice';

/**
 * Hook to access current authenticated user from Redux
 * Returns the current user or null if not authenticated
 */
export const useCurrentUser = (): User | null => {
  return useAppSelector(state => state.users.currentUser);
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = (): boolean => {
  return useAppSelector(state => !!state.users.currentUser);
};

/**
 * Hook to access all users
 */
export const useUsers = () => {
  return useAppSelector(state => state.users.users);
};

/**
 * Hook to access users loading state
 */
export const useUsersLoading = (): boolean => {
  return useAppSelector(state => state.users.loading);
};

/**
 * Hook to access users error state
 */
export const useUsersError = (): string | null => {
  return useAppSelector(state => state.users.error);
};
