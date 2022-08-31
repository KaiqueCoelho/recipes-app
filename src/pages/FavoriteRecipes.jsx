import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, []);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (filter === 'food') {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const filterRecipes = recipes.filter((recipe) => recipe.type === 'food');
      setFavoriteRecipes(filterRecipes);
    } else if (filter === 'drink') {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const filterRecipes = recipes.filter((recipe) => recipe.type === 'drink');
      setFavoriteRecipes(filterRecipes);
    } else {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    }
  }, [filter]);

  const handleFilter = (filterBy) => {
    setFilter(filterBy);
  };

  const handleFavorites = (id) => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    setFavoriteRecipes(newRecipes);
  };

  const handleShare = (type, id) => {
    const url = `http://localhost:3000/${type}/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
  };
  const renderFavoriteFood = (recipe, index) => (
    <div key={ recipe.id } className="pb-2">
      <Link to={ `/foods/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          width="100%"
          height="250px"
          className="detailsImg"
        />
        <h2
          data-testid={ `${index}-horizontal-name` }
          className="fontSize"
        >
          { recipe.name }
        </h2>
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className="fontSize"
        >
          {`${recipe.nationality} - ${recipe.category}`}
        </p>
      </Link>
      <button
        type="button"
        onClick={ () => { handleShare('foods', recipe.id); } }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        className="detailsHeaderBtn px-4"
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      { copied && <p>Link copied!</p> }
      <button
        type="button"
        onClick={ () => handleFavorites(recipe.id) }
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        className="detailsHeaderBtn px-4"
      >
        <img src={ blackHeartIcon } alt="favorite icon" />
      </button>
    </div>
  );
  const renderFavoriteDrink = (recipe, index) => (
    <div key={ recipe.id } className="pb-2">
      <Link to={ `/drinks/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          width="100%"
          height="250px"
          className="detailsImg"
        />
        <h2
          data-testid={ `${index}-horizontal-name` }
          className="fontSize"
        >
          { recipe.name }
        </h2>
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className="fontSize"
        >
          { recipe.alcoholicOrNot}
        </p>
      </Link>
      <button
        type="button"
        onClick={ () => { handleShare('drinks', recipe.id); } }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        className="detailsHeaderBtn px-4"
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      { copied && <p>Link copied!</p> }
      <button
        type="button"
        onClick={ () => handleFavorites(recipe.id) }
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        className="detailsHeaderBtn px-4"
      >
        <img src={ blackHeartIcon } alt="favorite icon" />
      </button>
    </div>
  );

  return (
    <div className="divSize">
      <Header title="Favorite Recipes" />
      <div className="d-flex justify-content-around pb-3">
        <Button
          type="button"
          onClick={ () => handleFilter('food') }
          data-testid="filter-by-food-btn"
          variant="danger"
        >
          Food
        </Button>
        <Button
          type="button"
          onClick={ () => handleFilter('drink') }
          data-testid="filter-by-drink-btn"
          variant="danger"
        >
          Drinks
        </Button>
        <Button
          type="button"
          onClick={ () => handleFilter('All') }
          data-testid="filter-by-all-btn"
          variant="danger"
        >
          All
        </Button>
      </div>
      <div>
        {favoriteRecipes.map((recipe, index) => (
          recipe.type === 'drink'
            ? renderFavoriteDrink(recipe, index)
            : renderFavoriteFood(recipe, index)
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
