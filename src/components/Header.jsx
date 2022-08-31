import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import requestFood from '../services/requestAPI';

function Header({ title }) {
  const history = useHistory();
  const { pathname } = history.location;

  const { setRecipes, setFoods, setDrinks } = useContext(RecipeContext);

  const [searchBtnVisible, setSearchBtnVisible] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleClickProfileBtn = () => {
    history.push('/profile');
  };

  const handleClickSearchBtn = () => {
    setSearchBtnVisible(!searchBtnVisible);
  };

  const searchFood = async (radio, search) => {
    if (radio === 'First-Letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const responseRecipe = await requestFood(pathname, radio, search);
    if (responseRecipe) {
      if (pathname === '/foods' && responseRecipe.length === 1) {
        history.push(`foods/${responseRecipe[0].idMeal}`);
      } else if (pathname === '/drinks' && responseRecipe.length === 1) {
        history.push(`drinks/${responseRecipe[0].idDrink}`);
      }
      setRecipes(responseRecipe);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setSearchInput('');
    setFoods([]);
    setDrinks([]);
  };

  return (
    <header className="d-flex flex-column justify-content-between">
      <section className="d-flex justify-content-between headerSize">
        <div className="div-profile">
          <button
            type="button"
            onClick={ handleClickProfileBtn }
            className="btn-profile"
          >
            <img
              className="profile-icon-img"
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
              height="40"
              width="40"
            />
          </button>
        </div>
        <h1 data-testid="page-title">{title}</h1>
        {title === 'Foods' || title === 'Drinks' || title === 'Explore Nationalities' ? (
          <div className="div-lupa">
            <button
              type="button"
              onClick={ handleClickSearchBtn }
              className="btn-profile-lupa"
            >
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
                height="40"
                width="40"
              />
            </button>
          </div>
        ) : ''}
      </section>
      {searchBtnVisible ? (
        <div className="d-flex flex-column align-items-center">
          <input
            type="text"
            name="search"
            data-testid="search-input"
            className="form-control"
            placeholder="Search"
            value={ searchInput }
            onChange={ ({ target: { value } }) => setSearchInput(value) }
          />
          <form className="d-flex justify-content-around headerSize">
            <div className="form-check">
              <label htmlFor="Ingredient" className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  data-testid="ingredient-search-radio"
                  name="First-Filter"
                  value="Ingredient"
                  id="Ingredient"
                  onChange={ ({ target: { value } }) => setRadioValue(value) }
                />
                Ingredient
              </label>
            </div>
            <div className="form-check">
              <label htmlFor="Name" className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  data-testid="name-search-radio"
                  name="First-Filter"
                  value="Name"
                  id="Name"
                  onChange={ ({ target: { value } }) => setRadioValue(value) }
                />
                Name
              </label>
            </div>
            <div className="form-check">
              <label htmlFor="First-Letter" className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  data-testid="first-letter-search-radio"
                  name="First-Filter"
                  value="First-Letter"
                  id="First-Letter"
                  onChange={ ({ target: { value } }) => setRadioValue(value) }
                />
                First Letter
              </label>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-light"
            data-testid="exec-search-btn"
            onClick={ () => searchFood(radioValue, searchInput) }
          >
            Search
          </button>
        </div>)
        : ''}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
