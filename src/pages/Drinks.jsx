import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom/';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import drinkCategoriesRequest from '../helpers/drinkCategoriesRequest';
import filterDrinkByCategory from '../helpers/filterDrinkByCategory';
import Footer from '../components/Footer';

function Drinks() {
  const { drinks, setDrinks, defaultDrinks,
    drinkRequest, setRecipes } = useContext(RecipeContext);
  const [categories, setCategories] = useState([]);

  const categoriesRequest = async () => {
    const request = await drinkCategoriesRequest();
    setCategories(request);
  };

  useEffect(() => {
    categoriesRequest();
  }, []);

  const handleButton = async (category) => {
    setRecipes([]);
    const requestFilteredDrink = await filterDrinkByCategory(category);
    if (drinks.length < 1) setDrinks(defaultDrinks);
    if (requestFilteredDrink[0].idDrink !== drinks[0].idDrink) {
      setDrinks(requestFilteredDrink);
    } else {
      setDrinks(defaultDrinks);
    }
  };

  return (
    <section className="body-container">
      <div
        className="d-flex justify-content-center flex-column align-items-center"
      >
        <Header title="Drinks" />
        <div className="d-flex flex-wrap btn-category">
          { categories.map((category) => (
            <button
              key={ category.strCategory }
              className="btn btn-danger"
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleButton(category.strCategory) }
            >
              { category.strCategory }
            </button>
          ))}
          <button
            type="button"
            className="btn btn-danger"
            data-testid="All-category-filter"
            onClick={ drinkRequest }
          >
            All
          </button>
        </div>
        <CardRecipes />
        <div className="d-flex flex-column recipesContainer">
          { drinks.map((drink, index) => (
            <div
              key={ drink.idDrink }
              className="card card-size"
            >
              <Link
                data-testid={ `${index}-recipe-card` }
                to={ `/drinks/${drink.idDrink}` }
              >
                <div>
                  <img
                    className="card-img-top"
                    height="200"
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <div className="card-body">
                    <p data-testid={ `${index}-card-name` } className="card-text">
                      { drink.strDrink }
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )) }
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Drinks;
