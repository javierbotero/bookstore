import { combineReducers } from 'redux';
import books from './books';
import category from './categories';

const combined = combineReducers({ books, category });

export default combined;
