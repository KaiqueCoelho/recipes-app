import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa o componente NotFound', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
