import { createAsyncThunk } from '@reduxjs/toolkit';
import { account } from '@/config/appwrite';
import { getJWTCookie } from '@/lib/cookies';
import type { Resume } from './slices/resumesSlice';
import type { User } from './slices/usersSlice';
import type { RootState } from './store';

// Helper function to get JWT token - checks Redux store first, then creates new, falls back to cookies
const getAuthToken = async (getState: () => any): Promise<string> => {
  try {
    // Try to get JWT from Redux store first
    const state = getState();
    const reduxJWT = state.users.jwt;

    if (reduxJWT) {
      return reduxJWT;
    }

    // Try to get from cookies
    const cookieJWT = getJWTCookie();
    if (cookieJWT) {
      return cookieJWT;
    }

    // Create new JWT if not available
    const jwt = await account.createJWT();
    return jwt.jwt;
  } catch (error) {
    throw new Error('Failed to get authentication token');
  }
};

// Resume Thunks
export const fetchResumes = createAsyncThunk(
  'resumes/fetchResumes',
  async (userId: string, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch(`/api/resume-data?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch resumes');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const createResume = createAsyncThunk(
  'resumes/createResume',
  async (resume: Resume, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch('/api/resume-data', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });
      if (!response.ok) throw new Error('Failed to create resume');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateResume = createAsyncThunk(
  'resumes/updateResume',
  async (resume: Resume, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch(`/api/resume-data/${resume._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });
      if (!response.ok) throw new Error('Failed to update resume');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteResume = createAsyncThunk(
  'resumes/deleteResume',
  async (resumeId: string, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch(`/api/resume-data/${resumeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete resume');
      return resumeId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// User Thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'users/fetchCurrentUser',
  async (userId: string, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: User, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to create user');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: User, { rejectWithValue, getState }) => {
    try {
      const token = await getAuthToken(getState);
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
