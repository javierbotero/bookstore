import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// import { applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import App from './containers/App';
// import combined from './reducers/index';
import './assets/style.css';
import books from './reducers/books';
import category from './reducers/filter';

const store = configureStore({
  reducer: {
    books,
    category,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
