import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import DoneRecipesComponent from '../components/DoneRecipies';

describe('Testa o componente DoneRecipes', () => {
  test('Se o componente possui um titulo', () => {
    renderWithRouter(<DoneRecipes />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });

  test('Se o componente possui um titulo', () => {
    renderWithRouter(<DoneRecipesComponent />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2 + 2 + 1);
    buttons.forEach((button) => {
      userEvent.click(button);
      expect(button).toBeEnabled();
    });
  });
});
