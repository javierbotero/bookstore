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
    category: FILTERS.category,
  });
  const { getBook } = props;
  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (state.category !== 'Category') {
      getBook(state.title, state.category);
      setState({
        title: '',
        category: FILTERS.category,
      });
    }
  };
  return (
    <div>
      <div className="layout">
        <h3>ADD NEW BOOK</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} name="title" pĺaceholder="Book Title" />
          <label htmlFor="categories">
            Choose a category:
            <CategoryFilter categories={FILTERS} handleSelectionCreation={handleChange} creation name="category" value={state.category} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

BookForm.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getBook: (title, category) => dispatch(addBook(title, category)),
});

export default connect(null, mapDispatchToProps)(BookForm);
