const CREATE_BOOK = 'CREATE_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const SET_CATEGORY = 'SET_CATEGORY';

const addBook = book => {
  const { title, category } = book;

  return {
    type: CREATE_BOOK,
    payload: { title, category },
  };
};

const removeBook = (index, books) => {
  const newBooks = [...books];
  newBooks.splice(index, 1);

  return {
    type: REMOVE_BOOK,
    payload: { newBooks },
  };
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
