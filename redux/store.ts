import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import resumesReducer from './slices/resumesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    resumes: resumesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
