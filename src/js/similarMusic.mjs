import { fetchData } from "./fetch.mjs";

export async function searchForSimilarMusic(searchTerm) {
    try {
        // Fetch the search results from the Spotify API
        const data = await fetchData(searchTerm);

        // Extract the array of artists from the search results
        const artists = data.artists.items;

        // Filter the artists to exclude the one that matches the search term
        const similarArtists = artists.filter(
            (artist) => artist.name !== searchTerm
        );

        // Do something with the similarArtists array
        console.log(similarArtists);
    } catch (error) {
        console.error("Error fetching data:", error);
        // handle any errors that occurred
        throw error; // re-throw the error to be caught by the caller
    }
}
