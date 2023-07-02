import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Exchange from "./exchange.js";

// Business Logic

async function getExchange(currency) {
  const response = await Exchange.getExchange(currency);
  if (response && response.length > 0) {
    printElements(response, currency);
  } else {
    printError("Currency exchange rate not available", currency);
  }
}

// UI Logic
function printElements(response, currency) {
  const ul = document.createElement("ul");

  response.forEach((money) => {
    const li = document.createElement("li");
    li.innerText = money;
    ul.appendChild(li);
  });

  const showResponse = document.querySelector("#showResponse");
  showResponse.innerText = `Current exchange rates for ${currency} are:`;
  showResponse.appendChild(ul);
}

function printError(error, currency) {
  document.querySelector(
    "#showResponse"
  ).innerText = `There was an error accessing data for ${currency}: ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector("#usd").value;
  document.querySelector("#usd").value = null;
  getExchange(currency);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
