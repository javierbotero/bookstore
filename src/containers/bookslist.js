/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCategory } from '../actions/index';
import { removeBook } from '../reducers/books';
import Book from '../components/book';
import { FILTERS } from '../constants/constants';
import CategoryFilter from '../components/categoryFilter';

const BooksList = props => {
  const {
    handleRemoveBook, filterBooks, category, books,
  } = props;
  const [localFilter, setLocalFilter] = useState(category);
  const handleFilterChange = e => {
    if (e.target.value !== 'All') {
      filterBooks(e.target.value);
    }
    setLocalFilter(e.target.value);
  };
  const filteredBooks = () => {
    const result = [];
    if (localFilter === FILTERS.all) {
      books.forEach((item, i) => {
        result.push(<Book key={item.id} book={item} delBook={() => handleRemoveBook(i)} />);
      });
    } else {
      books.forEach((item, i) => {
        if (item.category === localFilter) {
          result.push(<Book key={item.id} book={item} delBook={() => handleRemoveBook(i)} />);
        }
      });
    }
    return result;
  };
  return (
    <div>
      <div className="list-select">
        <CategoryFilter categories={FILTERS} handleSelection={handleFilterChange} name="categories" value={category} />
      </div>
      <div>
        {filteredBooks()}
      </div>
    </div>
  );
};

BooksList.propTypes = {
  filterBooks: PropTypes.func.isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const { books, category } = state;
  return { books, category };
};

const mapDispatchToProps = dispatch => ({
  handleRemoveBook: index => dispatch(removeBook(index)),
  filterBooks: category => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
