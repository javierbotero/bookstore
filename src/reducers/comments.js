/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  retrieveComments,
  // createComment,
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
  extraReducers: {
    [retrieveComments.pending]: state => { state.status = 'pending'; },
    [retrieveComments.fulfilled]: (state, action) => {
      if (action.payload.status === '404') {
        state.status = 'failed retrieve';
        state.error = action.payload;
      } else {
        state.comments = action.payload;
        state.status = 'Comments retrieved';
        state.error = null;
      }
    },
    [retrieveComments.rejected]: (state, action) => {
      state.status = 'failed retrieve';
      state.error = action.payload;
    },
  },
});

export default comments.reducer;
