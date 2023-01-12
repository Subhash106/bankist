"use strict";

const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");

document.querySelectorAll(".tab__link").forEach(tab => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelectorAll(".tab").forEach(tb => {
      tb.classList.remove("active");
    });

    this.classList.add("active");
  });
});

function openModal() {
  modal.classList.add("open");
  backdrop.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
  backdrop.classList.remove("open");
}

document.querySelectorAll(".btn--show-modal").forEach(btn => {
  btn.addEventListener("click", openModal);
});

document.querySelectorAll(".btn--close-modal").forEach(btn => {
  btn.addEventListener("click", closeModal);
});

document.querySelector(".learn-more").addEventListener("click", function (e) {
  e.preventDefault();
  const sectionFeatures = document
    .querySelector(".section--features")
    .getBoundingClientRect();
  console.log(window.scrollY);

  console.log("sectionFeatures", sectionFeatures);
  window.scrollTo({
    top: sectionFeatures.top + window.scrollY,
    left: sectionFeatures.left + window.scrollX,
    behavior: "smooth"
  });
});
