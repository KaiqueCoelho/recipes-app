import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/Explore';

describe('Testa o componente Explore', () => {
  test(' Testa se o componente Explore contém dois botões', () => {
    renderWithRouter(<Explore />);

    const buttonFoods = screen.getByRole('button', { name: /explore foods/i });
    const buttonDrinks = screen.getByRole('button', { name: /explore drinks/i });
    expect(buttonFoods).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });

  test('Testa se os botões redirecionam para as pages'
  + '/explore/foods e /explore/drinks', () => {
    const { customHistory } = renderWithRouter(<Explore />);

    const buttonFoods = screen.getByRole('button', { name: /explore foods/i });
    const buttonDrinks = screen.getByRole('button', { name: /explore drinks/i });

    userEvent.click(buttonFoods);
    expect(customHistory.location.pathname).toBe('/explore/foods');

    customHistory.push('/explore');

    userEvent.click(buttonDrinks);
    expect(customHistory.location.pathname).toBe('/explore/drinks');
  });
});
