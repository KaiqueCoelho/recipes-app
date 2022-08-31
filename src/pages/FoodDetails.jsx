import React, { useState, useEffect, useContext } from 'react';
import DetailsHeader from '../components/DetailsHeader';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import Recommended from '../components/Recommended';
import DetailsPageBtn from '../components/DetailsPageBtn';
import RecipeContext from '../context/RecipeContext';

function FoodDetails() {
  const [meal, setMeal] = useState({});
  const { setWhatToFetch, recipe } = useContext(RecipeContext);

  useEffect(() => {
    setWhatToFetch('meal');
    setMeal(recipe);
  }, [recipe, setWhatToFetch]);

  return (
    <div className="divSize">
      {Object.keys(meal).length > 0 ? (
        <div>
          <DetailsHeader meal={ meal } />
          <Ingredients meal={ meal } />
          <Instructions meal={ meal } />
          <iframe
            width="350"
            height="315"
            src={ meal.strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video"
            className="pl-2"
          />
          <Recommended />
          <DetailsPageBtn meal={ meal } />
        </div>
      ) : ''}
    </div>
  );
}

export default FoodDetails;
