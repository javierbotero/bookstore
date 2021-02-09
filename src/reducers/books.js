/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import { retrieveBooks } from '../actions/index';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    createBook: {
      reducer: (state, action) => state.push({
        title: action.payload.title,
        category: action.payload.category,
        id: action.payload.id,
        completed: 0,
      }),
      prepare: (title, category) => {
        const id = uuidv4();

        return {
          payload: {
            title, category, id,
          },
        };
      },
    },
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
  },
});

const { createBook, removeBook } = books.actions;

export default books.reducer;
export {
  createBook,
  removeBook,
};
