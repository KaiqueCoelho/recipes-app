import { foodRandom, drinkRandom } from '../helpers/foodAndDrinkRandomApi';

describe('Testa a função foodAndDrinkRandomApi', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: [{ idMeal: 0 }],
        drinks: [{ idDrink: 0 }],
      }),
    }));
    await foodRandom();
    await drinkRandom();
    expect(typeof (foodRandom)).toBe('function');
    expect(typeof (drinkRandom)).toBe('function');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
