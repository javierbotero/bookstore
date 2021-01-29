import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';
import App, { CREATE_BOOK, REMOVE_BOOK } from './containers/App';
import { FILTERS } from './constants/constants';
import category from './reducers/categories';

const initialState = [
  {
    title: 'A Hundred Years of Solitude',
    category: FILTERS.biography,
    id: uuidv4(),
  },
  {
    title: 'The Iliad',
    category: FILTERS.history,
    id: uuidv4(),
  },
  {
    title: 'The Shining',
    category: FILTERS.horror,
    id: uuidv4(),
  },
  {
    title: 'The Little Prince',
    category: FILTERS.kids,
    id: uuidv4(),
  },
  {
    title: 'The Invation',
    category: FILTERS.scifi,
    id: uuidv4(),
  },
];

const books = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return [...state, {
        title: action.payload.title,
        category: action.payload.category,
        id: action.payload.id,
      }];
    case REMOVE_BOOK:
      return [...action.payload.newBooks];
    default:
      return state;
  }
};

const combined = combineReducers({ books, category });

const store = createStore(combined, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

export default initialState;
