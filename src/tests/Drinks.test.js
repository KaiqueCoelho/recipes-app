import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Drinks from '../pages/Drinks';

describe('Testa o componente Drinks', () => {
  beforeEach(() => {
    renderWithRouter(<Drinks />);
  });

  test('Se o componente possui um titulo', () => {
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });

  test('Se ao clickar no botão filtra por categoria', async () => {
    const button = await screen.findByRole('button', { name: /Cocoa/i });
    userEvent.click(button);
    const drink = await screen.findByText('Castillian Hot Chocolate');
    expect(drink).toBeInTheDocument();
    userEvent.click(button);
    expect(drink).not.toBeInTheDocument();
  });

  test('Se existem os botões das categorias na página', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: [{ idDrink: 0 }], meals: [{ idMeal: 0 }] }),
    }));
    const categories = screen.getAllByRole('button');
    const numberOfCategories = 6;
    expect(categories).toHaveLength(numberOfCategories);
  });
});
