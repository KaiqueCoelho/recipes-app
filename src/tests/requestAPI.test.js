import requestFood from '../services/requestAPI';

describe('Testa a função requestAPI', () => {
  test('Se a função realiza um fetch', async () => {
    global.alert = jest.fn();
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        meals: [{ idMeal: 0 }],
        drinks: [{ idDrink: 0 }],
      }),
    }));
    await requestFood('/drinks', 'Name', 'GG');
    await requestFood('/drinks', 'Ingredient', 'GG');
    await requestFood('/drinks', 'First-Letter', 'G');
    await requestFood('/foods', 'Name', 'GG');
    await requestFood('/foods', 'Ingredient', 'GG');
    await requestFood('/foods', 'First-Letter', 'G');
    const numberOfRequests = 6;
    expect(typeof (requestFood)).toBe('function');
    expect(fetch).toHaveBeenCalledTimes(numberOfRequests);
  });

  test('Se a função retorna erro', async () => {
    global.fetch = jest.fn(() => Promise.reject(Error));
    await requestFood('/drinks', '', 'adsfadsfdsafasfdsafasfa');
    await requestFood('/foods', '', 'G');
    expect(typeof (requestFood)).toBe('function');
    expect(global.alert).toHaveBeenCalled();
  });
});
