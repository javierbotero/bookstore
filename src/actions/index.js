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

const removeBook = (book, books) => {
  const newBooks = books.filter(item => book !== item);

  return {
    type: REMOVE_BOOK,
    payload: { newBooks },
  };
};

const setFilter = filter => ({
  type: SET_CATEGORY,
  payload: {
    filter,
  },
});

export {
  addBook, removeBook, setFilter, CREATE_BOOK, REMOVE_BOOK, SET_CATEGORY,
};
