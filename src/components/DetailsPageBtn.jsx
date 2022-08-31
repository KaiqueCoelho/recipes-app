import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function DetailsPageBtn({ meal, drink }) {
  const history = useHistory();
  const [btnText, setBtnText] = useState('Start Recipe');
  const [isBtnVisible, setBtnVisible] = useState(true);
  const handleClick = () => {
    const recipeId = window.location.pathname.split('/')[2];
    if (window.location.pathname.includes('foods')) {
      history.push(`/foods/${recipeId}/in-progress`);
    } else {
      history.push(`/drinks/${recipeId}/in-progress`);
    }
  };

  const handleBtnText = () => {
    const isDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (isDone.some((recipe) => recipe.id === meal.idMeal
      || recipe.id === drink.idDrink)) {
      setBtnVisible(false);
      setBtnText('');
    }

    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      if (window.location.pathname.includes('foods')) {
        Object.keys(inProgress.meals).some((id) => id === meal.idMeal);
        setBtnText('Continue Recipe');
      } else {
        Object.keys(inProgress.cocktails).some((id) => id === drink.idDrink);
        setBtnText('Continue Recipe');
      }
    }
  };

  useEffect(() => {
    handleBtnText();
  }, []);

  return (
    isBtnVisible ? (
      <Button
        variant="danger"
        data-testid="start-recipe-btn"
        className="fixed-bottom btnColor"
        onClick={ handleClick }
      >
        { btnText }
      </Button>) : ''
  );
}

DetailsPageBtn.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  drink: PropTypes.objectOf(PropTypes.any),
};

DetailsPageBtn.defaultProps = {
  meal: {},
  drink: {},
};

export default DetailsPageBtn;
