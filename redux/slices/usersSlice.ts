import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  _id?: string;
  appwriteUserId: string;
  email: string;
  name?: string;
  provider: 'google' | 'github' | 'email';
  createdAt?: string;
  updatedAt?: string;
  jwt?: string;
}

export interface UsersState {
  currentUser: User | null;
  users: User[];
  profile: User | null;
  jwt: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  currentUser: null,
  users: [],
  profile: null,
  jwt: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.jwt = action.payload.jwt || null;
      state.error = null;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      console.log('Setting users in state:', action.payload);
      state.users = action.payload;
      state.error = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      if (state.currentUser?._id === action.payload._id) {
        state.currentUser = action.payload;
      }
      state.error = null;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
      if (state.currentUser?._id === action.payload) {
        state.currentUser = null;
      }
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.jwt = null;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setJWT: (state, action: PayloadAction<string | null>) => {
      state.jwt = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  clearCurrentUser,
  setLoading,
  setError,
  setJWT,
} = usersSlice.actions;

export default usersSlice.reducer;
