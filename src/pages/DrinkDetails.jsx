import React, { useState, useEffect, useContext } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import Recommended from '../components/Recommended';
import DetailsPageBtn from '../components/DetailsPageBtn';
import RecipeContext from '../context/RecipeContext';

function DrinkDetails() {
  const [drink, setDrink] = useState({});
  const { setWhatToFetch, recipe } = useContext(RecipeContext);

  useEffect(() => {
    setWhatToFetch('drink');
    setDrink(recipe);
  }, [recipe]);

  return (
    <div className="divSize">
      {Object.keys(drink).length > 0 ? (
        <>
          <DetailsHeader drink={ drink } />
          <Ingredients drink={ drink } />
          <Instructions drink={ drink } />
          <Recommended />
          <DetailsPageBtn drink={ drink } />
        </>
      ) : ''}
    </div>
  );
}

export default DrinkDetails;
