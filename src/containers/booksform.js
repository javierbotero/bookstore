/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';
import CategoryFilter from '../components/categoryFilter';
import { createBook } from '../actions/index';
import displayErrors from '../helpers/helpers';
import { removeError } from '../reducers/books';

const BookForm = props => {
  const [state, setState] = useState({
    title: '',
    category: FILTERS.category,
    author: '',
    completed: 0,
  });
  const {
    sendBook, errors, cleanError, id,
  } = props;
  useEffect(() => {
    if (errors) {
      document.querySelector('.errorForm').classList += ' display-error';
      displayErrors(errors, 'errorForm');
    }
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    cleanError();
    document.querySelector('.errorForm').classList.remove('display-error');
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (state.category !== 'Category' && state.title.length > 0) {
      await sendBook({ id, book: state });
      setState({
        title: '',
        category: FILTERS.category,
        author: '',
      });
      document.querySelector('input').value = '';
      document.querySelector('.errorForm').classList.remove('display-error');
    } else {
      document.querySelector('.errorForm').classList += ' display-error';
      document.querySelector('.errorForm').innerHTML = 'Please fill the form correctly';
    }
  };
  return (
    <div>
      <div className="layout form-container">
        <h3 className="title-form">ADD NEW BOOK</h3>
        <div className="Error errorForm" />
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
  cleanError: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  errors: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  sendBook: data => dispatch(createBook(data)),
  cleanError: () => dispatch(removeError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
