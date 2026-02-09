import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioData } from '@/types/portfolio';
import { fetchResumes, createResume, updateResume as updateResumeThunk, deleteResume as deleteResumeThunk } from '../thunks';

export interface Resume {
  _id?: string;
  userId: string;
  name: string;
  parsedData: PortfolioData;
  template?: 'modern-1' | 'creative' | 'minimalist';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResumesState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumesState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
};

const resumesSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    setResumes: (state, action: PayloadAction<Resume[]>) => {
      state.resumes = action.payload;
      state.error = null;
    },
    setCurrentResume: (state, action: PayloadAction<Resume | null>) => {
      state.currentResume = action.payload;
      state.error = null;
    },
    addResume: (state, action: PayloadAction<Resume>) => {
      state.resumes.push(action.payload);
      state.currentResume = action.payload;
      state.error = null;
    },
    updateResume: (state, action: PayloadAction<Resume>) => {
      const index = state.resumes.findIndex(resume => resume._id === action.payload._id);
      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
      if (state.currentResume?._id === action.payload._id) {
        state.currentResume = action.payload;
      }
      state.error = null;
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.filter(resume => resume._id !== action.payload);
      if (state.currentResume?._id === action.payload) {
        state.currentResume = null;
      }
      state.error = null;
    },
    updateCurrentResumeData: (state, action: PayloadAction<Partial<PortfolioData>>) => {
      if (state.currentResume) {
        state.currentResume.parsedData = {
          ...state.currentResume.parsedData,
          ...action.payload,
        };
      }
      state.error = null;
    },
    setActiveResume: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.map(resume => ({
        ...resume,
        isActive: resume._id === action.payload,
      }));
      const activeResume = state.resumes.find(resume => resume._id === action.payload);
      if (activeResume) {
        state.currentResume = activeResume;
      }
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch Resumes
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload.resumes || [];
        state.error = null;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Resume
    builder
      .addCase(createResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.loading = false;
        const newResume = action.payload.resume || action.payload;
        state.resumes.push(newResume);
        state.currentResume = newResume;
        state.error = null;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Resume
    builder
      .addCase(updateResumeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResumeThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedResume = action.payload.resume || action.payload;
        const index = state.resumes.findIndex(r => r._id === updatedResume._id);
        if (index !== -1) {
          state.resumes[index] = updatedResume;
        }
        if (state.currentResume?._id === updatedResume._id) {
          state.currentResume = updatedResume;
        }
        state.error = null;
      })
      .addCase(updateResumeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Resume
    builder
      .addCase(deleteResumeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResumeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.filter(r => r._id !== action.payload);
        if (state.currentResume?._id === action.payload) {
          state.currentResume = null;
        }
        state.error = null;
      })
      .addCase(deleteResumeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setResumes,
  setCurrentResume,
  addResume,
  updateResume,
  deleteResume,
  updateCurrentResumeData,
  setActiveResume,
  setLoading,
  setError,
} = resumesSlice.actions;

export default resumesSlice.reducer;
