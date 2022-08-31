const filterFoodByCategory = async (category) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await request.json();
  const NUMBER_OF_FOODS = 12;
  const foods = data.meals.slice(0, NUMBER_OF_FOODS);
  return foods;
};

export default filterFoodByCategory;
