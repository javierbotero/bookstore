/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookForm from '../containers/booksform';
import Comment from './comment';
import {
  removeBook,
  updateBook,
  retrieveComments,
} from '../actions/index';
import displayErrors, { div } from '../helpers/helpers';

const Book = props => {
  const {
    book,
    id,
    reduxId,
    changeBook,
    deleteBook,
    getComments,
    comments,
  } = props;
  const [hide, setHide] = useState(true);
  const [hideFormProgress, setHideFormProgress] = useState(true);
  const [progress, setProgress] = useState(book.completed);
  const [error, setError] = useState(false);
  const [hideComments, setHideComments] = useState(true);
  const [requestComments, setRequestComments] = useState(true);
  const [commentElements, setCommentElements] = useState([]);
  const toogleHideFormProgress = () => setHideFormProgress(!hideFormProgress);
  const toggleHide = () => setHide(!hide);
  const width = 80;
  const height = 80;
  const strWidth = 6;
  const radius = (width / 2) - (strWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const strCircumference = `${circumference} ${circumference}`;
  const completed = circumference - ((circumference / 100) * book.completed);
  const sendProgress = async e => {
    e.preventDefault();
    const data = {
      reduxId,
      id: book.id,
      book: {
        ...book,
        completed: progress,
      },
    };
    const response = await changeBook(data);
    if (response.payload.response.title) {
      toogleHideFormProgress();
    } else {
      setError(useSelector(state => state.books.error));
      displayErrors(error, '.updateProgress');
    }
  };
  const updateProgress = e => {
    setError(false);
    setProgress(e.target.value);
  };
  const handleDelete = async () => {
    const data = { reduxId, id: book.id };
    const action = await deleteBook(data);
    if (action.payload.response.data) {
      div('.Error').classList.remove('display-error');
    }
  };
  const toggleComments = () => setHideComments(!hideComments);
  const showComments = async () => {
    toggleComments();
    if (requestComments) {
      await getComments({
        id: book.id,
        reduxId,
      })
        .then(data => {
          setRequestComments(false);
          return data;
        })
        .catch(error => error);
    }

    const elements = [];
    if (comments[reduxId]) {
      comments[reduxId].forEach((cmt, i) => {
        elements.push(<Comment reduxId={reduxId} reduxCommentId={i} comment={cmt} />);
      });
    }

    setCommentElements([...elements]);
  };

  return (
    <div>
      <div className="book-container">
        <div className="book-child">
          <p className="School-of">{book.category}</p>
          <h4 className="title">{book.title}</h4>
          <p className="Comments">{book.author}</p>
          <ul className="links">
            <li className="Comments" onClick={showComments} onKeyDown={showComments}>Comments</li>
            <li className="Comments" onClick={handleDelete} onKeyPress={handleDelete}>Remove</li>
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
            <h4>
              {book.completed}
              %
            </h4>
            <p>Completed</p>
          </div>
        </div>
        <div className="book-child">
          <h5 className="Current-Chapter ">CURRENT CHAPTER</h5>
          <p className="Current-Lesson">Introduction</p>
          <button type="button" className="Rectangle-2" onClick={toogleHideFormProgress}><span className="Update-progress">UPDATE PROGRESS</span></button>
          <form className={`updateProgress ${hideFormProgress ? 'hide' : ''}`} onSubmit={sendProgress}>
            <div className={`Error ${error ? '' : 'hide'}`} />
            <input type="text" value={progress} onChange={updateProgress} />
            <input className="Rectangle-2 Update-progress" type="submit" value="Send" />
          </form>
        </div>
      </div>
      <div className={`book-comments ${hideComments ? 'hide' : ''}`}>
        <div role="button" tabIndex="0" className="close" onClick={toggleComments} onKeyDown={toggleComments}>x</div>
        {commentElements}
      </div>
      <div className={hide ? 'hide' : ''}>
        <div role="button" tabIndex="0" className="close" onClick={toggleHide} onKeyDown={toggleHide}>x</div>
        <BookForm book={book} id={id} toggleHide={toggleHide} reduxId={reduxId} bookId={book.id} />
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  reduxId: PropTypes.number.isRequired,
  changeBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.node.isRequired,
};

const mapStateToProps = state => {
  const { errors } = state.books;
  const { comments } = state.comments;
  return {
    errors,
    comments,
  };
};

const mapDispatchToProps = dispatch => ({
  changeBook: data => dispatch(updateBook(data)),
  deleteBook: data => dispatch(removeBook(data)),
  getComments: data => dispatch(retrieveComments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
