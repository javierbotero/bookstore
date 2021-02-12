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
    author: 'Jhon Doe',
    completed: 70,
  },
  {
    title: 'The Iliad',
    category: FILTERS.history,
    author: 'Jhon Doe',
    completed: 70,
  },
  {
    title: 'The Shining',
    category: FILTERS.horror,
    author: 'Jhon Doe',
    completed: 70,
  },
  {
    title: 'The Little Prince',
    category: FILTERS.kids,
    author: 'Jhon Doe',
    completed: 70,
  },
  {
    title: 'The Invation',
    category: FILTERS.scifi,
    author: 'Jhon Doe',
    completed: 70,
  },
];
const CATEGORIES = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];
const URL = 'http://localhost:3000/';

export {
  FILTERS, CATEGORIES, URL, DEFAULT_BOOKS,
};
