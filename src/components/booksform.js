import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBook } from '../actions/index';

const BooksForm = props => {
  const [state, setState] = useState({
    title: '',
    category: '',
  });
  const { getBook } = props;
  const categories = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];
  const setTitle = e => setState(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    getBook(state.title, state.category);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={setTitle} pĺaceholder="Title Book" />
      <label htmlFor="categories">
        Choose a category:
        <select name="categories">
          {categories.map(category => <option value={category}>{category}</option>)}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

BooksForm.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getBook: (title, category) => dispatch(addBook(title, category)),
});

export default connect(mapDispatchToProps)(BooksForm);
