const searchForm = document.querySelector(".search-form");
const logo = document.getElementById("logo");
const mainInfo = document.querySelector(".weather-main-info");
const cards = document.querySelectorAll(".cards");

// create loading element
const loading = document.createElement("div");
loading.className = "loading"; // add class

// for search btn if we click, input submit
function opacityLoading(parent) {
  const children = parent.children;
  [...children].forEach((child) => {
    child.style.filter = "opacity(0)";
  });
}

function loadingEffect(element) {
  opacityLoading(element);
  if (!element.dataset.position) {
    element.classList.add("relative");
  }
  element.appendChild(loading.cloneNode(true));
}

function loadingAnimation() {
  document.body.style.setProperty("--background-image", "");
  loadingEffect(logo);
  loadingEffect(searchForm);
  loadingEffect(mainInfo);

  cards.forEach((card) => {
    const headingCard = card.previousElementSibling;
    const parents = [...card.children];
    loadingEffect(headingCard);
    parents.forEach((parent) => {
      loadingEffect(parent);
    });
  });
}

export { loadingAnimation };
