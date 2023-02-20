const searchResults = []; // Assume this is an array of search results
const resultsPerPage = 10; // Number of results to display per page

// Calculate the total number of pages needed to display all results
const numPages = Math.ceil(searchResults.length / resultsPerPage);

// Initialize the current page number
let currentPage = 1;

// Function to display a specific page of results
function displayPage(pageNumber) {
  // Clear any previous results from the page
  document.querySelector("#results").innerHTML = "";
  
  // Calculate the starting and ending indices for the current page
  const startIndex = (pageNumber - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  
  // Loop through the results for the current page and add them to the page
  for (let i = startIndex; i < endIndex; i++) {
    if (i >= searchResults.length) break;
    
    const result = searchResults[i];
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `Result ${i + 1}: ${result}`;
    
    document.querySelector("#results").appendChild(resultElement);
  }
}

// Function to handle clicking on a page button
function handlePageButtonClick(event) {
  const pageNumber = parseInt(event.target.textContent);
  currentPage = pageNumber;
  displayPage(currentPage);
}

// Function to generate the page buttons
function generatePageButtons() {
  // Clear any previous buttons
  document.querySelector("#page-buttons").innerHTML = "";
  
  // Loop through the total number of pages and add a button for each page
  for (let i = 1; i <= numPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", handlePageButtonClick);
    
    document.querySelector("#page-buttons").appendChild(pageButton);
  }
}
const paginationContainer = document.querySelector("#pagination-container");
const pagination = document.querySelector("#pagination");

// When the search results are returned, check if there are more than 10
if (searchResults.length > 10) {
  // Show the pagination container
  paginationContainer.style.display = "block";
  
  // Generate the pagination items
  for (let i = 0; i < Math.ceil(searchResults.length / 10); i++) {
    const paginationItem = document.createElement("li");
    paginationItem.innerHTML = `<a href="#">${i + 1}</a>`;
    pagination.appendChild(paginationItem);
  }
} else {
  // Hide the pagination container
  paginationContainer.style.display = "none";
}
// Call the function to generate the page buttons and display the first page of results
generatePageButtons();
displayPage(currentPage);


