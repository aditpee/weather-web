const searchInput = document.querySelector(".search-input");
const searchBtn = document.getElementById("search-btn");
const logo = document.getElementById("logo");
const hiddenBtn = document.getElementById("search-hidden-btn");
const mainInfo = document.querySelector(".weather-main-info");

// create loading element
const loading = document.createElement("div");
loading.className = "loading"; // add class

const cards = document.querySelectorAll(".cards");
searchBtn.addEventListener("click", () => {
  hiddenBtn.click();
});

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
  loadingEffect(searchInput);
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
