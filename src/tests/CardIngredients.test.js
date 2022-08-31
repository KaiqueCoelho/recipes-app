import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import CardIngredients from '../components/CardIngredients';

describe('Testa o componente CardIngredients', () => {
  test('Se renderiza os ingredientes de comida', async () => {
    const { customHistory } = renderWithRouter(<CardIngredients />);
    customHistory.push('/explore/foods/ingredients');
    const ingredient = await screen.findByText(/Chicken/i);
    expect(ingredient).toBeInTheDocument();
  });

  test('Se renderiza os ingredientes de bebida', async () => {
    const { customHistory } = renderWithRouter(<CardIngredients />);
    customHistory.push('/explore/drinks/ingredients');
    const ingredient = await screen.findByText(/Applejack/i);
    expect(ingredient).toBeInTheDocument();
  });

  test('Se ao clickar no ingrediente você é redirecionado', async () => {
    const { customHistory } = renderWithRouter(<CardIngredients />);
    customHistory.push('/explore/drinks/ingredients');
    const ingredient = await screen.findByText(/Applejack/i);
    userEvent.click(ingredient);
    expect(customHistory.location.pathname).toBe('/drinks');
  });

  test('Se ao clickar no ingrediente é renderizado uma receita', async () => {
    const { customHistory } = renderWithRouter(<CardIngredients />);
    customHistory.push('/explore/foods/ingredients');
    const ingredient = await screen.findByText(/Salmon/i);
    userEvent.click(ingredient);
    expect(customHistory.location.pathname).toBe('/foods');
    const food = await screen.findByText(/Brown Stew Chicken/i);
    expect(food).toBeInTheDocument();
  });
});
