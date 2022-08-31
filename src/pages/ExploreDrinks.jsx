import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import exploreImg from '../images/exploreImg.svg';

function ExploreDrinks() {
  const { idDrinkRandom } = useContext(RecipeContext);
  return (
    <>
      <Header title="Explore Drinks" />
      <main className="d-flex justify-content-around">
        <Link to="/explore/drinks/ingredients">
          <Button
            type="button"
            data-testid="explore-by-ingredient"
            variant="danger"
          >
            By Ingredient
          </Button>
        </Link>
        <Link to={ `/drinks/${idDrinkRandom}` }>
          <Button
            type="button"
            data-testid="explore-surprise"
            variant="danger"
          >
            Surprise me!
          </Button>
        </Link>
      </main>
      <img
        src={ exploreImg }
        alt=""
        width="280"
        heigth="175"
        className="exploreImg"
      />
      <Footer />
    </>
  );
}

export default ExploreDrinks;
