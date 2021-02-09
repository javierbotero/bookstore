import { createAsyncThunk } from '@reduxjs/toolkit';

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

const retrieveBooks = createAsyncThunk('retrieve', async ({ url, verb, data }) => {
  const init = initCreator(verb, data);
  const response = await fetch(url, init);
  return response;
});

export {
  setCategory,
  CHANGE_FILTER,
  initCreator,
  retrieveBooks,
};
