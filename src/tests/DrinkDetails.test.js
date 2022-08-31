import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DrinkDetails from '../pages/DrinkDetails';

describe('Testa o componente DrinkDetails', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<DrinkDetails />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
