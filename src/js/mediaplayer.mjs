export function displayTracks(tracks) {
    const tracksList = document.createElement("ul");
    tracksList.classList.add("tracks-list");

    tracks.forEach(track => {
        const trackElement = document.createElement("li");
        trackElement.textContent = track.name;
        trackElement.dataset.uri = track.uri; // Store the track URI in a data attribute
        tracksList.appendChild(trackElement);

        // Add a click event listener to play the track
        trackElement.addEventListener("click", () => {
            playTrack(track.uri);
        });
    });

    const resultsDiv = document.getElementById("resultsDiv");
    resultsDiv.appendChild(tracksList);
}
export let player;

export function initSpotifyPlayer(accessToken) {
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = accessToken;
        const Player = new Spotify.Player({
            name: "Web Playback SDK",
            getOAuthToken: (cb) => {
                cb(token);
            },
        });

        // Error handling
        Player.addListener("initialization_error", ({ message }) => {
            console.error(message);
        });
        Player.addListener("authentication_error", ({ message }) => {
            console.error(message);
        });
        Player.addListener("account_error", ({ message }) => {
            console.error(message);
        });
        Player.addListener("playback_error", ({ message }) => {
            console.error(message);
        });

        // Playback status updates
        Player.addListener("player_state_changed", (state) => {
            console.log(state);
        });

        // Ready
        Player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
        });

        // Not Ready
        Player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        Player.connect().then((success) => {
            if (success) {
                console.log("Connected to Spotify Web Playback SDK");
                player = Player;
            }
        });
    };
}

export function playTrack(uri) {
    if (player) {
        player._options.getOAuthToken((accessToken) => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player._options.id}`, {
                method: "PUT",
                body: JSON.stringify({ uris: [uri] }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });
    } else {
        console.error("Player is not initialized");
    }
}
