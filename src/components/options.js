import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';

const Options = props => {
  const {
    categories, handleSelection, creation, name,
  } = props;
  const complete = Object.values(categories);
  const incomplete = complete.filter(categ => categ !== FILTERS.all);
  const result = creation ? incomplete : complete;

  return (
    <select name={name} onChange={handleSelection}>
      {result.map(category => <option key={category} value={category}>{category}</option>)}
    </select>
  );
};

Options.propTypes = {
  categories: PropTypes.shape.isRequired,
  handleSelection: PropTypes.func.isRequired,
  creation: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

Options.defaultProps = {
  creation: false,
};

export default Options;
