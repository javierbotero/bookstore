import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBook, setCategory } from '../actions';
import Book from './book';
import { CATEGORIES, FILTERS } from '../constants/constants';

const BooksList = props => {
  const { filteredBooks, deleteBook, filterBooks } = props;
  const handleSelection = e => {
    filterBooks(e.target.value);
  };
  return (
    <div>
      <label htmlFor="categories">
        Set filter
        <select name="categories" onChange={handleSelection}>
          {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <table>
        {filteredBooks.map(
          (item, i) => <Book key={item} book={item} delBook={deleteBook} index={i} />,
        )}
      </table>
    </div>
  );
};

BooksList.propTypes = {
  filteredBooks: PropTypes.arrayOf.isRequired,
  filterBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { books, category } = state;
  let filteredBooks;
  if (category === FILTERS.all) {
    filteredBooks = books;
  } else {
    filteredBooks = books.filter(book => book.category === category);
  }
  console.log(filteredBooks);
  return { filteredBooks, books };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteBook: index => dispatch(removeBook(index, ownProps.books)),
  filterBooks: category => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
