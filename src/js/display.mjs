export function displayResults(data, resultsDiv, resultsContainer) {
    const artistName = data.artists.items[0].data.profile.name;
    const imageUrl = data.artists.items[0].data.visuals.avatarImage.sources[1].url;

    const artistNameElement = document.createElement("p");
    artistNameElement.innerText = `Artist Name: ${artistName}`;
    artistNameElement.classList.add("artist-name");

    const artistImageElement = document.createElement("img");
    artistImageElement.src = imageUrl;
    artistImageElement.classList.add("artist-image");

    // Add the artist name and image elements to the results div
    resultsDiv.innerHTML = "";
    resultsDiv.appendChild(artistNameElement);
    resultsDiv.appendChild(artistImageElement);

    // Add the radio buttons to the results div
    const radioForm = document.createElement("form");
    radioForm.innerHTML = `Is this the right artist?
      <div>
        <label for="yes">Yes</label>
        <input type="radio" name="correct-artist" value="yes" id="yes">
      </div>
      <div>
        <label for="no">No</label>
        <input type="radio" name="correct-artist" value="no" id="no">
      </div>
    `;
    radioForm.classList.add("radio-form");

    resultsDiv.appendChild(radioForm);
    resultsContainer.classList.remove("no-border");
}
