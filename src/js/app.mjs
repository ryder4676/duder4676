import { renderHeaderFooter } from "./utils.mjs";
import { initArtistSearch, initSimilarArtists } from "./display.mjs";


renderHeaderFooter();
const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
initArtistSearch(form, searchInput, resultsDiv, resultsContainer, (button, artistId, searchTerm) => {
    initSimilarArtists(button, resultsDiv, artistId, searchTerm);
});


