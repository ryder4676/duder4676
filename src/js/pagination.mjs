//pagination for the related artists
export function paginate(items, itemsPerPage, initialPage = 1, onPageChange) {
  const numPages = Math.ceil(items.length / itemsPerPage);
  let currentPage = initialPage;

  const container = document.createElement("div");
  container.classList.add("page-buttons");

  function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }

  function createPageButton(page) {
    const button = document.createElement("button");
    button.textContent = page;
    if (page === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = page;
      onPageChange(currentPage); // Call onPageChange when a button is clicked
      updatePageButtons();
    });
    return button;
  }

  function updatePageButtons() {
    container.innerHTML = "";
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(numPages, currentPage + 2);

    if (startPage > 1) {
      const firstButton = createPageButton(1);
      container.appendChild(firstButton);
      if (startPage > 2) {
        const ellipsis = document.createElement("span");
        ellipsis.textContent = "...";
        container.appendChild(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const button = createPageButton(i);
      container.appendChild(button);
    }

    if (endPage < numPages) {
      if (endPage < numPages - 1) {
        const ellipsis = document.createElement("span");
        ellipsis.textContent = "...";
        container.appendChild(ellipsis);
      }
      const lastButton = createPageButton(numPages);
      container.appendChild(lastButton);
    }
  }

  updatePageButtons();

  return {
    container,
    displayPage,
  };
}
