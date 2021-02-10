import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from './book';
import { retrieveBooks, createBook } from '../actions/index';
import { removeBook } from '../reducers/books';
import { DEFAULT_BOOKS } from '../constants/constants';

const All = props => {
  const {
    books, delBook, getBooks, status, sendBook,
  } = props;
  const id = localStorage.getItem('bookStoreUserId');
  const notFirstTime = localStorage.getItem('booksStoredNotFirstTime');
  useEffect(() => {
    const fetchedBooks = getBooks(URL, 'POST', { id });
    if (fetchedBooks.length === 0 && notFirstTime) {
      DEFAULT_BOOKS.forEach(async book => {
        await sendBook({
          id,
          book,
        });
      });
      localStorage.setItem('booksStoredNotFirstTime', true);
    }
  }, [status, URL, id]);
  const result = [];
  console.log('Books: ', books.books);
  books.books.filter(
    (book, i) => result.push(<Book key={book.id} delBook={() => delBook(i)} book={book} />),
  );
  return (
    <div>
      {result}
    </div>
  );
};

All.propTypes = {
  books: PropTypes.objectOf(PropTypes.string).isRequired,
  delBook: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  sendBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  books: state.books,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  delBook: i => dispatch(removeBook(i)),
  getBooks: (url, verb, data) => dispatch(retrieveBooks({ url, verb, data })),
  sendBook: (title, category, author) => dispatch(createBook(title, category, author)),
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
