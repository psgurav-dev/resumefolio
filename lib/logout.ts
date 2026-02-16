import { AppDispatch } from '@/redux/store';
import { clearCurrentUser } from '@/redux/slices/usersSlice';
import { clearAllAuthCookies } from '@/lib/cookies';
import { account } from '@/config/appwrite';

/**
 * Logout user by clearing Redux state, cookies, and Appwrite session
 */
export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    // Clear Appwrite session
    await account.deleteSession('current');
  } catch (error) {
    console.error('Failed to clear Appwrite session:', error);
  } finally {
    // Clear Redux state
    dispatch(clearCurrentUser());

    // Clear cookies
    clearAllAuthCookies();
  }
};
