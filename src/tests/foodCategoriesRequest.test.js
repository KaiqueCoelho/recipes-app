import foodCategoriesRequest from '../helpers/foodCategoriesRequest';

describe('Testa a função foodCategoriesRequest', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: [] }),
    }));
    await foodCategoriesRequest();
    expect(typeof (foodCategoriesRequest)).toBe('function');
    expect(fetch).toHaveBeenCalled();
  });
});
