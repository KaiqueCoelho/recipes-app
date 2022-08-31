import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente FoodDetails', () => {
  test('Se o componente DetailsPageBtn renderiza as instruções', async () => {
    const { customHistory } = renderWithRouter(<App />);
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/drinks/15997',
      },
    });
    const emailInput = screen.getByTestId('email-input');
    const email = 'trybe@trybe.com';
    const passwordInput = screen.getByTestId('password-input');
    const password = '1234567';
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(passwordInput, password);
    userEvent.type(emailInput, email);
    userEvent.click(button);
    const drinkPage = await screen.findByTestId('drinks-bottom-btn');
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: [{ idDrink: 0 }], meals: [{ idMeal: 0 }] }),
    }));
    act(() => {
      userEvent.click(drinkPage);
    });
    const gg = await screen.findByText(/GG/i);
    expect(gg).toBeInTheDocument();
    act(() => {
      userEvent.click(gg);
    });
    const instructions = await screen.findByText(/instructions/i);
    const ingredients = await screen.findByText(/ingredients/i);
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    expect(instructions && ingredients && startRecipe).toBeInTheDocument();
    act(() => {
      userEvent.click(startRecipe);
    });
    expect(customHistory.location.pathname).toBe('/drinks/15997/in-progress');
  });
});
