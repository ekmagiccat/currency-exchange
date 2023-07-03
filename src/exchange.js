export default class Exchange {
  static async getExchange() {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/1f131809679f2053562dbaa7/latest/USD`
      );
      const jsonifiedResponse = await response.json();
      if (jsonifiedResponse.rates >= 0) {
        const rates = jsonifiedResponse.conversion_rates;
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
