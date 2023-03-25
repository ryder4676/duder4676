import { paginate } from "./pagination.mjs";
import { options } from "./options.mjs";
// import { artistsInfo } from "./artistInfo.mjs";
import { displayTracks } from "./mediaplayer.mjs";

export function initArtistSearch(form, searchInput, resultsDiv, resultsContainer, onButtonCreated) {
    // This event listener listens for a form submission and prevents the default form behavior
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Get the search term from the search input
        const searchTerm = searchInput.value;
        let artistId; // Declare variable to store artist ID

        // Send a fetch request to the Spotify API with the search term and other parameters, and get the response in JSON format
        fetch(`https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=20&numberOfTopResults=5`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Get the name, image URL, and URI of the first artist in the search results and store them in variables
                const artistName = data.artists.items[0].data.profile.name;
                const imageUrl = data.artists.items[0].data.visuals.avatarImage.sources[0].url;
                const uri = data.artists.items[0].data.uri;
                artistId = uri.replace("spotify:artist:", ""); // Store artist ID in variable
                console.log(artistId);

                // Create new HTML elements for the artist name and image, and add them to the results div
                const artistNameElement = document.createElement("p");
                artistNameElement.innerText = `Artist Name: ${artistName}`;
                artistNameElement.classList.add("artist-name");

                const artistImageElement = document.createElement("img");
                artistImageElement.src = imageUrl;
                artistImageElement.classList.add("artist-image");

                // Create new HTML elements for the radio buttons and button, and add them to the results div
                const radioForm = document.createElement("form");
                radioForm.innerHTML = `Is this the right artist?
              <div>
                <label for="yes">Yes</label>
                <input type="radio" name="correct-artist" value="yes" id="yes">
              </div>
              <div>
                <label for="no">No</label>
                <input type="radio" name="correct-artist" value="no" id="no">
              </div>`;
                radioForm.classList.add("radio-form");

                const button = document.createElement("button");
                button.innerText = "Find similar music";
                button.classList.add("search-button");

                // Wrap artist name, image, radio buttons, and search button in a new div
                const artistInfoDiv = document.createElement("div");
                artistInfoDiv.id = "artist-info";
                artistInfoDiv.appendChild(artistNameElement);
                artistInfoDiv.appendChild(artistImageElement);
                artistInfoDiv.appendChild(radioForm);
                artistInfoDiv.appendChild(button);

                resultsDiv.innerHTML = "";
                resultsDiv.appendChild(artistInfoDiv);

                // Remove the "no-border" class from the results container to reveal the results div
                resultsContainer.classList.remove("no-border");
                // Call the callback function with the created button
                if (typeof onButtonCreated === 'function') {
                    onButtonCreated(button, artistId, searchTerm);
                }
            });
    });

};



export function initSimilarArtists(button, resultsDiv, artistId, searchTerm) {
    // Add event listener to button to search for similar music
    button.addEventListener("click", () => {
        const correctArtist = document.querySelector('input[name="correct-artist"]:checked').value;
        if (correctArtist === "yes") {
            const limit = 40;
            // Use artistId from first fetch in second fetch
            fetch(`https://spotify23.p.rapidapi.com/artist_related/?id=${artistId}&limit=${limit}`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const name = data.artists[0].name;
                    console.log(name);
                    const similarArtists = data.artists.filter(item => item.name.toLowerCase() !== searchTerm.toLowerCase());
                    displaySimilarArtists(similarArtists);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Display error message to user
                    resultsDiv.innerHTML = "Error fetching data. Please try again later.";
                    resultsDiv.classList.add("no-border");
                });
            // This function creates a div element with class "similar-artist" for a given artist object
            function createSimilarArtistElement(artist) {
                // Create a new div element
                const similarArtistElement = document.createElement('div');
                // Add class "similar-artist" to the div
                similarArtistElement.classList.add('similar-artist');
                // Get the URL of the first image in the artist's images array
                const imageUrl = artist.images[0].url;
                // If the artist has an image URL, create a new img element and add it to the div
                if (imageUrl) {
                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    imageElement.alt = artist.name;
                    similarArtistElement.appendChild(imageElement);
                }
                // Create a new p element and set its text content to the artist's name, then add it to the div
                const nameElement = document.createElement('p');
                nameElement.textContent = artist.name;
                similarArtistElement.appendChild(nameElement);

                // Add click event listener to the similarArtistElement
                similarArtistElement.addEventListener("click", () => {
                    moveToTopLeft(similarArtistElement);
                    fetchRelatedArtistTracks(artist.id);
                    artistInfo(artist); // Call the artistInfo function and pass the artist object
                });

                // Return the div element
                return similarArtistElement;
            }

            function moveToTopLeft(element) {
                const resultsDiv = document.getElementById("results");
                const similarArtistsList = document.querySelector(".similar-artists-list");

                similarArtistsList.childNodes.forEach(child => {
                    if (child !== element) {
                        child.style.display = "none";
                    }
                });
                similarArtistsList.style.display = "block";

                const pageButtons = document.querySelector(".page-buttons");
                if (pageButtons) {
                    pageButtons.style.display = "none";
                }

                element.style.zIndex = "100";
                element.style.transition = "all 3s";
                // Create a back button
                const backButton = document.createElement("button");
                backButton.textContent = "Go back";
                backButton.style.position = "absolute";
                backButton.style.left = "0"; // align to the left
                backButton.style.bottom = "20px";
                backButton.style.zIndex = "101";
                backButton.style.transform = "rotate(-90deg)";

                backButton.style.writingMode = "vertical-rl"; // orient text vertically

                // Add an event listener for the back button
                backButton.addEventListener("click", () => {
                    element.style.position = "";
                    element.style.top = "";
                    element.style.left = "";
                    element.style.zIndex = "";
                    element.style.transition = "";
                    similarArtistsList.style.display = "flex";

                    // Show other artists
                    similarArtistsList.childNodes.forEach(child => {
                        child.style.display = "";
                    });

                    if (pageButtons) {
                        pageButtons.style.display = "block";
                    }

                    // Remove the back button
                    backButton.remove();
                });

                document.body.appendChild(backButton);
            }

            function fetchRelatedArtistTracks(artistId) {

                fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${artistId}&country=US`, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const tracks = data.tracks.slice(0, 3); // Get the first 3 tracks
                        displayTracks(tracks);
                    })
                    .catch(error => {
                        console.error("Error fetching tracks:", error);
                    });
            }
            // function displayTracks(tracks) {
            //     const tracksList = document.createElement("ul");
            //     tracksList.classList.add("tracks-list");

            //     tracks.forEach(track => {
            //         const trackElement = document.createElement("li");
            //         trackElement.textContent = track.name;
            //         tracksList.appendChild(trackElement);
            //     });

            //     const resultsDiv = document.getElementById("resultsDiv");
            //     resultsDiv.appendChild(tracksList);
            // }


            // Modified displaySimilarArtists function
            function displaySimilarArtists(similarArtists) {
                const similarArtistsPerPage = 8;
                const similarArtistsList = document.createElement("ul");
                similarArtistsList.classList.add("similar-artists-list");

                const pagination = paginate(similarArtists, similarArtistsPerPage, 1, updateArtistList);

                function updateArtistList(page) {
                    const pageArtists = pagination.displayPage(page);
                    similarArtistsList.innerHTML = "";
                    pageArtists.forEach(artist => {
                        const similarArtistElement = createSimilarArtistElement(artist);
                        similarArtistsList.appendChild(similarArtistElement);
                    });
                }

                updateArtistList(1);

                resultsDiv.innerHTML = "";
                resultsDiv.appendChild(similarArtistsList);
                resultsDiv.appendChild(pagination.container);
            }


            // Note: The code assumes the existence of an HTML element with the ID "resultsDiv" that will contain the list of similar artists.
        };
    });
};
