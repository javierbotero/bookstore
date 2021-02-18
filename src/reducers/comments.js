/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  retrieveComments,
  // createComment,
  // updateComment,
  // destroyComment,
} from '../actions/index';
import { initCreator } from '../helpers/helpers';
import { URL } from '../constants/constants';

const initialState = {
  comments: [],
  error: null,
  status: 'idle',
};

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeErrorComments: state => { state.error = null; },
    sendComment: (state, action) => {
      if (action.payload.response.body) {
        state.status = 'Comment created';
        const newArr = [...state.comments];
        newArr[action.payload.reduxId].push(action.payload.response);
        state.comments = newArr;
        state.error = null;
      } else if (action.payload.response.status === 404) {
        state.status = 'Failed creation comment';
        state.error = action.payload.response;
      } else {
        state.status = 'Failed creation comment';
        state.error = JSON.stringify(action.payload.response);
      }
    },
    sendCommentPending: state => { state.status = 'pending'; },
    sendCommentRejected: (state, action) => {
      state.error = action.payload.response;
      state.status = 'Something wen wrong';
    },
  },
  extraReducers: {
    [retrieveComments.pending]: state => { state.status = 'pending'; },
    [retrieveComments.fulfilled]: (state, action) => {
      console.log(action.payload.response);
      if (Array.isArray(action.payload.response)) {
        const newArr = [...state.comments];
        newArr[action.payload.reduxId] = action.payload.response;
        state.comments = newArr;
        state.status = 'Success retrieve';
        state.error = null;
      } else if (action.payload.response.status === 404) {
        state.status = 'failed retrieve';
        state.error = action.payload;
      } else {
        state.status = 'failed retrieve';
        state.error = JSON.stringify(action.payload.response);
      }
    },
    [retrieveComments.rejected]: (state, action) => {
      state.status = 'failed retrieve';
      state.error = action.payload;
    },
    // [createComment.pending]: state => { state.comments.status = 'pending'; },
    // [createComment.fulfilled]: (state, action) => {
    //   console.log(state, action);
    //   if (action.payload.response.body) {
    //     state.status = 'Comment created';
    //     const newArr = [...state.comments];
    //     newArr[action.payload.reduxId].push(action.payload.response);
    //     state.comments = newArr;
    //     state.error = null;
    //   } else if (action.payload.response.status === 404) {
    //     state.status = 'Failed creation comment';
    //     state.error = action.payload.response;
    //   } else {
    //     state.status = 'Failed creation comment, unknown error';
    //     state.error = JSON.stringify(action.payload.response);
    //   }
    // },
    // [createComment.rejected]: (state, action) => {
    //   console.log(action);
    //   state.status = 'Failed creation comment, rejected action';
    //   state.error = `Something went wrong, please notify us with this error: ${action.payload}`;
    // },
  },
});

const {
  removeErrorComments,
  sendComment,
  sendCommentPending,
  sendCommentRejected,
} = comments.actions;

const createComment = (data) => {
  return (dispatch) => {
    const init = initCreator('POST', `${URL}comments`);
  } 
};

createAsyncThunk('create-comment', async data => {
  console.log(data);
  const init = initCreator('POST', data.item);
  const response = await fetch(`${URL}comments`, init)
    .then(data => data.json())
    .catch(error => error.json());
  console.log(response);
  return { reduxId: data.reduxId, response };
});

export default comments.reducer;
export {
  removeErrorComments,
};
