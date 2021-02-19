/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  retrieveComments,
  createComment,
  // updateComment,
  // destroyComment,
} from '../actions/index';

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
  },
  extraReducers: {
    [retrieveComments.pending]: state => { state.status = 'pending'; },
    [retrieveComments.fulfilled]: (state, action) => {
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
      state.status = 'Rejected';
      state.error = action.payload;
    },
    [createComment.pending]: state => {
      state.status = 'pending';
    },
    [createComment.fulfilled]: (state, action) => {
      console.log(state, action);
      if (action.payload.response.body) {
        state.status = 'Fullfilled';
        state.comments[action.payload.reduxId].push(action.payload.response);
        state.error = null;
      } else {
        state.error = action.payload.response;
        state.status = 'Rejected';
      }
    },
    [createComment.rejected]: (state, action) => {
      console.log(action);
      state.status = 'Rejected';
      state.error = `Something went wrong, please notify us with this error: ${action.payload}`;
    },
  },
});

const { removeErrorComments } = comments.actions;

export default comments.reducer;
export {
  removeErrorComments,
};
