import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DrinksInProgress from '../pages/DrinksInProgress';

describe('Testa o componente DrinksInProgress', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<DrinksInProgress />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
