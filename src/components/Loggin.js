import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import { URL } from '../constants/constants';

const Loggin = props => {
  const { setId } = props;
  const errors = useSelector(state => state.books.error);
  const displayErrors = errors => {
    let str = 'Please fill the form correctly';
    if (errors) {
      str += errors.toString();
    }
    return str;
  };
  return (
    <BrowserRouter>
      <nav>
        <div className="layout flex-x">
          <div className="menu">
            <h2 className="title-bookstore">Bookstore CMS</h2>
            <ul className="links">
              <li className="books"><Link to="/">Sign in</Link></li>
              <li className="books"><Link to="/signup">Sign up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="Error">
        {displayErrors(errors)}
      </div>
      <Switch>
        <Route exact path="/">
          <p className="title">Loggin</p>
          <Form verb="POST" url={`${URL}loggin`} setId={setId} />
        </Route>
        <Route exact path="/signup">
          <p className="title">Create an Account</p>
          <Form verb="POST" url={`${URL}users`} setId={setId} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

Loggin.propTypes = {
  setId: PropTypes.string.isRequired,
};

export default Loggin;
