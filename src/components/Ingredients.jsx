import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const INGREDIENTS_NUMBER = 20;

function Ingredients({ meal = {}, drink = {} }) {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = () => {
    const isMeal = Object.keys(meal).length > 0;
    const isDrink = Object.keys(drink).length > 0;
    if (isMeal || isDrink) {
      const ingredientsArr = [];
      for (let index = 0; index < INGREDIENTS_NUMBER; index += 1) {
        if (meal[`strIngredient${index + 1}`]) {
          const ingredientStr = meal[`strIngredient${index + 1}`];
          const measureStr = meal[`strMeasure${index + 1}`];
          ingredientsArr.push(`${ingredientStr} - ${measureStr}`);
        }
        if (drink[`strIngredient${index + 1}`]) {
          const ingredientStr = drink[`strIngredient${index + 1}`];
          const measureStr = drink[`strMeasure${index + 1}`] || '';
          ingredientsArr.push(`${ingredientStr} - ${measureStr}`);
        }
      }
      setIngredients(ingredientsArr);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (

    <div className="d-flex flex-column pl-2">
      <span className="fontSize">
        Ingredients
      </span>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  drink: PropTypes.objectOf(PropTypes.any),
};

Ingredients.defaultProps = {
  meal: {},
  drink: {},
};

export default Ingredients;
