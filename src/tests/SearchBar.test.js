import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';

describe('Testa a SearchBar', () => {
  test('testa se tem os data-testid dos "radio button e do button"', () => {
    renderWithRouter(<Foods />);
    const LENGTH_RADIO = 3;
    const searchIcon = screen.getByTestId('search-top-btn');

    userEvent.click(searchIcon);
    expect(screen.getAllByTestId(/search-radio/i)).toHaveLength(LENGTH_RADIO);
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });
});
