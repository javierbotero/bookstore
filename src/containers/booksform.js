/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBook } from '../reducers/books';
import { FILTERS } from '../constants/constants';
import CategoryFilter from '../components/categoryFilter';
import initCreator from '../actions/index';

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
  const handleSubmit = async e => {
    e.preventDefault();
    if (state.category !== 'Category' && state.title.length > 0) {
      getBook(state.title, state.category);
      setState({
        title: '',
        category: FILTERS.category,
      });
      document.querySelector('input').value = '';
      document.querySelector('.Error').classList.remove('display-error');
      await useApi(URL, 'POST', { user_id: localStorage.getItem('bookStoreUserId'), ...state });
    } else {
      document.querySelector('.Error').classList += ' display-error';
    }
  };
  return (
    <div>
      <div className="layout form-container">
        <div className="Error">Please make sure to fill the form</div>
        <h3 className="title-form">ADD NEW BOOK</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} name="title" placeHolder="Book Title" />
          <CategoryFilter categories={FILTERS} handleSelectionCreation={handleChange} creation name="category" value={state.category} />
          <button className="Rectangle-2 Rectangle-3" type="submit">ADD BOOK</button>
        </form>
      </div>
    </div>
  );
};

BookForm.propTypes = {
  getBook: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getBook: (title, category) => dispatch(createBook(title, category)),
});

export default connect(null, mapDispatchToProps)(BookForm);
