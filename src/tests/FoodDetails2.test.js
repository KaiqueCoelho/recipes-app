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
    const url = '/foods/52977';
    Object.defineProperty(window, 'location', {
      value: {
        pathname: url,
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
    const corba = await screen.findByText(/Corba/i);
    expect(corba).toBeInTheDocument();
    act(() => {
      userEvent.click(corba);
    });
    const instructions = await screen.findByText(/instructions/i);
    const ingredients = screen.getByText(/ingredients/i);
    const startRecipe = screen.getByTestId('start-recipe-btn');
    const img = await screen.findByRole('img', { name: /gg/i });
    const favBtn = await screen.findByTestId('favorite-btn');
    act(() => {
      userEvent.click(favBtn);
    });
    expect(img && favBtn).toBeInTheDocument();
    expect(instructions && ingredients && startRecipe).toBeInTheDocument();
    act(() => {
      userEvent.click(startRecipe);
    });
    expect(customHistory.location.pathname).toBe('/foods/52977/in-progress');
  });
});
