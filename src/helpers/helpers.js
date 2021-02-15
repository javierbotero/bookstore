const errorDiv = () => document.querySelector('.Error');
const div = myClass => document.querySelector(`${myClass}`);

const displayErrors = (errors, myClass) => {
  let str = '';
  if (errors) {
    Object.keys(errors).forEach(prop => {
      if (prop !== 'traces') {
        str += `${prop}: ${errors[prop].toString()}`;
      }
    });
  }
  div(myClass).innerHTML = str;
  console.log(div(myClass));
};

export default displayErrors;
export { errorDiv };
