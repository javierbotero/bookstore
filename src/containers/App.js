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

const App = () => (
  <div>
    <BrowserRouter>
      <nav>
        <h2 className="title">Bookstore CMS</h2>
        <ul>
          <li><Link to="/">BOOKS</Link></li>
          <li><Link to="/categories">CATEGORIES</Link></li>
        </ul>
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
