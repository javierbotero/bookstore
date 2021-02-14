/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookForm from '../containers/booksform';

const Book = props => {
  const { book, delBook, id } = props;
  const [hide, setHide] = useState(true);
  const toggleHide = () => setHide(!hide);
  const width = 80;
  const height = 80;
  const strWidth = 6;
  const radius = (width / 2) - (strWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const strCircumference = `${circumference} ${circumference}`;
  const completed = circumference - ((circumference / 100) * book.completed);
  return (
    <div>
      <div className="book-container">
        <div className="book-child">
          <p className="School-of">{book.category}</p>
          <h4 className="title">{book.title}</h4>
          <p className="Comments">Jhon Doe</p>
          <ul className="links">
            <li className="Comments">Comments</li>
            <li className="Comments" onClick={book => delBook(book)} onKeyPress={book => delBook(book)}>Remove</li>
            <li className="Comments" onClick={toggleHide} onKeyDown={toggleHide}>Edit</li>
          </ul>
        </div>
        <div className="book-child records">
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
              stroke="#e8e8e8"
              style={{
                strokeWidth: strWidth,
                fill: 'transparent',
              }}
            />
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
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
              }}
            />
          </svg>
          <div className="records-numbers">
            <h4>68%</h4>
            <p>Completed</p>
          </div>
        </div>
        <div className="book-child">
          <h5 className="Current-Chapter ">CURRENT CHAPTER</h5>
          <p className="Current-Lesson">Introduction</p>
          <button type="button" className="Rectangle-2"><span className="Update-progress">UPDATE PROGRESS</span></button>
        </div>
      </div>
      <div className={hide ? 'hide' : ''}>
        <div role="button" tabIndex="0" className="close" onClick={toggleHide} onKeyDown={toggleHide}>x</div>
        <BookForm book={book} id={id} setHide={setHide} />
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
  delBook: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Book;
