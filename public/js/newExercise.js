const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (e.target.value !== "") {
      e.target.classList.add("selectionHoverManual");
    } else {
      e.target.classList.remove("selectionHoverManual");
    }
  });
});

let checkboxChecked = 0;
let radioChecked = false;

const checkboxes = document.querySelectorAll(".optionCheckBox");
checkboxes.forEach((li) => {
  const input = li.querySelector("input");
  const label = li.querySelector("label");

  input.addEventListener("change", (e) => {
    label.classList.toggle("selectionHoverManual");
    checkboxChecked = document.querySelectorAll(
      "input[type=checkbox]:checked"
    ).length;
  });
});

const radios = document.querySelectorAll(".optionRadio");
const resetRadioLabels = () => {
  const ls = document.querySelectorAll(".optionRadio label");
  ls.forEach((l) => l.classList.remove("selectionHoverManual"));
};
radios.forEach((li) => {
  const input = li.querySelector("input");
  const label = li.querySelector("label");

  input.addEventListener("change", (e) => {
    radioChecked = true;
    input.checked = true;
    resetRadioLabels();
    label.classList.toggle("selectionHoverManual");
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  const descriptionInputLength = document.getElementById("exerciseDescription")
    .value.length;
  if (!checkboxChecked) {
    e.preventDefault();
    alert("Select at least one category");
  } else if (!radioChecked) {
    e.preventDefault();
    alert("Select a difficulty");
  } else if (descriptionInputLength < 64 && descriptionInputLength > 250) {
    e.preventDefault();
    alert("Description must be between 64 and 128 characters");
  }
});
