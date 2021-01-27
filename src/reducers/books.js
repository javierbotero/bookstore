import { ADD_BOOK, REMOVE_BOOK } from '../actions/index';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, {
        title: action.payload.title,
        category: action.payload.category,
      }];
    case REMOVE_BOOK:
      state.splice(action.payload.index, 1);
      return [...state];
    default:
      return state;
  }
};

export default reducer;
