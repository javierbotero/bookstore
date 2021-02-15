const errorDiv = str => document.querySelector(str);
const div = myClass => document.querySelector(`${myClass}`);

const displayErrors = (errors, myClass) => {
  let str = '';
  if (errors) {
    if (Array.isArray(errors)) {
      str += errors.join(', ').slice(0, -1);
    } else {
      Object.keys(errors).forEach(prop => {
        if (prop !== 'traces') {
          str += `${prop}: ${errors[prop].toString()}`;
        }
      });
    }
  }
  div(myClass).innerHTML = str;
};

export default displayErrors;
export { errorDiv };
