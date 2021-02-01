/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
  const { book, delBook } = props;
  const width = 80;
  const height = 80;
  const strWidth = 6;
  const radius = (width / 2) - (strWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const strCircumference = `${circumference} ${circumference}`;
  const completed = circumference - ((circumference / 100) * book.completed);
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
        <svg style={{
          width,
          height,
        }}
        >
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="55%">
              <stop offset="90%" stopColor="#379cf6" />
              <stop offset="100%" stopColor="#307bbe" />
            </radialGradient>
          </defs>
          <circle
            r={radius}
            cx={width / 2}
            cy={height / 2}
            stroke="url(#gradient)"
            style={{
              strokeWidth: strWidth,
              strokeDasharray: strCircumference,
              strokeDashoffset: completed,
              fill: 'transparent',
            }}
          />
        </svg>
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
