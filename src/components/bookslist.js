import React from 'react';
import { connect } from 'react-redux';
import Book from './book';

const BooksList = (props) => {
  const { books } = props;
  return (
    <table>
      {books.map(item =>
        <Book book={item} />)}
    </table>
  );
};

const mapStateToProps = state => {
  const { books } = state;
  return { books };
};

export default connect(mapStateToProps)(BooksList);
