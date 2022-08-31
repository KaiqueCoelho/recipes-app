export const foodRandom = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data.meals[0].idMeal;
};

export const drinkRandom = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data.drinks[0].idDrink;
};
