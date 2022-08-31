import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa o componente FavoriteRecipes', () => {
  beforeEach(() => {
    const mockFavorite = [{
      alcoholicOrNot: '',
      category: 'Side',
      id: 52977,
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'food',
    },
    {
      alcoholicOrNot: 'Alcoholic',
      category: 'Cocktail',
      id: '17222',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      name: 'A1',
      nationality: '',
      type: 'drink',
    },
    ];
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));
  });

  test('Se o componente possui três botões de filtro', () => {
    renderWithRouter(<FavoriteRecipes />);
    const foodsFilter = screen.getByRole('button', { name: /Food/i });
    const drinksFilter = screen.getByRole('button', { name: /Drinks/i });
    const allFilter = screen.getByRole('button', { name: /All/i });
    expect(foodsFilter && drinksFilter && allFilter).toBeInTheDocument();
  });

  test('Se renderiza uma bebida e um drink na página', () => {
    renderWithRouter(<FavoriteRecipes />);
    const food = screen.getByText(/Corba/i);
    const drink = screen.getByText(/A1/i);
    expect(food && drink).toBeInTheDocument();
  });

  test('Se os botões funcionam', () => {
    renderWithRouter(<FavoriteRecipes />);
    const foodsFilter = screen.getByRole('button', { name: /Food/i });
    const drinksFilter = screen.getByRole('button', { name: /Drinks/i });
    const allFilter = screen.getByRole('button', { name: /All/i });

    userEvent.click(foodsFilter);
    userEvent.click(drinksFilter);
    userEvent.click(allFilter);

    expect(foodsFilter && drinksFilter && allFilter).toBeEnabled();
  });

  test('Se o botão de remover favorito funciona', () => {
    renderWithRouter(<FavoriteRecipes />);
    const remove = screen.getByTestId('0-horizontal-favorite-btn');
    const removeTwo = screen.getByTestId('1-horizontal-favorite-btn');
    const food = screen.getByText(/Turkish/i);
    const drink = screen.getByText(/Alcoholic/i);
    userEvent.click(remove);
    userEvent.click(removeTwo);
    expect(food).not.toBeInTheDocument();
    expect(drink).not.toBeInTheDocument();
  });

  test('Se o botão de compartilhar funciona', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    });
    renderWithRouter(<FavoriteRecipes />);
    const shareFood = screen.getByTestId('0-horizontal-share-btn');
    const shareDrink = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(shareFood);
    userEvent.click(shareDrink);
    const copyNotification = screen.getAllByText(/Link copied!/i);
    expect(copyNotification[0] && copyNotification[1]).toBeInTheDocument();
  });
});
