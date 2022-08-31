import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FinishRecipeBtn from './FinishRecipeBtn';

const INGREDIENTS_NUMBER = 20;
const inProgressStorage = {
  cocktails: {
  },
  meals: {
  },
};
function IngredientsInProgress({ meal = {}, drink = {} }) {
  const [ingredientsInProgress, setIngredientsInProgress] = useState([]);
  const [savedProgress, setSavedProgress] = useState(inProgressStorage);
  const [doneIngredients, setDoneIngredients] = useState([]);
  const isMeal = Object.keys(meal).length > 0;
  const isDrink = Object.keys(drink).length > 0;
  const recipeId = meal.idMeal || drink.idDrink;

  const getIngredientsInProgress = () => {
    if (isMeal || isDrink) {
      const ingredientsInProgressArr = [];
      for (let index = 0; index < INGREDIENTS_NUMBER; index += 1) {
        if (meal[`strIngredient${index + 1}`]) {
          const ingredientStr = meal[`strIngredient${index + 1}`];
          const measureStr = meal[`strMeasure${index + 1}`];
          ingredientsInProgressArr.push(`${ingredientStr} - ${measureStr}`);
        }
        if (drink[`strIngredient${index + 1}`]) {
          const ingredientStr = drink[`strIngredient${index + 1}`];
          const measureStr = drink[`strMeasure${index + 1}`] || '';
          ingredientsInProgressArr.push(`${ingredientStr} - ${measureStr}`);
        }
      }
      setIngredientsInProgress(ingredientsInProgressArr);
    }
  };

  useEffect(() => {
    getIngredientsInProgress();
    const savedItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (savedItems) {
      setSavedProgress(savedItems);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));
    }
  }, []);

  useEffect(() => {
    if (savedProgress) {
      if (isMeal) {
        setDoneIngredients(savedProgress.meals[recipeId] || []);
      } else if (isDrink) {
        setDoneIngredients(savedProgress.cocktails[recipeId] || []);
      }
    }
  }, [savedProgress]);

  const handleIngredient = (e) => {
    if (e.target.checked) {
      e.target.parentNode.className = 'markedIngredient';
      setDoneIngredients([...doneIngredients, e.target.name]);
    } else {
      e.target.parentNode.className = '';
      const ingredientsSet = doneIngredients
        .filter((ingredient) => ingredient !== e.target.name);
      setDoneIngredients(ingredientsSet);
    }
  };

  useEffect(() => {
    if (savedProgress) {
      if (isMeal) {
        savedProgress.meals[recipeId] = doneIngredients;
      } else if (isDrink) {
        savedProgress.cocktails[recipeId] = doneIngredients;
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
    }
  }, [doneIngredients]);

  return (

    <>
      <h3>
        Ingredients In Progress
      </h3>
      <ul>
        {ingredientsInProgress.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={ doneIngredients?.includes(JSON.stringify(index))
              ? 'markedIngredient' : '' }
          >
            <input
              type="checkbox"
              name={ index }
              defaultChecked={ doneIngredients.includes(JSON.stringify(index)) }
              onChange={ handleIngredient }
            />
            {ingredient}
          </li>
        ))}
      </ul>
      <FinishRecipeBtn
        disabled={ ingredientsInProgress.length === doneIngredients.length }
      />
    </>
  );
}

IngredientsInProgress.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  drink: PropTypes.objectOf(PropTypes.any),
};

IngredientsInProgress.defaultProps = {
  meal: {},
  drink: {},
};

export default IngredientsInProgress;
