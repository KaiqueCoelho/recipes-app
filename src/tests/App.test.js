import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  test('Se o componente é renderizado na rota /', () => {
    const { customHistory } = renderWithRouter(<App />);
    expect(customHistory.location.pathname).toBe('/');
  });
});
