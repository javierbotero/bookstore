/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBook } from '../actions/index';
import { FILTERS } from '../constants/constants';
import CategoryFilter from '../components/categoryFilter';

const BookForm = props => {
  const [state, setState] = useState({
    title: '',
    category: FILTERS.action,
  });
  const { getBook } = props;
  const handleChange = (e, title = false) => {
    if (title) {
      setState({ ...state, title: e.target.value });
    } else {
      setState({ ...state, category: e.target.value });
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    getBook(state.title, state.category);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={e => handleChange(e, true)} pĺaceholder="Title Book" />
      <label htmlFor="categories">
        Choose a category:
        <CategoryFilter categories={FILTERS} handleSelectionCreation={handleChange} creation name="categories" value={state.category} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

BookForm.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getBook: (title, category) => dispatch(addBook(title, category)),
});

export default connect(null, mapDispatchToProps)(BookForm);
