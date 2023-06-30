import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
// import Cocktail from "./cocktails.js";

/* Business Logic

async function getCocktail(ingredient) {
  const response = await Cocktail.getCocktail(ingredient);
  if (response && response.length > 0) {
    printElements(response, ingredient);
  } else {
    printError("No cocktails found", ingredient);
  }
}

// UI Logic
function printElements(response, ingredient) {
  const ul = document.createElement("ul");

  response.forEach((drink) => {
    const li = document.createElement("li");
    li.innerText = drink;
    ul.appendChild(li);
  });

  const showResponse = document.querySelector("#showResponse");
  showResponse.innerText = `Potential cocktails made with ${ingredient} are:`;
  showResponse.appendChild(ul);
}

function printError(error, ingredient) {
  document.querySelector(
    "#showResponse"
  ).innerText = `There was an error accessing the drink data for ${ingredient}: ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const ingredient = document.querySelector("#liquor").value;
  document.querySelector("#liquor").value = null;
  getCocktail(ingredient);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
*/