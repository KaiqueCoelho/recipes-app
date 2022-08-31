import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardIngredients from '../components/CardIngredients';

function ExploreDrinksIngredients() {
  return (
    <>
      <Header title="Explore Ingredients" />
      <main>
        <CardIngredients />
      </main>
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
