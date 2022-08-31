import drinkApiRequest from '../helpers/drinkApiRequest';

describe('Testa a função drinkApiRequest', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: [] }),
    }));
    await drinkApiRequest();
    expect(typeof (drinkApiRequest)).toBe('function');
    expect(fetch).toHaveBeenCalled();
  });
});
