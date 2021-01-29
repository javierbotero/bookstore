/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBook, setCategory } from '../actions';
import Book from './book';
import { FILTERS } from '../constants/constants';
import Options from './options';

const BooksList = props => {
  const {
    deleteBook, filterBooks, category, books,
  } = props;
  const handleSelection = e => {
    filterBooks(e.target.value);
  };
  const filteredBooks = () => {
    const result = [];
    if (category === FILTERS.all) {
      books.forEach((item, i) => {
        result.push(<Book key={item.id} book={item} delBook={() => deleteBook(i)} />);
      });
    } else {
      books.forEach((item, i) => {
        if (item.category === category) {
          result.push(<Book key={item.id} book={item} delBook={() => deleteBook(i)} />);
        }
      });
    }
    return result;
  };
  return (
    <div>
      <label htmlFor="categories">
        Set filter
        <Options categories={FILTERS} handleSelection={handleSelection} name="categories" value={category} />
      </label>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Remove</th>
          </tr>
        </thead>
        {filteredBooks()}
      </table>
    </div>
  );
};

BooksList.propTypes = {
  filterBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const { books, category } = state;
  return { books, category };
};

const mapDispatchToProps = dispatch => ({
  deleteBook: index => dispatch(removeBook(index)),
  filterBooks: category => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
