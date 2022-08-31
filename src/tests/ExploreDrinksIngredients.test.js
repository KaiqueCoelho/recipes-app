import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';

describe('Testa o componente ExploreDrinksIngredients', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<ExploreDrinksIngredients />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
