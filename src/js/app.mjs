import { renderHeaderFooter } from "./utils.mjs";
import { initArtistSearch, initSimilarArtists } from "./display.mjs";
import { displayTracks, initSpotifyPlayer, playTrack } from "./mediaplayer.mjs";


renderHeaderFooter();
const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
initArtistSearch(form, searchInput, resultsDiv, resultsContainer, (button, artistId, searchTerm) => {
    initSimilarArtists(button, resultsDiv, artistId, searchTerm);
});
// Get the access token, e.g., using the Implicit Grant Flow
const accessToken = 'your_access_token_here';

// Initialize the Spotify player with the access token
initSpotifyPlayer(accessToken);

// Use the displayTracks and playTrack functions in your code as needed


