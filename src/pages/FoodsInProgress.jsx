import React, { useContext, useState, useEffect } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import RecipeContext from '../context/RecipeContext';
import IngredientsInProgress from '../components/IngredientsInProgress';
import Instructions from '../components/Instructions';

function FoodsInProgress() {
  const [meal, setMeal] = useState({});
  const { setWhatToFetch, recipe } = useContext(RecipeContext);

  useEffect(() => {
    setWhatToFetch('meal');
    setMeal(recipe);
  }, [recipe]);
  return (
    <>
      <h1>Foods In Progress</h1>
      {Object.keys(meal).length > 0 ? (
        <>
          <DetailsHeader meal={ meal } />
          <IngredientsInProgress meal={ meal } />
          <Instructions meal={ meal } />
        </>) : '' }
    </>
  );
}

export default FoodsInProgress;
