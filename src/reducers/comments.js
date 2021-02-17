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
      console.log(action.payload);
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
  },
});

export default comments.reducer;
