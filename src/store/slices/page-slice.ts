import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  pageTitle: '',
};

const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageTitleAction: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    clearPageTitleAction: () => initialState,
  },
});

export const { setPageTitleAction, clearPageTitleAction } = slice.actions;

export default slice.reducer;
