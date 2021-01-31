import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from './book';
import { removeBook } from '../actions/index';

const All = props => {
  const { books, delBook } = props;
  console.log(books);
  const result = [];
  books.filter((book, i) => result.push(<Book delBook={() => delBook(i)} book={book} />));
  console.log('returning in App, result: ', result);
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Category</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {result}
      </tbody>
    </table>
  );
};

All.propTypes = {
  books: PropTypes.objectOf(PropTypes.string).isRequired,
  delBook: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = dispatch => ({
  delBook: i => dispatch(removeBook(i)),
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
