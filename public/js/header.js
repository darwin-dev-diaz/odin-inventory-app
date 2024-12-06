const headerDiv = document.getElementById("headerDiv");
document.addEventListener("scroll", (e) => {
  if (window.scrollY > 48) headerDiv.classList.add("onScroll");
  else headerDiv.classList.remove("onScroll");
});

const headerIcons = document.querySelectorAll("a");
headerIcons.forEach((icon) => {
  const name = icon.querySelector("div");

  icon.addEventListener("mouseover", (e) => {
    name.classList.add("animate__fadeIn");
    name.classList.remove("animate__fadeOut", "hidden");
  });

  icon.addEventListener("mouseleave", (e) => {
    name.classList.add("animate__fadeOut");
    name.classList.remove("animate__fadeIn");
  });
});
