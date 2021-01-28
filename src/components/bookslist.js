import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBook, setFilter } from '../actions';
import Book from './book';

const BooksList = props => {
  const { filter, setFilter } = useState()
  const { filteredBooks, deleteBook } = props;
  return (
    <div>Set filter</div>
    <table>
      {filteredBooks.map(item => <Book book={item} delBook={deleteBook} />)}
    </table>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { books, category } = state;
  const filteredBooks = books.filter(book => book.category === category);
  return { filteredBooks, books };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteBook: book => dispatch(removeBook(book, ownProps.books)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
