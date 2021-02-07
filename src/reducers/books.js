import { v4 as uuidv4 } from 'uuid';
import { CREATE_BOOK, REMOVE_BOOK } from '../actions/index';
import { FILTERS, URL } from '../constants/constants';

const id = localStorage.getItem('bookStoreUserId');

const init = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ id }),
};

const fetchedBooks = fetch(URL, init);

const initialState = [
  {
    title: 'A Hundred Years of Solitude',
    category: FILTERS.biography,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Iliad',
    category: FILTERS.history,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Shining',
    category: FILTERS.horror,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Little Prince',
    category: FILTERS.kids,
    id: uuidv4(),
    completed: 70,
  },
  {
    title: 'The Invation',
    category: FILTERS.scifi,
    id: uuidv4(),
    completed: 70,
  },
];

const books = (state = fetchedBooks.length === 0 ? initialState : fetchedBooks, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return [...state, {
        title: action.payload.title,
        category: action.payload.category,
        id: action.payload.id,
        completed: 0,
      }];
    case REMOVE_BOOK:
      return [...action.payload.newBooks];
    default:
      return state;
  }
};

export default books;
