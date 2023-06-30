


/* export default class Cocktail {
  static async getCocktail(ingredient) {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const jsonifiedResponse = await response.json();
      if (jsonifiedResponse.drinks && jsonifiedResponse.drinks.length > 0) {
        const drinks = jsonifiedResponse.drinks;
        const cocktailNames = drinks.map((drink) => drink.strDrink);
        return cocktailNames;
      } else {
        throw new Error("No cocktails found");
      }
    } catch (error) {
      throw new Error(`Error accessing the drink data: ${error}`);
    }
  }
} */
