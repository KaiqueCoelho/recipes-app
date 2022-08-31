import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipeContext);
  const [copyAlert, setCopyAlert] = useState('');
  const [recipesFilter, setrecipesFilter] = useState([]);

  useEffect(() => {
    setrecipesFilter(doneRecipes);
  }, []);

  const filters = ({ target }) => {
    let filter = '';

    if (target.name === 'foods') {
      filter = doneRecipes.filter((value) => value.type === 'foods');
      setrecipesFilter(filter);
    } else if (target.name === 'drinks') {
      filter = doneRecipes.filter((value) => value.type === 'drinks');
      setrecipesFilter(filter);
    } else if (target.name === 'all') {
      filter = doneRecipes;
      setrecipesFilter(filter);
    } else {
      filter = '';
    }
  };

  const share = async ({ target }) => {
    const { id } = target;
    await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopyAlert('Link copied!');
  };

  return (
    <div className="d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-around">
        <Button
          type="button"
          data-testid="filter-by-all-btn"
          name="all"
          onClick={ filters }
          variant="danger"
        >
          All
        </Button>
        <Button
          type="button"
          data-testid="filter-by-food-btn"
          name="foods"
          onClick={ filters }
          variant="danger"
        >
          Food
        </Button>
        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drinks"
          onClick={ filters }
          variant="danger"
        >
          Drinks
        </Button>
      </div>

      { recipesFilter.map((value, index) => (
        <div key={ value.id }>
          <Link to={ `/${value.type}/${value.id}` }>
            <img
              width="100%"
              height="250px"
              className="detailsImg my-3"
              src={ value.image }
              alt={ value.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div className="d-flex">
            <button
              type="button"
              onClick={ (event) => {
                share(event);
                global.alert('Link copied!');
              } }
              className="detailsHeaderBtn px-4"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="profile"
                id={ value.id }
              />
            </button>
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="categorySpan"
            >
              { value.category }
            </p>
          </div>

          <Link to={ `/${value.type}/${value.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="fontSize"
            >
              {value.name}
            </p>
          </Link>

          <div className="d-flex justify-content-between">
            <p
              data-testid={ `${index}-horizontal-done-date` }
              className="categorySpan"
            >
              {value.doneDate}
            </p>
            {value.tags.map((val, ind) => (
              <p
                data-testid={ `${index}-${val}-horizontal-tag` }
                key={ ind }
                className="categorySpan"
              >
                {val}
              </p>
            ))}
            <p className="categorySpan">{copyAlert}</p>
          </div>
        </div>
      )) }
    </div>
  );
}

export default DoneRecipes;
