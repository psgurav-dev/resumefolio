// Store
export { store } from './store';
export type { RootState, AppDispatch } from './store';

// Hooks
export { useAppDispatch, useAppSelector } from './hooks';
export { useCurrentUser, useIsAuthenticated, useUsers, useUsersLoading, useUsersError } from './authHooks';

// Selectors
export {
  selectResumes,
  selectResumesLoading,
  selectResumesError,
  selectCurrentResume,
  selectPreviewData,
  selectResumesData,
  selectCurrentUser,
  selectAllUsers,
  selectUsersLoading,
  selectUsersError,
  selectCurrentUserId,
  selectIsAuthenticated,
} from './selectors';

// Provider
export { ReduxProvider } from './provider';

// Slices - Users
export {
  setCurrentUser,
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  clearCurrentUser,
  setLoading as setUsersLoading,
  setError as setUsersError,
} from './slices/usersSlice';
export type { User, UsersState } from './slices/usersSlice';

// Slices - Resumes
export {
  setResumes,
  setCurrentResume,
  addResume,
  updateResume,
  deleteResume,
  updateCurrentResumeData,
  setActiveResume,
  setLoading as setResumesLoading,
  setError as setResumesError,
} from './slices/resumesSlice';
export type { Resume, ResumesState } from './slices/resumesSlice';

// Thunks
export {
  fetchResumes,
  createResume,
  updateResume as updateResumeThunk,
  deleteResume as deleteResumeThunk,
  fetchUsers,
  fetchCurrentUser,
  createUser,
  updateUser as updateUserThunk,
} from './thunks';
