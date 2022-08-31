import filterDrinkByCategory from '../helpers/filterDrinkByCategory';

describe('Testa a função filterDrinkByCategory', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: [] }),
    }));
    await filterDrinkByCategory();
    expect(typeof (filterDrinkByCategory)).toBe('function');
    expect(fetch).toHaveBeenCalled();
  });
});
