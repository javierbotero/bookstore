import { CREATE_BOOK, REMOVE_BOOK } from '../actions/index';

const books = (state = [], action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return [...state, {
        title: action.payload.title,
        category: action.payload.category,
      }];
    case REMOVE_BOOK:
      return [...action.payload.newBooks];
    default:
      return state;
  }
};

export default books;
