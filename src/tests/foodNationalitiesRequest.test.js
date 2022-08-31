import { foodNationalities, foodsByCountry } from '../helpers/foodNationalitiesRequest';

describe('Testa a função foodNationalitiesRequest', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: [{ idMeal: 0 }],
        drinks: [{ idDrink: 0 }],
      }),
    }));
    await foodNationalities();
    await foodsByCountry();
    expect(typeof (foodNationalities)).toBe('function');
    expect(typeof (foodsByCountry)).toBe('function');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
