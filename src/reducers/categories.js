import { SET_CATEGORY } from '../actions/index';
import { FILTERS } from '../constants/constants';

const category = (state = FILTERS.all, action) => {
  console.log(action.payload);
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload.filter;
    default:
      return state;
  }
};

export default category;
