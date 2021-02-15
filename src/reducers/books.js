/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  retrieveBooks,
  createBook,
  updateBook,
  removeBook,
} from '../actions/index';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    removeError: state => { state.error = null; },
  },
  extraReducers: {
    [retrieveBooks.pending]: state => {
      state.status = 'loading';
    },
    [retrieveBooks.fulfilled]: (state, action) => {
      state.status = 'succeded';
      state.books = action.payload;
      state.error = null;
    },
    [retrieveBooks.rejected]: (state, action) => {
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
        state.error = null;
      } else {
        state.status = 'failed';
        state.error = action.payload;
      }
    },
    [createBook.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [updateBook.pending]: state => {
      state.status = 'Updating Book';
    },
    [updateBook.fulfilled]: (state, action) => {
      if (!action.payload.response.title) {
        state.status = 'failed';
        state.error = action.payload.response;
      } else {
        state.status = 'Book Updated';
        const newArr = [...state.books];
        newArr[action.payload.reduxId] = action.payload.response;
        state.books = newArr;
        state.error = null;
      }
    },
    [updateBook.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.response;
    },
    [removeBook.pending]: state => { state.status = 'Pending Deletion Book'; },
    [removeBook.fulfilled]: (state, action) => {
      if (action.payload.response.data === 'Book destroyed') {
        state.books.splice(action.payload.reduxId, 1);
        state.error = null;
      } else {
        state.status = 'Failed deletion book';
        state.error = action.payload.response;
      }
    },
    [removeBook.rejected]: (state, action) => {
      state.status = 'failed removing book';
      state.error = action.payload.response;
    },
  },
});

const { removeError } = books.actions;

export default books.reducer;
export { removeBook, removeError };
