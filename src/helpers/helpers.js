const displayErrors = errors => {
  let str = 'Please fill the form correctly';
  if (errors) {
    Object.keys(errors).forEach(prop => {
      str += `${prop}: ${errors[prop].toString()}`;
    });
  }
  return str;
};

export default displayErrors;
