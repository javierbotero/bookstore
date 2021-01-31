import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import BookList from './bookslist';
import BookForm from './booksform';
import All from '../components/All';
import userImage from '../assets/images/user-icon.png';

const App = () => (
  <div>
    <BrowserRouter>
      <nav>
        <div className="layout flex-x">
          <div className="menu">
            <h2 className="title">Bookstore CMS</h2>
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

export default App;
