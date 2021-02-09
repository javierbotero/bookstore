import PropTypes from 'prop-types';
import { initCreator } from '../actions/index';

const Form = props => {
  const { url, verb } = props;
  const handleLoggin = async () => {
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    const bookCreated = await fetch(url, initCreator(verb, data));
    console.log(bookCreated);
  };

  return (
    <form onSubmit={handleLoggin}>
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
};

export default Form;
