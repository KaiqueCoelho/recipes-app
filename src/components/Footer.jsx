import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="d-flex justify-content-between" data-testid="footer">
      <Link to="/drinks">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
        >
          <img
            src={ drinkIcon }
            alt="Drink Icon"
            height="60"
            width="60"
          />
        </button>
      </Link>
      <Link to="/explore">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          src="../images/exploreIcon.svg"
        >
          <img
            src={ exploreIcon }
            alt="Explore Icon"
            height="60"
            width="60"
          />
        </button>
      </Link>
      <Link to="/foods">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src="../images/mealIcon.svg"
        >
          <img
            src={ mealIcon }
            alt="Food Icon"
            height="60"
            width="60"
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
