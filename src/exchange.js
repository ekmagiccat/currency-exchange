export default class Exchange {
  constructor(currencyType) {
    this.currencyType = currencyType;
  }
  static async getExchange() {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`
      );
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch (error) {
      throw new Error(`Error accessing the currency data: ${error}`);
    }
  }
}
