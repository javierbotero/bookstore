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
  divResult.innerHTML += str;
};

export default displayErrors;
export { div };
