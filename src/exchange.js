export default class Exchange {
  static async getExchange(currency) {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`
      );
      const jsonifiedResponse = await response.json();
      if (jsonifiedResponse.rates && jsonifiedResponse.rates.length > 0) {
        const rates = jsonifiedResponse.rates;
        const currencyNames = rates.map((rate) => rate.conversion_rates);
        return currencyNames;
      } else {
        throw new Error("No exchange rates found");
      }
    } catch (error) {
      throw new Error(`Error accessing the currency data: ${error}`);
    }
  }
}
