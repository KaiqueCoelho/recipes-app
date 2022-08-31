const foodCategoriesRequest = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await request.json();
  const NUMBER_OF_CATEGORIES = 5;
  const categories = data.meals.slice(0, NUMBER_OF_CATEGORIES);
  return categories;
};

export default foodCategoriesRequest;
