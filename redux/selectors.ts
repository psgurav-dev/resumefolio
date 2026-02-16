import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Resume selectors
export const selectResumesState = (state: RootState) => state.resumes;
export const selectResumes = createSelector(
  [selectResumesState],
  (resumes) => resumes.resumes
);
export const selectResumesLoading = createSelector(
  [selectResumesState],
  (resumes) => resumes.loading
);
export const selectResumesError = createSelector(
  [selectResumesState],
  (resumes) => resumes.error
);
export const selectCurrentResume = createSelector(
  [selectResumesState],
  (resumes) => resumes.currentResume
);
export const selectPreviewData = createSelector(
  [selectCurrentResume],
  (currentResume) => currentResume?.parsedData || null
);

// Combined resumes selector
export const selectResumesData = createSelector(
  [selectResumes, selectResumesLoading],
  (resumes, loading) => ({ resumes, loading })
);

// Users selectors
export const selectUsersState = (state: RootState) => state.users;
export const selectCurrentUser = createSelector(
  [selectUsersState],
  (users) => users.currentUser
);
export const selectAllUsers = createSelector(
  [selectUsersState],
  (users) => users.users
);
export const selectUsersLoading = createSelector(
  [selectUsersState],
  (users) => users.loading
);
export const selectUsersError = createSelector(
  [selectUsersState],
  (users) => users.error
);

export const selectJWT = createSelector(
  [selectUsersState],
  (users) => users.jwt,
);

// Derived selectors
export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (user) => user?.appwriteUserId || '',
);

export const selectIsAuthenticated = createSelector(
  [selectCurrentUser],
  (user) => !!user
);
