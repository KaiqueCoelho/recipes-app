import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Testa o componente Login', () => {
  const emailId = 'email-input';
  const passwordId = 'password-input';
  test('Se o componente login possui dois inputs e um botao', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const button = screen.getByRole('button');
    const title = screen.getByRole('heading', { level: 1 });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Testa se é possível escrever no input-email', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(emailId);
    const email = 'trybe@trybe.com';
    userEvent.type(emailInput, email);
    expect(emailInput.value).toBe(email);
  });

  test('Testa se é possível escrever no input-password', () => {
    renderWithRouter(<Login />);
    const passwordInput = screen.getByTestId(passwordId);
    const password = '1234567';
    userEvent.type(passwordInput, password);
    expect(passwordInput.value).toBe(password);
  });

  test('Testa se a função handleButton é chamada', () => {
    const { customHistory } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(emailId);
    const email = 'trybe@trybe.com';
    const passwordInput = screen.getByTestId(passwordId);
    const password = '1234567';
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(passwordInput, password);
    userEvent.type(emailInput, email);
    userEvent.click(button);
    const storage = localStorage.length;
    const numberOfKeys = 3;
    expect(storage).toBe(numberOfKeys);
    expect(customHistory.location.pathname).toBe('/foods');
  });
});
