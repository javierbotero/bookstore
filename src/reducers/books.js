import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import { FILTERS } from '../constants/constants';

const initialState = [
  {
    title: 'A Hundred Years of Solitude',
    category: FILTERS.biography,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Iliad',
    category: FILTERS.history,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Shining',
    category: FILTERS.horror,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Little Prince',
    category: FILTERS.kids,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Invation',
    category: FILTERS.scifi,
    id: uuidv4(),
    completed: 70,
  },
];

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
