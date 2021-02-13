import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../constants/constants';

const CHANGE_FILTER = 'CHANGE_FILTER';

const setCategory = filter => ({
  type: CHANGE_FILTER,
  payload: {
    filter,
  },
});

const initCreator = (verb, data) => ({
  method: verb,
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(data),
});

const createBook = createAsyncThunk('create', async ({
  book, id,
}) => {
  const data = {
    id,
    book: {
      title: book.title,
      category: book.category,
      author: book.author,
      completed: book.completed,
    },
  };
  const init = initCreator('POST', data);
  const response = await fetch(`${URL}books`, init)
    .then(data => data.json())
    .catch(error => error.json());
  return response;
});

const retrieveBooks = createAsyncThunk('retrieve', async ({ url, verb, data }) => {
  console.log('running retrieveBooks actionthunk');
  const init = initCreator(verb, data);
  const response = await fetch(url, init)
    .then(data => data.json())
    .catch(error => error);

  console.log('Running thunk action retrieveBooks', response);
  return response;
});

export {
  setCategory,
  CHANGE_FILTER,
  initCreator,
  retrieveBooks,
  createBook,
};
