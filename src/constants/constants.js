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
    author: 'Grabriel García Marquez',
    completed: 70,
  },
  {
    title: 'The Iliad',
    category: FILTERS.history,
    author: 'Homer',
    completed: 70,
  },
  {
    title: 'The Shining',
    category: FILTERS.horror,
    author: 'Stephen King',
    completed: 70,
  },
  {
    title: 'The Little Prince',
    category: FILTERS.kids,
    author: 'Antoine de Saint-Exupéry',
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
