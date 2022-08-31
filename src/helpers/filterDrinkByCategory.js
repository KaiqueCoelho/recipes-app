const filterDrinkByCategory = async (category) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await request.json();
  const NUMBER_OF_DRINKS = 12;
  const foods = data.drinks.slice(0, NUMBER_OF_DRINKS);
  return foods;
};

export default filterDrinkByCategory;
