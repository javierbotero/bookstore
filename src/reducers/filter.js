import { CHANGE_FILTER } from '../actions/index';
import { FILTERS } from '../constants/constants';

const category = (state = FILTERS.all, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

export default category;
