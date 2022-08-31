const NUMBER_INGREDIENTS = 12;
export const foodIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  const ingredients = data.meals.slice(0, NUMBER_INGREDIENTS);
  return ingredients;
};

export const drinkIngredients = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  const ingredients = data.drinks.slice(0, NUMBER_INGREDIENTS);
  return ingredients;
};
