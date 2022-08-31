import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function CardRecipes() {
  const { recipes } = useContext(RecipeContext);
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <main className="d-flex justify-content-center flex-column align-items-center">
      { recipes
        && recipes.map((recipe, index) => {
          let listRecipes = {};
          switch (pathname) {
          case '/foods':
            listRecipes = { thumb: recipe.strMealThumb,
              name: recipe.strMeal,
              id: recipe.idMeal,
            };
            break;
          case '/drinks':
            listRecipes = { thumb: recipe.strDrinkThumb,
              name: recipe.strDrink,
              id: recipe.idDrink,
            };
            break;
          default:
            break;
          }

          return (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="card card-size"
            >
              <Link to={ `/foods/${listRecipes.id}` }>
                <img
                  className="card-img-top"
                  height="200"
                  data-testid={ `${index}-card-img` }
                  src={ listRecipes.thumb }
                  alt={ listRecipes.name }
                />
                <div className="card-body">
                  <p data-testid={ `${index}-card-name` } className="card-text">
                    { listRecipes.name }
                  </p>
                </div>
              </Link>
            </div>);
        })}
    </main>
  );
}

export default CardRecipes;
