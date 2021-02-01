import { CHANGE_FILTER } from '../actions/index';

const category = (state = 'All', action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

export default category;
