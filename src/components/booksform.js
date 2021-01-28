/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBook } from '../actions/index';
import { FILTERS } from '../constants/constants';
import Options from './options';

const BooksForm = props => {
  const [state, setState] = useState({
    title: '',
    category: '',
  });
  const { getBook } = props;
  const setTitle = e => setState({ ...state, title: e.target.value });
  const setCategory = e => setState({ ...state, category: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    getBook(state.title, state.category);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={setTitle} pĺaceholder="Title Book" />
      <label htmlFor="categories">
        Choose a category:
        <Options categories={FILTERS} handleSelection={setCategory} creation name="categories" />
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

export default connect(null, mapDispatchToProps)(BooksForm);
