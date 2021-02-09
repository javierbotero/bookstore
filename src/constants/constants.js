import { v4 as uuidv4 } from 'uuid';

const FILTERS = {
  action: 'Action',
  biography: 'Biography',
  history: 'History',
  horror: 'Horror',
  kids: 'Kids',
  Learning: 'Learning',
  scifi: 'Sci-Fi',
  all: 'All',
  category: 'Category',
};

const DEFAULT_BOOKS = [
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

const CATEGORIES = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];

const URL = 'http://localhost:3000/users';

const LOGGIN_URL = 'http://localhost:3000/loggin';

export {
  FILTERS, CATEGORIES, URL, LOGGIN_URL, DEFAULT_BOOKS,
};
