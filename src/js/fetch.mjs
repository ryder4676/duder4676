const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "3e92ace5fbmsh6053770406c5582p1f94c5jsnf9a575f449b9",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
    }
};
//
export async function fetchData(searchTerm) {
    return fetch(`https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
        .then(response => response.json());

}
// console.log(response);