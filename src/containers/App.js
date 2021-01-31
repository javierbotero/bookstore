import React from 'react';
import BookList from './bookslist';
import BookForm from './booksform';
import { CREATE_BOOK, REMOVE_BOOK } from '../actions/index';

const App = () => (
  <div>
    <BookList />
    <BookForm />
  </div>
);

export default App;
export { CREATE_BOOK, REMOVE_BOOK };
