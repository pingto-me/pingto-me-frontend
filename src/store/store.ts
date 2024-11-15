import { configureStore } from '@reduxjs/toolkit';

import pageReducer from './slices/page-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      page: pageReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
