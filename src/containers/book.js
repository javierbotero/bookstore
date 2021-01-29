/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
  const { book, delBook } = props;
  return (
    <tr>
      <td>{book.id.slice(0, 7)}</td>
      <td>{book.title}</td>
      <td>{book.category}</td>
      <td onClick={book => delBook(book)} onKeyPress={book => delBook(book)}>Delete Book</td>
    </tr>
  );
};

Book.propTypes = {
  book: PropTypes.shape.isRequired,
  delBook: PropTypes.func.isRequired,
};

export default Book;
