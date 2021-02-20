import PropTypes from 'prop-types';
import { initCreator } from '../actions/index';
import displayErrors, { div } from '../helpers/helpers';

const Form = props => {
  const { url, verb, setId } = props;
  const handleLoggin = async e => {
    e.preventDefault();
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    let response;
    const errDiv = div('.Error');
    const user = await fetch(url, initCreator(verb, data))
      .then(data => {
        response = data;
        return data.json();
      })
      .catch(error => error);
    if (response.status === 200) {
      errDiv.classList.remove('display-error');
      localStorage.setItem('bookStoreUserId', user.id);
      localStorage.setItem('booksStoredNotFirstTime', false);
      setId(user.id);
    } else {
      errDiv.classList += ' display-error';
      displayErrors(user, '.Error');
      div('#email').value = '';
      div('#password').value = '';
    }
  };

  return (
    <form onSubmit={handleLoggin}>
      <div>
        <label htmlFor="email">
          <div>Email</div>
          <input type="text" id="email" name="email" />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <div>Password</div>
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
