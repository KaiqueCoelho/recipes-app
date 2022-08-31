import React, { useContext, useState, useEffect } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import RecipeContext from '../context/RecipeContext';
import IngredientsInProgress from '../components/IngredientsInProgress';
import Instructions from '../components/Instructions';

function DrinksInProgress() {
  const [drink, setDrink] = useState({});
  const { setWhatToFetch, recipe } = useContext(RecipeContext);

  useEffect(() => {
    setWhatToFetch('drink');
    setDrink(recipe);
  }, [recipe]);
  return (
    <>
      <h1>Drinks In Progress</h1>
      {Object.keys(drink).length > 0 ? (
        <>
          <DetailsHeader drink={ drink } />
          <IngredientsInProgress drink={ drink } />
          <Instructions drink={ drink } />
        </>) : '' }
    </>
  );
}

export default DrinksInProgress;
