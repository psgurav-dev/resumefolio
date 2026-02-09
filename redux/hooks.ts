import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Export these hooks to be used instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T) => useSelector<RootState, T>(selector);
