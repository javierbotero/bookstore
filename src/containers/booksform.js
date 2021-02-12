/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';
import CategoryFilter from '../components/categoryFilter';
import { createBook } from '../actions/index';

const BookForm = props => {
  const [state, setState] = useState({
    title: '',
    category: FILTERS.category,
    author: '',
  });
  const { sendBook, errors } = props;
  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (state.category !== 'Category' && state.title.length > 0) {
      await sendBook({ user_id: localStorage.getItem('bookStoreUserId'), book: state });
      setState({
        title: '',
        category: FILTERS.category,
        author: '',
      });
      document.querySelector('input').value = '';
      document.querySelector('.Error').classList.remove('display-error');
    } else {
      document.querySelector('.Error').classList += ' display-error';
      document.querySelector('.Error').innerHTML += `/${errors.status}`;
    }
  };
  return (
    <div>
      <div className="layout form-container">
        <div className="Error">
          Please make sure to fill the form, errors:
          {errors.status}
        </div>
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
  sendBook: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.strings).isRequired,
};

const mapStateToProps = state => ({
  errors: state.books,
});

const mapDispatchToProps = dispatch => ({
  sendBook: data => dispatch(createBook(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
