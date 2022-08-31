import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreFoods from '../pages/ExploreFoods';

describe('Testa o componente ExploreFoods', () => {
  test(' Testa se o componente ExploreFoods contém três botões', () => {
    renderWithRouter(<ExploreFoods />);

    const buttonIngredient = screen.getByRole('button', { name: /by ingre/i });
    const buttonNatio = screen.getByRole('button', { name: /by natio/i });
    const buttonSurprise = screen.getByRole('button', { name: /surprise/i });
    expect(buttonIngredient).toBeInTheDocument();
    expect(buttonNatio).toBeInTheDocument();
    expect(buttonSurprise).toBeInTheDocument();
  });

  test('Testa se os botões redirecionam para as pages'
  + '/explore/foods/ingredients e /explore/foods/nationalities', () => {
    const { customHistory } = renderWithRouter(<ExploreFoods />);

    const buttonIngredient = screen.getByRole('button', { name: /by ingre/i });
    const buttonNatio = screen.getByRole('button', { name: /by natio/i });

    userEvent.click(buttonIngredient);
    expect(customHistory.location.pathname).toBe('/explore/foods/ingredients');

    customHistory.push('/explore/foods');

    userEvent.click(buttonNatio);
    expect(customHistory.location.pathname).toBe('/explore/foods/nationalities');
  });
});
