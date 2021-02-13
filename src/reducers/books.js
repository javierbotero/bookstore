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
    removeError: state => { state.error = null; },
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
      console.log(action.payload);
      state.status = 'failed';
      state.error = action.payload;
    },
    [createBook.pending]: state => {
      state.status = 'Uploading';
    },
    [createBook.fulfilled]: (state, action) => {
      if (action.payload.title) {
        state.status = 'Book Uploaded';
        state.books.push(action.payload);
      } else {
        state.status = 'failed';
        state.error = action.payload;
      }
    },
    [createBook.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

const { removeBook, removeError } = books.actions;

export default books.reducer;
export { removeBook, removeError };
