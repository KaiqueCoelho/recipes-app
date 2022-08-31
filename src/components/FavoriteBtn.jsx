import React from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteBtn({ src, meal, drink, setFavoriteSrc }) {
  const isMeal = Object.keys(meal).length > 0;
  const handleFavoriteBtn = (e) => {
    if (e.target.src.includes('white')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (isMeal) {
        const newFav = {
          id: meal.idMeal,
          type: 'food',
          nationality: meal.strArea,
          category: meal.strCategory,
          alcoholicOrNot: '',
          name: meal.strMeal,
          image: meal.strMealThumb,
        };
        const newFavArray = [...favoriteRecipes, newFav];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavArray));
      } else {
        const newFav = {
          id: drink.idDrink,
          type: 'drink',
          nationality: '',
          category: drink.strCategory,
          alcoholicOrNot: drink.strAlcoholic,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        };
        const newFavArray = [...favoriteRecipes, newFav];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavArray));
      }
      setFavoriteSrc(blackHeart);
    } else {
      setFavoriteSrc(whiteHeart);
      const id = isMeal ? meal.idMeal : drink.idDrink;
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const newFavorite = favoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }
  };
  return (
    <button
      type="button"
      onClick={ handleFavoriteBtn }
      className="detailsHeaderBtn"
    >
      <img
        src={ src }
        alt="share icon"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  src: PropTypes.string.isRequired,
  meal: PropTypes.objectOf(PropTypes.any),
  drink: PropTypes.objectOf(PropTypes.any),
  setFavoriteSrc: PropTypes.func.isRequired,
};

FavoriteBtn.defaultProps = {
  meal: {},
  drink: {},
};

export default FavoriteBtn;
