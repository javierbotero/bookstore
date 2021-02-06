import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

const Loggin = () => (
  <BrowserRouter>
    <nav>
      <div className="layout flex-x">
        <div className="menu">
          <h2 className="title-bookstore">Bookstore CMS</h2>
          <ul className="links">
            <li className="books"><Link to="/">Log in</Link></li>
            <li className="categories"><Link to="/signin">Sign in</Link></li>
          </ul>
        </div>
        <div>
          <img src={userImage} alt="user" />
        </div>
      </div>
    </nav>
    <Switch>

    </Switch>
  </BrowserRouter>
);
