import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';

describe('Testa o componente ExploreFoodsIngredients', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<ExploreFoodsIngredients />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
