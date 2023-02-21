const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "3e92ace5fbmsh6053770406c5582p1f94c5jsnf9a575f449b9",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
    }
};

export async function fetchData(searchTerm) {
    return fetch(`https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            // handle any errors that occurred
            throw error; // re-throw the error to be caught by the caller
        });
}

// console.log(response);