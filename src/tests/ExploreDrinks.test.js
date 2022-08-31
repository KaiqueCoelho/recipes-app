import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreDrinks from '../pages/ExploreDrinks';

describe('Testa o componente ExploreDrinks', () => {
  test(' Testa se o componente ExploreDrinks contém dois botões', () => {
    renderWithRouter(<ExploreDrinks />);

    const buttonIngredient = screen.getByRole('button', { name: /by ingre/i });
    const buttonSurprise = screen.getByRole('button', { name: /surprise/i });
    expect(buttonIngredient).toBeInTheDocument();
    expect(buttonSurprise).toBeInTheDocument();
  });

  test('Testa se o botão redireciona para a page /explore/drinks/ingredients', () => {
    const { customHistory } = renderWithRouter(<ExploreDrinks />);

    const buttonIngredient = screen.getByRole('button', { name: /by ingre/i });

    userEvent.click(buttonIngredient);
    expect(customHistory.location.pathname).toBe('/explore/drinks/ingredients');
  });
});
