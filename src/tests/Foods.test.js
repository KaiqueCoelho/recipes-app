import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testa o componente Foods', () => {
  test('Testa se o componente header redireciona para a pagina profile', () => {
    const { customHistory } = renderWithRouter(<Foods />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(customHistory.location.pathname).toBe('/profile');
  });

  test('Testa se é possivel pesquisar por letra, ingrediente e nome', async () => {
    global.alert = jest.fn();
    renderWithRouter(<Foods />);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'c');
    const searchByLetter = screen.getByTestId('first-letter-search-radio');
    const searchByIngredient = screen.getByTestId('ingredient-search-radio');
    const searchByName = screen.getByTestId(NAME_SEARCH_RADIO);
    userEvent.click(searchByIngredient);
    userEvent.click(searchByName);
    userEvent.click(searchByLetter);
    const searchSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchSubmit);
    const food = await screen.findByText(/Corba/i);
    expect(food).toBeInTheDocument();
    userEvent.type(searchInput, 'ccc');
    userEvent.click(searchSubmit);
    expect(global.alert).toHaveBeenCalled();
  });

  test('Se o ao pesquisar por nome redireciona diretamente para receita', () => {
    const { customHistory } = renderWithRouter(<Foods />);
    customHistory.push('/foods');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchByName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'Mbuzi Choma (Roasted Goat)');
    userEvent.click(searchByName);
    userEvent.click(searchSubmit);
    expect(customHistory.location.pathname).toBe('/foods');
  });

  test('Se o ao pesquisar por nome redireciona diretamente para o drink', () => {
    const { customHistory } = renderWithRouter(<Foods />);
    customHistory.push('/drinks');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchByName = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'Egg Cream');
    userEvent.click(searchByName);
    userEvent.click(searchSubmit);
    expect(customHistory.location.pathname).toBe('/drinks');
  });

  test('Se o componente possui um titulo', () => {
    renderWithRouter(<Foods />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });

  test('Se ao clickar no botão filtra por categoria', async () => {
    renderWithRouter(<Foods />);
    const button = await screen.findByRole('button', { name: /Chicken/i });
    userEvent.click(button);
    const drink = await screen.findByText('Ayam Percik');
    expect(drink).toBeInTheDocument();
    userEvent.click(button);
    expect(drink).not.toBeInTheDocument();
  });

  test('Se existem os botões das categorias na página', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: [{ idDrink: 0 }], meals: [{ idMeal: 0 }] }),
    }));
    renderWithRouter(<Foods />);
    const categories = screen.getAllByRole('button');
    const numberOfCategories = 6;
    expect(categories).toHaveLength(numberOfCategories);
  });
});
