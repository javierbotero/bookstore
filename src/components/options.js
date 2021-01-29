import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';

const Options = props => {
  const {
    categories, handleSelection, creation, name, value,
  } = props;
  const complete = Object.values(categories);
  const incomplete = complete.filter(categ => categ !== FILTERS.all);
  const result = creation ? incomplete : complete;

  return (
    <select name={name} onChange={handleSelection} value={value}>
      {result.map((category, i) => {
        if (i > 0) {
          return <option key={category} value={category}>{category}</option>;
        }
        return <option key={category} value={category} selected>{category}</option>;
      })}
    </select>
  );
};

Options.propTypes = {
  categories: PropTypes.shape.isRequired,
  handleSelection: PropTypes.func.isRequired,
  creation: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Options.defaultProps = {
  creation: false,
  value: FILTERS.all,
};

export default Options;
