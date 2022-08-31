import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExploreFoodsNationalities from '../pages/ExploreFoodsNationalities';

describe('Testa o componente ExploreFoodsNationalities', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<ExploreFoodsNationalities />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
