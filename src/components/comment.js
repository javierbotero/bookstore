import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { destroyComment } from '../actions/index';

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

  const updateComment = () => {

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
      <form className={`${hideForm ? 'hide' : ''}`} onSubmit={updateComment}>
        <input type="text" value={body} onChange={updateContent} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

Comment.propTypes = {
  reduxCommentId: PropTypes.number.isRequired,
  comment: 
};

export default Comment;
