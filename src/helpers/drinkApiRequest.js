const drinkApiRequest = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await request.json();
  const NUMBER_OF_DRINKS = 12;
  const drinks = data.drinks.slice(0, NUMBER_OF_DRINKS);
  return drinks;
};

export default drinkApiRequest;
