const deleteExerciseButton = document.getElementById("deleteExerciseButton");
const editExerciseButton = document.getElementById("editExerciseButton");
const formCancelButtons = document.querySelectorAll("#formCancelButton");
const blackScreen = document.getElementById("blackScreen");
const deleteForm = document.getElementById("deleteForm");
const editFormAuth = document.getElementById("editFormAuth");
const editForm = document.getElementById("editForm");

deleteExerciseButton.addEventListener("click", (e) => {
  [blackScreen, deleteForm].forEach((x) => {
    x.classList.add("animate__fadeIn");
    x.classList.remove("animate__fadeOut", "hidden");
  });
});

editExerciseButton.addEventListener("click", (e) => {
  [blackScreen, editFormAuth].forEach((x) => {
    x.classList.add("animate__fadeIn");
    x.classList.remove("animate__fadeOut", "hidden");
  });
});

[Array.from(formCancelButtons), blackScreen].flat().forEach((y) => {
  y.addEventListener("click", (e) => {
    [blackScreen, deleteForm, editFormAuth, editForm].forEach((x) => {
      if (!x.classList.contains("hidden")) {
        x.classList.add("animate__fadeOut");
        x.classList.remove("animate__fadeIn");
        x.addEventListener(
          "animationend",
          () => {
            x.classList.add("hidden");
          },
          { once: true }
        );
      }
    });
  });
});

// newExerciseScript
const inputs = document.querySelectorAll(".editInput");

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (e.target.value !== "") {
      e.target.classList.add("selectionHoverManual");
    } else {
      e.target.classList.remove("selectionHoverManual");
    }
  });
});

let checkedBoxesLen = document.querySelectorAll(
  "input[type=checkbox]:checked"
).length;
const checkedBoxesLis = document.querySelectorAll(".optionCheckBox");
checkedBoxesLis.forEach((li) => {
  const input = li.querySelector("input");
  const label = li.querySelector("label");
  if (input.checked) label.classList.toggle("selectionHoverManual");
  input.addEventListener("change", (e) => {
    label.classList.toggle("selectionHoverManual");
    checkedBoxesLen = document.querySelectorAll(
      "input[type=checkbox]:checked"
    ).length;
  });
});

let radioChecked = true;
const radios = document.querySelectorAll(".optionRadio");
const resetRadioLabels = () => {
  const ls = document.querySelectorAll(".optionRadio label");
  ls.forEach((l) => l.classList.remove("selectionHoverManual"));
};
radios.forEach((li) => {
  const input = li.querySelector("input");
  const label = li.querySelector("label");

  if (input.checked) label.classList.toggle("selectionHoverManual");

  input.addEventListener("change", (e) => {
    radioChecked = true;
    input.checked = true;
    resetRadioLabels();
    label.classList.toggle("selectionHoverManual");
  });
});

const form = document.getElementById("editForm");
form.addEventListener("submit", (e) => {
  const descriptionInputLength = document.getElementById("exerciseDescription")
    .value.length;
  if (!checkedBoxesLen) {
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
