import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import exploreImg from '../images/exploreImg.svg';

function ExploreFoods() {
  const { idFoodRandom } = useContext(RecipeContext);
  return (
    <div className="divSize">
      <Header title="Explore Foods" />
      <main>
        <div className="d-flex flex-column">
          <Link to="/explore/foods/ingredients">
            <Button
              type="button"
              data-testid="explore-by-ingredient"
              variant="danger"
              className="btn-category"
            >
              By Ingredient
            </Button>
          </Link>
          <Link to="/explore/foods/nationalities">
            <Button
              type="button"
              data-testid="explore-by-nationality"
              variant="danger"
              className="btn-category"
            >
              By Nationality
            </Button>
          </Link>
          <Link to={ `/foods/${idFoodRandom}` }>
            <Button
              type="button"
              data-testid="explore-surprise"
              variant="danger"
              className="btn-category"
            >
              Surprise me!
            </Button>
          </Link>
        </div>
        <img
          src={ exploreImg }
          alt=""
          width="280"
          heigth="175"
          className="exploreImg"
        />
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
