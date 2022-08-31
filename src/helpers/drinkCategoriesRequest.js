const drinkCategoriesRequest = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await request.json();
  const NUMBER_OF_CATEGORIES = 5;
  const categories = data.drinks.slice(0, NUMBER_OF_CATEGORIES);
  return categories;
};

export default drinkCategoriesRequest;
