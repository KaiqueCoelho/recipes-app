import RecipeContext from '../context/RecipeContext';

describe('Testa o contexto', () => {
  test('Se o contexto é criado', () => {
    expect(typeof (RecipeContext)).toBe('object');
  });
});
