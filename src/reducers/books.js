/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { retrieveBooks, createBook } from '../actions/index';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    removeBook: {
      reducer: (state, action) => state.splice(action.payload.index, 1),
      prepare: index => ({ payload: { index } }),
    },
  },
  extraReducers: {
    [retrieveBooks.pending]: state => {
      state.status = 'loading';
    },
    [retrieveBooks.fulfilled]: (state, action) => {
      state.status = 'succeded';
      state.books = action.payload;
    },
    [retrieveBooks.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [createBook.pending]: state => {
      state.status = 'Uploading';
    },
    [createBook.fulfilled]: (state, action) => {
      state.status = 'Book Uploaded';
      state.books.push(action.payload);
    },
    [createBook.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

const { removeBook } = books.actions;

export default books.reducer;
export { removeBook };
