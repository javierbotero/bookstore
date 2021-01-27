const CREATE_BOOK = 'CREATE_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';

const addBook = book => {
  const { title, category } = book;

  return {
    type: CREATE_BOOK,
    payload: { title, category },
  };
};

const removeBook = index => ({
  type: REMOVE_BOOK,
  payload: { index },
});

export {
  addBook, removeBook, CREATE_BOOK, REMOVE_BOOK,
};
