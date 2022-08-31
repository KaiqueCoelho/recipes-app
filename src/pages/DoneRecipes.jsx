import React from 'react';
import Header from '../components/Header';
import DoneRecipes from '../components/DoneRecipies';

function DoneRecipesPage() {
  return (
    <div className="divSize">
      <Header title="Done Recipes" />
      <DoneRecipes />
    </div>
  );
}

export default DoneRecipesPage;
