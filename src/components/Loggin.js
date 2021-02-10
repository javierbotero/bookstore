import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Form from './Form';
import { URL } from '../constants/constants';

const Loggin = () => (
  <BrowserRouter>
    <nav>
      <div className="layout flex-x">
        <div className="menu">
          <h2 className="title-bookstore">Bookstore CMS</h2>
          <ul className="links">
            <li className="books"><Link to="/">Sign in</Link></li>
            <li className="categories"><Link to="/signin">Sign up</Link></li>
          </ul>
        </div>
      </div>
    </nav>
    <Switch>
      <Route exact path="/">
        <Form verb="GET" url={`${URL}loggin`} />
      </Route>
      <Route exact path="/signin">
        <Form verb="POST" url={URL} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Loggin;
