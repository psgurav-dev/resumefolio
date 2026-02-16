import { User } from '@/redux/slices/usersSlice';

const COOKIE_OPTIONS = {
  JWT_COOKIE_NAME: 'appwrite_jwt',
  USER_COOKIE_NAME: 'appwrite_user',
  MAX_AGE: 60 * 60 * 24 * 7, // 7 days
};

/**
 * Set JWT token in cookies
 */
export const setJWTCookie = (jwt: string) => {
  if (typeof document === 'undefined') return; // Server-side safe check
  document.cookie = `${COOKIE_OPTIONS.JWT_COOKIE_NAME}=${encodeURIComponent(jwt)}; path=/; max-age=${COOKIE_OPTIONS.MAX_AGE}; SameSite=Lax`;
};

/**
 * Set user info in cookies
 */
export const setUserCookie = (user: User) => {
  if (typeof document === 'undefined') return; // Server-side safe check
  const userString = JSON.stringify({
    _id: user._id,
    appwriteUserId: user.appwriteUserId,
    email: user.email,
    name: user.name,
    provider: user.provider,
  });
  document.cookie = `${COOKIE_OPTIONS.USER_COOKIE_NAME}=${encodeURIComponent(userString)}; path=/; max-age=${COOKIE_OPTIONS.MAX_AGE}; SameSite=Lax`;
};

/**
 * Get JWT token from cookies
 */
export const getJWTCookie = (): string | null => {
  if (typeof document === 'undefined') return null; // Server-side safe check
  const name = COOKIE_OPTIONS.JWT_COOKIE_NAME + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
};

/**
 * Get user info from cookies
 */
export const getUserCookie = (): User | null => {
  if (typeof document === 'undefined') return null; // Server-side safe check
  const name = COOKIE_OPTIONS.USER_COOKIE_NAME + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      try {
        return JSON.parse(cookie.substring(name.length));
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
        return null;
      }
    }
  }
  return null;
};

/**
 * Clear JWT token from cookies
 */
export const clearJWTCookie = () => {
  if (typeof document === 'undefined') return; // Server-side safe check
  document.cookie = `${COOKIE_OPTIONS.JWT_COOKIE_NAME}=; path=/; max-age=0`;
};

/**
 * Clear user info from cookies
 */
export const clearUserCookie = () => {
  if (typeof document === 'undefined') return; // Server-side safe check
  document.cookie = `${COOKIE_OPTIONS.USER_COOKIE_NAME}=; path=/; max-age=0`;
};

/**
 * Clear all auth cookies
 */
export const clearAllAuthCookies = () => {
  clearJWTCookie();
  clearUserCookie();
};

/**
 * Set both JWT and user info in cookies
 */
export const setAuthCookies = (jwt: string, user: User) => {
  setJWTCookie(jwt);
  setUserCookie(user);
};
