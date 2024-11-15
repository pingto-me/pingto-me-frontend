import { useStore, useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import type { AppStore, RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
