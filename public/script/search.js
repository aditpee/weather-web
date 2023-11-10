const searchInput = document.querySelector(".search-input");
const clearBtn = document.getElementById("clear-btn");
const searchImg = document.getElementById("search-img");

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  clearBtn.setAttribute("aria-hidden", "false");
  searchImg.setAttribute("aria-hidden", "true");
});

searchInput.addEventListener("input", () => {
  if (searchInput.value == "") {
    clearBtn.setAttribute("aria-hidden", "false");
    searchImg.setAttribute("aria-hidden", "true");
  } else {
    clearBtn.setAttribute("aria-hidden", "true");
    searchImg.setAttribute("aria-hidden", "false");
  }
});
