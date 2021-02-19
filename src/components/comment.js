import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { destroyComment, updateComment } from '../actions/index';

const Comment = props => {
  const { reduxId, reduxCommentId, comment } = props;
  const [hideForm, setHideForm] = useState(true);
  const [content, setContent] = useState(comment.body);
  const dispatch = useDispatch();

  const deleteComment = async () => {
    await dispatch(destroyComment({
      id: comment.id,
      reduxId,
      reduxCommentId,
    }));
  };

  const toggleHideForm = () => { setHideForm(!hideForm); };

  const updateContent = e => {
    setContent(e.target.value);
  };

  const sendUpdateComment = () => {
    dispatch(updateComment({
      reduxId,
      reduxCommentId,
      item: {
        body: content,
        id: comment.id,
      },
    }))
      .then(resp => {
        setHideForm(true);
        return resp;
      })
      .catch(err => err);
  };

  return (
    <div>
      <div>
        {content}
      </div>
      <ul className="links">
        <li><button type="button" className="Comments" onClick={deleteComment} onKeyDown={deleteComment}>Delete</button></li>
        <li><button type="button" className="Comments" onClick={toggleHideForm} onKeyDown={toggleHideForm}>Update</button></li>
      </ul>
      <form className={`${hideForm ? 'hide' : ''}`} onSubmit={sendUpdateComment}>
        <input type="text" value={content} onChange={updateContent} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

Comment.propTypes = {
  reduxId: PropTypes.number.isRequired,
  reduxCommentId: PropTypes.number.isRequired,
  comment: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Comment;
