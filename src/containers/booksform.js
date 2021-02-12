/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';
import CategoryFilter from '../components/categoryFilter';
import { createBook } from '../actions/index';
import displayErrors from '../helpers/helpers';

const BookForm = props => {
  const [state, setState] = useState({
    title: '',
    category: FILTERS.category,
    author: '',
    completed: 0,
  });
  const { sendBook, errors } = props;
  useEffect(() => {
    if (errors) {
      document.querySelector('.Error').classList += ' display-error';
      document.querySelector('.Error').innerHTML += `/${displayErrors(errors)}`;
    }
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    document.querySelector('.Error').classList.remove('display-error');
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (state.category !== 'Category' && state.title.length > 0) {
      await sendBook({ id: localStorage.getItem('bookStoreUserId'), book: state });
      setState({
        title: '',
        category: FILTERS.category,
        author: '',
      });
      document.querySelector('input').value = '';
      document.querySelector('.Error').classList.remove('display-error');
    } else {
      document.querySelector('.Error').classList += ' display-error';
      document.querySelector('.Error').innerHTML = `Please fill the form correctly /${displayErrors(errors)}`;
    }
  };
  return (
    <div>
      <div className="layout form-container">
        <div className="Error">
          Please make sure to fill the form, errors:
          {displayErrors(errors)}
        </div>
        <h3 className="title-form">ADD NEW BOOK</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} name="title" placeHolder="Book Title" />
          <CategoryFilter categories={FILTERS} handleSelectionCreation={handleChange} creation name="category" value={state.category} />
          <input type="text" onChange={handleChange} name="author" placeHolder="Author" />
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
  errors: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  sendBook: data => dispatch(createBook(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
