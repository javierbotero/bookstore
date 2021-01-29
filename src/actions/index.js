import { v4 as uuidv4 } from 'uuid';

const CREATE_BOOK = 'CREATE_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const SET_CATEGORY = 'SET_CATEGORY';

const addBook = (title, category) => {
  const id = uuidv4();

  return {
    type: CREATE_BOOK,
    payload: { title, category, id },
  };
};

const deleteBook = (index, books) => {
  const newBooks = [...books];
  newBooks.splice(index, 1);
  return {
    type: REMOVE_BOOK,
    payload: { newBooks },
  };
};

const removeBook = i => (dispatch, getState) => {
  const { books } = getState();
  dispatch(deleteBook(i, books));
};

const setCategory = filter => ({
  type: SET_CATEGORY,
  payload: {
    filter,
  },
});

export {
  addBook, removeBook, setCategory, CREATE_BOOK, REMOVE_BOOK, SET_CATEGORY,
};
