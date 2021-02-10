import PropTypes from 'prop-types';
import { initCreator } from '../actions/index';

const Form = props => {
  const { url, verb, setId } = props;
  const handleLoggin = async e => {
    e.preventDefault();
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    const user = await fetch(url, initCreator(verb, data))
      .then(data => data.json())
      .catch(error => error);
    if (user.id) {
      document.querySelector('.Error').classList.remove('display-error');
      localStorage.setItem('bookStoreUserId', user.id);
      localStorage.setItem('booksStoredNotFirstTime', false);
      setId(user.id);
    } else {
      console.log('Error is: ', user);
      document.querySelector('.Error').classList += ' display-error';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    }
  };

  return (
    <form onSubmit={handleLoggin}>
      <div className="Error">Please fill the form correctly</div>
      <div>
        <label htmlFor="email">
          Email
          <input type="text" id="email" name="email" />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input type="text" id="password" name="password" />
        </label>
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

Form.propTypes = {
  verb: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
};

export default Form;
