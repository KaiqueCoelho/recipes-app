import foodApiRequest from '../helpers/foodApiRequest';

describe('Testa a função foodApiRequest', () => {
  test('Se a função realiza um fetch', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: [] }),
    }));
    await foodApiRequest();
    expect(typeof (foodApiRequest)).toBe('function');
    expect(fetch).toHaveBeenCalled();
  });
});
