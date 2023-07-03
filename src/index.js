import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Exchange from "./exchange.js";

// Business Logic

async function getExchange(currencyType) {
  const response = await Exchange.getExchange(currencyType);
  if (response.main) {
    printElements(response, currencyType);
  } else {
    printError(response, currencyType);
  }
}

// UI Logic
document.getElementById("exchange").addEventListener("click", function (event) {
  event.preventDefault();
  const currencyType = document.getElementById("currencyType").value;
  const usdAmount = parseFloat(document.getElementById("usd").value);
  handleExchangeRate(currencyType, usdAmount);
});

function handleExchangeRate(currencyType, usdAmount) {
  console.log(`Currency: ${currencyType}, USD Amount: ${usdAmount}`);
}

function printElements(response, currencyType) {
  document.querySelector(
    "#showResponse"
  ).innerText = `${currencyType} is ${response.main.conversion_rates}`;
}

function printError(error, currency) {
  document.querySelector(
    "#showResponse"
  ).innerText = `There was an error accessing data for ${currency}: ${error}.`;
}

// function handleFormSubmission(event) {
//  event.preventDefault();
//  const currency = document.querySelector("#usd").value;
//  document.querySelector("#usd").value = null;
//  getExchange(currency);
// }

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", handleExchangeRate);
});
