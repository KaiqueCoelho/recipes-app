import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa o componente Profile', () => {
  beforeEach(() => {
    global.localStorage.setItem('user', JSON.stringify({ email: 'a@a.com' }));
  });
  test('Se o componente Profile possui 3 botões e um titulo', () => {
    renderWithRouter(<Profile />);
    const title = screen.getByTestId('profile-email');
    const buttonDone = screen.getByRole('button', { name: 'Done Recipes' });
    const buttonFavorite = screen.getByRole('button', { name: 'Favorite Recipes' });
    const buttonLogout = screen.getByRole('button', { name: 'Logout' });

    expect(buttonDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    userEvent.click(buttonLogout);
    expect(global.localStorage.length).toBe(0);
  });
});
