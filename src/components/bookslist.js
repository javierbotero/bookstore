import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBook } from '../actions';
import Book from './book';

const BooksList = props => {
  const { books, deleteBook } = props;
  return (
    <table>
      {books.map(item => <Book book={item} removeBook={deleteBook} />)}
    </table>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { books } = state;
  return { books };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteBook: book => dispatch(removeBook(book, ownProps.books)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
