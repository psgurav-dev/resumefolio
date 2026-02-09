## Redux Integration for Resume Data Component

### Changes Made:

1. **Removed Local State Management**
   - Removed `useState` for `resumeData` and `previewData`
   - Removed direct API calls using `getCurrentUserResumeData()` and `saveResumeData()`

2. **Integrated Redux**
   - Imported Redux hooks: `useAppDispatch`, `useAppSelector`
   - Imported Redux actions: `createResume`, `setCurrentResume`, `fetchResumes`
   - Imported Redux type: `Resume`

3. **Updated UploadNewDocument Component**
   - Preview data now stored in Redux state via `setCurrentResume()`
   - Resume save operation dispatches `createResume()` thunk
   - Cancel action clears Redux state with `setCurrentResume(null)`

4. **Updated ResumeData Component**
   - Fetches resumes using `fetchResumes()` thunk on component mount
   - Reads resumes from Redux state: `state.resumes.resumes`
   - Conditionally renders components based on Redux data

5. **Updated ResumeDataVariantsList Component**
   - Changed prop type from `ResumeDocument[]` to `Resume[]`
   - Now accepts Redux Resume type directly

### Usage Example:

```tsx
// In your component
const dispatch = useAppDispatch();

// Fetch resumes for a user
dispatch(fetchResumes(userId));

// Save a new resume
dispatch(createResume(resumeData));

// Access state
const resumes = useAppSelector(state => state.resumes.resumes);
const currentResume = useAppSelector(state => state.resumes.currentResume);
```

### Next Steps:

1. Update the `userId` in `handleSaveResume()` to get from auth context:
   ```tsx
   const currentUserId = useAppSelector(state => state.users.currentUser?._id || '');
   ```

2. Connect auth flow to populate `state.users.currentUser` when user logs in

3. Add error handling UI for Redux error states
