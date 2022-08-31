import filterFoodByCategory from '../helpers/filterFoodByCategory';

describe('Testa a função filterFoodByCategory', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: [] }),
    }));
    await filterFoodByCategory();
    expect(typeof (filterFoodByCategory)).toBe('function');
    expect(fetch).toHaveBeenCalled();
  });
});
