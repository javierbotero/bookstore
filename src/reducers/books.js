import { CREATE_BOOK, REMOVE_BOOK } from '../actions/index';
import { FILTERS } from '../constants/constants';

const myState = [
  {
    title: 'A Hundred Years of Solitude',
    category: FILTERS.biography,
    id: Math.round(Math.random() * 10000),
  },
  {
    title: 'The Iliad',
    category: FILTERS.history,
    id: Math.round(Math.random() * 10000),
  },
  {
    title: 'The Shining',
    category: FILTERS.horror,
    id: Math.round(Math.random() * 10000),
  },
  {
    title: 'The Little Prince',
    category: FILTERS.kids,
    id: Math.round(Math.random() * 10000),
  },
  {
    title: 'The Invation',
    category: FILTERS.scifi,
    id: Math.round(Math.random() * 10000),
  },
];

const books = (state = myState, action) => {
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
