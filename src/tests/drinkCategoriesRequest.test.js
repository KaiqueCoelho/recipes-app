import drinkCategoriesRequest from '../helpers/drinkCategoriesRequest';

describe('Testa a função drinkCategoriesRequest', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: [] }),
    }));
    await drinkCategoriesRequest();
    expect(typeof (drinkCategoriesRequest)).toBe('function');
    expect(fetch).toHaveBeenCalled();
  });
});
