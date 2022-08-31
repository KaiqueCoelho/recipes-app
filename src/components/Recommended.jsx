import React, { useEffect, useState } from 'react';

const RECOMMENDED_RECIPES = 6;

function Recommended() {
  const [recommendedStuff, setRecommendedStuff] = useState([]);
  const fetchDrink = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const recommendedArray = data.drinks.filter((drinkRecommended, index) => {
      if (index < RECOMMENDED_RECIPES) {
        return drinkRecommended;
      }
      return '';
    });
    setRecommendedStuff(recommendedArray);
  };

  const fetchMeal = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const recommendedArray = data.meals.filter((mealRecommended, index) => {
      if (index < RECOMMENDED_RECIPES) {
        return mealRecommended;
      }
      return '';
    });
    setRecommendedStuff(recommendedArray);
  };

  useEffect(() => {
    if (window.location.pathname.includes('foods')) {
      fetchDrink();
    } else {
      fetchMeal();
    }
  }, []);

  return (
    <div className="d-flex overflow">
      {
        recommendedStuff.map((recommended, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className="recommendedSize"
          >
            <img
              src={ recommended.strDrinkThumb || recommended.strMealThumb }
              alt={ recommended.strDrink || recommended.strMeal }
              className="imgWidth"
            />
            <span>
              { recommended.strCategory }
            </span>
            <h4 data-testid={ `${index}-recomendation-title` }>
              { recommended.strDrink || recommended.strMeal }
            </h4>
          </div>))
      }
    </div>
  );
}

export default Recommended;
