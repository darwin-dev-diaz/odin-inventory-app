const input = document.getElementById("searchInput");
const searchSvg = document.getElementById("searchSvg");
const searchForm = document.getElementById("searchForm");

input.addEventListener("keyup", (e) => {
  if (e.target.value !== "") {
    searchSvg.classList.add("blink");
    searchForm.classList.add("selectionHoverManual");
  } else {
    searchForm.classList.remove("selectionHoverManual");
    searchSvg.classList.remove("blink");
  }
});

const lis = document.querySelectorAll("li");
lis.forEach((li) => {
  const input = li.querySelector("input");
  const label = li.querySelector("label");

  input.addEventListener("change", (e) => {
    label.classList.toggle("selectionHoverManual");
  });
});

const toggleDifficultiesForm = () => {
  const form = document.getElementById("difficulyForm");
  form.classList.toggle("hidden");
};

const toggleCategoryForm = () => {
  const form = document.getElementById("categoryForm");
  form.classList.toggle("hidden");
};
