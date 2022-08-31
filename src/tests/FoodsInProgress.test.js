import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FoodsInProgress from '../pages/FoodsInProgress';

describe('Testa o componente FoodsInProgress', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<FoodsInProgress />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
