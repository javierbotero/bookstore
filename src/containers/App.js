import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createBook, retrieveBooks } from '../actions/index';
import BookList from './bookslist';
import BookForm from './booksform';
import All from '../components/All';
import Loggin from '../components/Loggin';
import userImage from '../assets/images/user-icon.png';
import { DEFAULT_BOOKS, URL } from '../constants/constants';
import displayErrors, { div } from '../helpers/helpers';

const App = () => {
  const [id, setId] = useState(localStorage.getItem('bookStoreUserId'));
  const errors = useSelector(state => state.books.error);
  const errorComments = useSelector(state => state.comments.error);
  const status = useSelector(state => state.books.status);
  const books = useSelector(state => state.books);
  const statusComments = useSelector(state => state.comments.status);
  const dispatch = useDispatch();
  useEffect(() => {
    const loading = div('.loading');
    const errorDiv = div('.Error');
    if (status === 'loading'
    || status === 'Uploading'
    || status === 'Updating Book'
    || status === 'Pending Deletion Book'
    || statusComments === 'pending') {
      loading.classList.remove('hide');
    } else {
      loading.classList.add('hide');
    }
    if (errors) {
      errorDiv.classList += ' display-error';
      if (id) {
        displayErrors(errors, '#ErrorHeader');
      } else {
        displayErrors(errors, '.Error');
      }
    } else {
      errorDiv.classList.remove('display-error');
    }

    if (errorComments) {
      errorDiv.classList += ' display-error';
      if (id) {
        displayErrors(errorComments, '#ErrorHeader');
      } else {
        displayErrors(errorComments, '.Error');
      }
    } else {
      errorDiv.classList.remove('display-error');
    }

    if (id && books.status === 'idle') {
      dispatch(retrieveBooks({ id }));
    }

    if (books.status === 'succeded' && books.books.length === 0 && localStorage.getItem('booksStoredNotFirstTime') === 'false') {
      DEFAULT_BOOKS.forEach(async item => {
        setTimeout(await dispatch(createBook({
          id,
          book: {
            title: item.title,
            category: item.category,
            author: item.author,
            completed: item.completed,
          },
        })),
        200);
      });
      localStorage.setItem('booksStoredNotFirstTime', true);
    }
  }, [books, URL, id]);

  if (parseInt(id, 10)) {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <div className="layout flex-x">
              <div className="menu">
                <h2 className="title-bookstore">Bookstore CMS</h2>
                <ul className="links">
                  <li className="books"><Link to="/">BOOKS</Link></li>
                  <li className="categories"><Link to="/categories">CATEGORIES</Link></li>
                </ul>
              </div>
              <div>
                <img src={userImage} alt="user" />
              </div>
            </div>
          </nav>
          <div className="Error" id="ErrorHeader" />
          <div className="loading">Loading... the dyno is just waking up :)</div>
          <Switch>
            <Route path="/categories">
              <BookList id={id} />
              <BookForm id={id} />
            </Route>
            <Route path="/">
              <All id={id} />
              <BookForm id={id} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  return <Loggin setId={setId} />;
};

export default App;
