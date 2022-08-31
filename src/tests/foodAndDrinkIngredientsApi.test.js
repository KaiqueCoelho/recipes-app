import { foodIngredients, drinkIngredients } from '../helpers/foodAndDrinkIngredientsApi';

describe('Testa a função foodAndDrinkIngredientsApi', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: [],
        drinks: [],
      }),
    }));
    await foodIngredients();
    await drinkIngredients();
    expect(typeof (foodIngredients)).toBe('function');
    expect(typeof (drinkIngredients)).toBe('function');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
