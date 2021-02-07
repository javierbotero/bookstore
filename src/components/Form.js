import PropTypes from 'prop-types';

const Form = props => {
  const handleLoggin = async () => {
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    const init = {
      method: props.verb,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    };
    const id = await fetch(props.url, init);
    localStorage.setItem('bookStoreUserId', id);
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
};

export default Form;
