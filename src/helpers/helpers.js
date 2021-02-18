const div = str => document.querySelector(str);

const displayErrors = (errors, myClass) => {
  let str = '';
  const divResult = div(myClass);
  if (errors) {
    if (Array.isArray(errors)) {
      str += errors.join(', ').slice(0, -1);
    } else if (typeof errors === 'object') {
      const keysArray = Object.keys(errors);
      if (keysArray.length > 0) {
        keysArray.forEach(prop => {
          if (prop !== 'traces') {
            str += `${prop}: ${errors[prop].toString()}`;
          }
        });
      } else {
        str += errors;
      }
    } else {
      str += errors;
    }
  }
  divResult.innerHTML = str;
};

const initCreator = (verb, data = null) => {
  let result;
  if (data) {
    result = {
      method: verb,
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
  } else {
    result = {
      method: verb,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
  }
  return result;
};

export default displayErrors;
export { div, initCreator };
