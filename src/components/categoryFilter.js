import React from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants/constants';

const CategoryFilter = props => {
  const {
    categories, handleSelectionCreation, creation, name, value, handleSelection,
  } = props;
  const complete = Object.values(categories);
  const incomplete = complete.filter(categ => categ !== FILTERS.all);
  const result = creation ? incomplete : complete;

  return (
    <select
      name={name}
      onChange={handleSelection || handleSelectionCreation}
      value={value}
    >
      {result.map(category => {
        if (category === 'Category') {
          return <option key={category} value={category} disabled>{category}</option>;
        }
        return <option key={category} value={category}>{category}</option>;
      })}
    </select>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSelectionCreation: PropTypes.func,
  handleSelection: PropTypes.func,
  creation: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

CategoryFilter.defaultProps = {
  creation: false,
  handleSelectionCreation: null,
  handleSelection: null,
};

export default CategoryFilter;
