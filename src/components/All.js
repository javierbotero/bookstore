import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from './book';
import { retrieveBooks } from '../actions/index';
import { removeBook } from '../reducers/books';

const All = props => {
  const {
    books, delBook, useApi, status, dispatch,
  } = props;
  const id = localStorage.getItem('bookStoreUserId');
  const notFirstTime = localStorage.getItem('bookStoreNotFirstTime');
  useEffect(() => {
    const fetchedBooks = useApi(URL, 'POST', { id });
    if (fetchedBooks.length === 0 && notFirstTime) {
      // create books and send them to the API
    }
  }, [status, dispatch, URL, id]);
  const result = [];
  books.filter(
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
  useApi: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  books: state.books,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  delBook: i => dispatch(removeBook(i)),
  useApi: (url, verb, data) => dispatch(retrieveBooks({ url, verb, data })),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
