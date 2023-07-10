import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Exchange from "./exchange.js";

// Business Logic

async function getExchange(currencyType, usdAmount) {
  try {
    const response = await Exchange.getExchange(currencyType, usdAmount);
    if (response.conversion_rates) {
      printElements(response, currencyType, usdAmount);
    } else {
      printError(response, currencyType, usdAmount);
    }
  } catch (error) {
    printError(error, currencyType, usdAmount);
  }
}

// UI Logic
document.getElementById("exchange").addEventListener("click", async (event) => {
  event.preventDefault();
  const currencyType = document.getElementById("currencyType").value;
  const usdAmount = parseFloat(document.getElementById("usd").value);
  await getExchange(currencyType, usdAmount);
});

async function printElements(response, currencyType, usdAmount) {
  const euroRate = response.conversion_rates.EUR;
  const chileRate = response.conversion_rates.CLP;
  const poundRate = response.conversion_rates.GBP;
  const japanRate = response.conversion_rates.JPY;
  const icelandRate = response.conversion_rates.ISK;

  document.querySelector(
    "#showResponse"
  ).innerText = ` $${usdAmount} = ${euroRate} ${currencyType}`;
}

async function printError(error, currency) {
  document.querySelector(
    "#showResponse"
  ).innerText = `There was an error accessing data for ${currency}: ${error}.`;
}

window.addEventListener("load", () => {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const currency = document.querySelector("#usd").value;
    document.querySelector("#usd").value = null;
    getExchange(currency);
  });
});
