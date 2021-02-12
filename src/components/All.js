import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from './book';
import { retrieveBooks, createBook } from '../actions/index';
import { removeBook } from '../reducers/books';
import { URL, DEFAULT_BOOKS } from '../constants/constants';

const All = props => {
  const {
    books, delBook, getBooks, sendBook,
  } = props;
  const id = localStorage.getItem('bookStoreUserId');
  const result = [];
  useEffect(() => {
    console.log('redner and books: ', books);
    if (books.status === 'idle') {
      getBooks(`${URL}user-books`, 'POST', { id });
    }
    if (books.status === 'succeded' && books.books.length === 0 && localStorage.getItem('booksStoredNotFirstTime') === 'false') {
      DEFAULT_BOOKS.forEach(async item => {
        await sendBook({
          id,
          book: {
            title: item.title,
            category: item.category,
            author: item.author,
            completed: item.completed,
          },
        });
      });
      localStorage.setItem('booksStoredNotFirstTime', true);
    }
  }, [books, URL, id]);
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
  sendBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = dispatch => ({
  delBook: i => dispatch(removeBook(i)),
  getBooks: (url, verb, data) => dispatch(retrieveBooks({ url, verb, data })),
  sendBook: (title, category, author) => dispatch(createBook(title, category, author)),
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
