export const foodNationalities = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};

export const foodsByCountry = async (country) => {
  const NUMBER_MAX = 12;
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals.slice(0, NUMBER_MAX);
};
