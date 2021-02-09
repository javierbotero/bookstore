import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from './book';
import { removeBook, retrieveBooks } from '../actions/index';

const All = props => {
  const { books, delBook, useApi } = props;
  const id = localStorage.getItem('bookStoreUserId');
  const fetchedBooks = useApi(URL, 'POST', { id });
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
};

const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = dispatch => ({
  delBook: i => dispatch(removeBook(i)),
  useApi: (url, verb, data) => dispatch(retrieveBooks({ url, verb, data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
