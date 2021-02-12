import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookList from './bookslist';
import BookForm from './booksform';
import All from '../components/All';
import Loggin from '../components/Loggin';
import userImage from '../assets/images/user-icon.png';
import displayErrors from '../helpers/helpers';

const App = () => {
  const [id, setId] = useState(localStorage.getItem('bookStoreUserId'));
  const errors = useSelector(state => state.books.error);
  useEffect(() => {
    if (errors) {
      document.querySelector('.Error').classList += ' display-error';
    } else {
      document.querySelector('.Error').classList.remove('display-error');
    }
  });
  console.log(errors);

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
          <div className="Error">
            {displayErrors(errors)}
          </div>
          <Switch>
            <Route path="/categories">
              <BookList />
              <BookForm />
            </Route>
            <Route path="/">
              <All />
              <BookForm />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  return <Loggin setId={setId} />;
};

export default App;
