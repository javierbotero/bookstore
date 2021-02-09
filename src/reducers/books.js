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
});

const { createBook, removeBook } = books.actions;

export default books.reducer;
export {
  createBook,
  removeBook,
};
