import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import filterFoodByCategory from '../helpers/filterFoodByCategory';
import foodCategoriesRequest from '../helpers/foodCategoriesRequest';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';

function Foods() {
  const { foods, setFoods, defaultFoods,
    foodRequest, setRecipes } = useContext(RecipeContext);
  const [categories, setCategories] = useState([]);

  const categoriesRequest = async () => {
    const request = await foodCategoriesRequest();
    setCategories(request);
  };

  useEffect(() => {
    categoriesRequest();
  }, []);

  const handleButton = async (category) => {
    setRecipes([]);
    const requestFilteredFood = await filterFoodByCategory(category);
    if (foods.length < 1) setFoods(defaultFoods);
    if (requestFilteredFood[0].idMeal !== foods[0].idMeal) {
      setFoods(requestFilteredFood);
    } else {
      setFoods(defaultFoods);
    }
  };

  return (
    <section className="body-container">
      <div
        className="d-flex justify-content-center flex-column align-items-center"
      >
        <Header title="Foods" />
        <div className="d-flex flex-wrap btn-category">
          { categories.map((category) => (
            <button
              className="btn btn-danger"
              key={ category.strCategory }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleButton(category.strCategory) }
            >
              { category.strCategory }
            </button>
          ))}
          <button
            className="btn btn-danger"
            type="button"
            data-testid="All-category-filter"
            onClick={ foodRequest }
          >
            All
          </button>
        </div>
        <CardRecipes />
        <div className="d-flex flex-column recipesContainer">
          { foods.map((food, index) => (
            <div
              key={ food.idMeal }
              className="card card-size"
            >
              <Link
                data-testid={ `${index}-recipe-card` }
                to={ `/foods/${food.idMeal}` }
              >
                <div>
                  <img
                    className="card-img-top"
                    height="200"
                    src={ food.strMealThumb }
                    alt={ food.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                  <div className="card-body">
                    <p data-testid={ `${index}-card-name` } className="card-text">
                      { food.strMeal }
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

export default Foods;
