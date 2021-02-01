/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
  const { book, delBook } = props;
  return (
    <div className="book-container">
      <div className="book-child">
        <p>{book.category}</p>
        <h4>{book.title}</h4>
        <p>Jhon Doe</p>
        <ul className="links">
          <li>Comments</li>
          <li onClick={book => delBook(book)} onKeyPress={book => delBook(book)}>Remove</li>
          <li>Edit</li>
        </ul>
      </div>
      <div className="book-child">
        <div className="oval" />
        <div>
          <h4>68%</h4>
          <p>Completed</p>
        </div>
      </div>
      <div className="book-child">
        <h5>CURRENT CHAPTER</h5>
        <p>Introduction</p>
        <button type="button">UPDATE PROGRESS</button>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
  delBook: PropTypes.func.isRequired,
};

export default Book;
