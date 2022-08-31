import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import requestFood from '../services/requestAPI';

function CardIngredients() {
  const { foodIngredientsList, drinkIngredientsList,
    setRecipes, setFoods, setDrinks } = useContext(RecipeContext);
  const history = useHistory();
  const { pathname } = history.location;

  const sendIngredient = async (ingredient) => {
    const responseRecipe = await requestFood(pathname, 'Ingredient', ingredient);
    setRecipes(responseRecipe);
    setFoods([]);
    setDrinks([]);
  };

  return (
    <main>
      { pathname === '/explore/foods/ingredients'
        ? foodIngredientsList.map(({ strIngredient }, index) => (
          <Link
            to="/foods"
            onClick={ () => sendIngredient(strIngredient) }
            key={ index }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
            />
            <p data-testid={ `${index}-card-name` }>
              { strIngredient }
            </p>
          </Link>
        )) : (
          drinkIngredientsList.map(({ strIngredient1 }, index) => (
            <Link
              to="/drinks"
              onClick={ () => sendIngredient(strIngredient1) }
              key={ index }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
              />
              <p data-testid={ `${index}-card-name` }>
                { strIngredient1 }
              </p>
            </Link>
          ))
        )}
    </main>
  );
}

export default CardIngredients;
