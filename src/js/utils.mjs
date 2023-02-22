export async function renderHeaderFooter() {
  const headerTemplate = await fetch("../partials/header.html").then(response => response.text());
  const footerTemplate = await fetch("../partials/footer.html").then(response => response.text());
  document.querySelector("#main-header").innerHTML = headerTemplate;
  document.querySelector("#main-footer").innerHTML = footerTemplate;
}