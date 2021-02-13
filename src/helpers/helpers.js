const displayErrors = (errors, myClass) => {
  let str = '';
  if (errors) {
    Object.keys(errors).forEach(prop => {
      str += `${prop}: ${errors[prop].toString()}`;
    });
  }
  document.querySelector(`.${myClass}`).innerHTML = str;
};

export default displayErrors;
