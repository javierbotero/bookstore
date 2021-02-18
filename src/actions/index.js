import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL, initCreator } from '../constants/constants';

const CHANGE_FILTER = 'CHANGE_FILTER';

const setCategory = filter => ({
  type: CHANGE_FILTER,
  payload: {
    filter,
  },
});

const createBook = createAsyncThunk('create', async ({
  book, id,
}) => {
  const data = { id, book };
  const init = initCreator('POST', data);
  const response = await fetch(`${URL}books`, init)
    .then(data => data.json())
    .catch(error => error.json());
  return response;
});

const retrieveBooks = createAsyncThunk('retrieve', async data => {
  const init = initCreator('POST', data);
  const response = await fetch(`${URL}user-books`, init)
    .then(data => data.json())
    .catch(error => error);
  return response;
});

const updateBook = createAsyncThunk('update-book', async data => {
  const init = initCreator('PUT', { book: data.book });
  const response = await fetch(`${URL}books/${data.id}`, init)
    .then(data => data.json())
    .catch(error => error.json());
  return { reduxId: data.reduxId, response };
});

const removeBook = createAsyncThunk('remove-book', async data => {
  const init = initCreator('DELETE');
  const response = await fetch(`${URL}books/${data.id}`, init)
    .then(data => data.json())
    .catch(error => error.json());
  return { reduxId: data.reduxId, response };
});

const retrieveComments = createAsyncThunk('retrieve-comments', async data => {
  const init = initCreator('GET');
  const response = await fetch(`${URL}comments/${data.id}`, init)
    .then(data => data.json())
    .catch(error => error);
  return { reduxId: data.reduxId, response };
});

const updateComment = createAsyncThunk('update-comment', async data => {
  const init = initCreator('PUT', data.item);
  const response = await fetch(`${URL}comments/${data.id}`, init)
    .then(data => data.json())
    .then(error => error.json());
  return { reduxId: data.reduxId, response };
});

const destroyComment = createAsyncThunk('destroy-comment', async data => {
  const init = initCreator('DELETE');
  const response = fetch(`${URL}comments/${data.id}`, init)
    .then(data => data.json())
    .then(error => error.json());
  return { reduxId: data.reduxId, reduxCommentId: data.reduxCommentId, response };
});

export {
  setCategory,
  CHANGE_FILTER,
  initCreator,
  retrieveBooks,
  createBook,
  updateBook,
  removeBook,
  retrieveComments,
  updateComment,
  destroyComment,
};
