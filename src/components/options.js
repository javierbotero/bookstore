import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';

const Options = props => {
  const {
    categories, handleSelectionCreation, creation, name, value,
  } = props;
  const complete = Object.values(categories);
  const incomplete = complete.filter(categ => categ !== FILTERS.all);
  const result = creation ? incomplete : complete;

  return (
    <select name={name} onChange={handleSelectionCreation} value={value}>
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
  handleSelectionCreation: PropTypes.func,
  creation: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Options.defaultProps = {
  creation: false,
  handleSelectionCreation: false,
};

export default Options;
