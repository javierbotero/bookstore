/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
  const { book, delBook } = props;
  return (
    <div>
      <div>
        <p>{book.category}</p>
        <h4>{book.title}</h4>
        <p>Jhon Doe</p>
        <ul>
          <li>Comments</li>
          <li onClick={book => delBook(book)} onKeyPress={book => delBook(book)}>Remove</li>
          <li>Edit</li>
        </ul>
      </div>
      <div>
        <div className="oval" />
        <div>
          <h4>68%</h4>
          <p>Completed</p>
        </div>
      </div>
      <div>
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
