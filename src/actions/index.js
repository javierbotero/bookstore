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
  const init = initCreator(verb, data);
  const response = await fetch(url, init)
    .then(data => data.json())
    .catch(error => error);
  return response;
});

const updateBook = createAsyncThunk('update-book', async data => {
  const init = initCreator('PUT', { book: data.book });
  const response = await fetch(`${URL}books/${data.id}`, init)
    .then(data => data.json())
    .catch(error => error.json());
  console.log(response);
  return { reduxId: data.reduxId, response };
});

export {
  setCategory,
  CHANGE_FILTER,
  initCreator,
  retrieveBooks,
  createBook,
  updateBook,
};
