import React from 'react';
import PropTypes from 'prop-types';

function Instructions({ meal = {}, drink = {} }) {
  const isMeal = Object.keys(meal).length > 0;
  return (
    <div className="pl-2 pb-5">
      <span className="fontSize">
        Instructions
      </span>
      <p data-testid="instructions" className="instructions">
        {isMeal ? meal.strInstructions : drink.strInstructions }
      </p>
    </div>
  );
}

Instructions.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  drink: PropTypes.objectOf(PropTypes.any),
};

Instructions.defaultProps = {
  meal: {},
  drink: {},
};

export default Instructions;
