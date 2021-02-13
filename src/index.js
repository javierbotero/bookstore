import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './containers/App';
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
