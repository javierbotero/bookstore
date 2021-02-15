/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';
import CategoryFilter from '../components/categoryFilter';
import { createBook, updateBook } from '../actions/index';
import displayErrors from '../helpers/helpers';
import { removeError } from '../reducers/books';

const BookForm = props => {
  const {
    sendBook, editBook, errors, cleanError, id, book, toggleHide, reduxId, bookId,
  } = props;
  const [state, setState] = useState({
    title: book ? book.title : '',
    category: book ? book.category : FILTERS.category,
    author: book ? book.author : '',
    completed: book ? book.completed : 0,
  });
  let errorForm;
  useEffect(() => {
    errorForm = document.querySelector(book ? '.errorUpdate' : '.errorForm');
    if (errors) {
      displayErrors(errors, book ? '.errorUpdate' : '.errorForm');
    }
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    cleanError();
    errorForm.classList.remove('display-error');
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (state.category !== 'Category' && state.title.length > 0) {
      if (book) {
        const action = await editBook({
          reduxId,
          id: bookId,
          book: {
            ...state,
            completed: book.completed,
          },
        });
        if (action.payload.response.title) {
          toggleHide(false);
        }
      } else {
        const action = await sendBook({ id, book: state });
        if (action.payload.title) {
          setState({
            title: '',
            category: FILTERS.category,
            author: '',
            completed: 0,
          });
        }
      }
    } else {
      errorForm.classList += ' display-error';
      errorForm.innerHTML = 'Please fill the form correctly';
    }
  };
  return (
    <div>
      <div className="layout form-container">
        <h3 className="title-form">{book ? 'EDIT THE BOOK' : 'ADD NEW BOOK'}</h3>
        <div className={`Error ${book ? 'errorUpdate' : 'errorForm'} ${errors ? 'display-error' : ''}`} />
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={state.title} name="title" className={book ? 'editBook' : 'createBook'} placeHolder="Book Title" />
          <CategoryFilter categories={FILTERS} handleSelectionCreation={handleChange} creation name="category" value={state.category} />
          <input type="text" onChange={handleChange} value={state.author} name="author" className={book ? 'editBook' : 'createBook'} placeHolder="Author" />
          <button className="Rectangle-2 Rectangle-3" type="submit">{book ? 'EDIT' : 'ADD NEW BOOK'}</button>
        </form>
      </div>
    </div>
  );
};

BookForm.propTypes = {
  sendBook: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.strings),
  cleanError: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  book: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      completed: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
    }),
    PropTypes.bool,
  ]),
  toggleHide: PropTypes.func,
  reduxId: PropTypes.number,
  bookId: PropTypes.string,
};

BookForm.defaultProps = {
  book: false,
  errors: null,
  toggleHide: false,
  reduxId: null,
  bookId: null,
};

const mapStateToProps = state => ({
  errors: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  sendBook: data => dispatch(createBook(data)),
  cleanError: () => dispatch(removeError()),
  editBook: data => dispatch(updateBook(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
