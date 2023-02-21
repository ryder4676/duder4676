import { displayResults } from "../js/display.mjs";
import { fetchData } from "../js/fetch.mjs";
import { renderHeaderFooter } from "../js/utils.mjs";

renderHeaderFooter();
const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");
// const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  fetchData(searchTerm)
    .then(data => {
      displayResults(data, resultsDiv, resultsContainer);
    })
    .catch(error => {
      console.error(error);
      resultsDiv.innerHTML = "<p>An error occurred. Please try again later.</p>";
    });
});
