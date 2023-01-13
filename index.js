"use strict";

const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const mainNav = document.querySelector(".main__nav");
const sectionFeatures = document.querySelector(".section--features");
const header = document.querySelector(".header");

function openModal() {
  modal.classList.add("open");
  backdrop.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
  backdrop.classList.remove("open");
}

function handleHover(e) {
  if (e.target.classList.contains("main__nav--link")) {
    const link = e.target;

    const siblings = link
      .closest(".main__nav")
      .querySelectorAll(".main__nav--link");
    const logo = link.closest(".main__nav").querySelector(".logo");

    siblings.forEach(lnk => {
      if (link !== lnk) lnk.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

document.querySelectorAll(".tab__link").forEach(tab => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelectorAll(".tab").forEach(tb => {
      tb.classList.remove("active");
    });

    this.classList.add("active");
  });
});

document.querySelectorAll(".btn--show-modal").forEach(btn => {
  btn.addEventListener("click", openModal);
});

document.querySelectorAll(".btn--close-modal").forEach(btn => {
  btn.addEventListener("click", closeModal);
});

document.querySelector(".learn-more").addEventListener("click", function (e) {
  e.preventDefault();
  const sectionFeaturesCoords = sectionFeatures.getBoundingClientRect();

  window.scrollTo({
    top: sectionFeaturesCoords.top + window.scrollY,
    left: sectionFeaturesCoords.left + window.scrollX,
    behavior: "smooth"
  });
});

document
  .querySelector(".main__nav--items")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const targetHref = e.target.getAttribute("href");
    if (e.target.classList.contains("main__nav--link")) {
      document.querySelector(targetHref).scrollIntoView({ behavior: "smooth" });
    }
  });

document.querySelector(".tabs").addEventListener("click", function (e) {
  e.preventDefault();

  [...this.querySelectorAll(".tab--link")].forEach(tab => {
    tab.classList.remove("active");
  });

  if (e.target.classList.contains("tab--link")) {
    e.target.classList.add("active");

    [...document.querySelectorAll(".tab--item")].forEach(item => {
      item.classList.remove("active");
    });
    document
      .querySelector(e.target.getAttribute("href"))
      .classList.add("active");
  }
});

mainNav.addEventListener("mouseover", handleHover.bind(0.5));

mainNav.addEventListener("mouseout", handleHover.bind(1));

// Hiding and showing nav menu using scroll
// window.addEventListener("scroll", function () {
//   console.log(window.scrollY);
//   if (window.scrollY >= 100) {
//     mainNav.classList.add("sticky");
//   } else {
//     mainNav.classList.remove("sticky");
//   }
// });

// Hiding and showing nav menu using IntersectionObserver
const obsCallBack = entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 0 && !entry.isIntersecting) {
      mainNav.classList.add("sticky");
    } else {
      mainNav.classList.remove("sticky");
    }
  });
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-60px"
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(header);

const sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("section--hidden");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.15
  }
);

document.querySelectorAll(".section").forEach(section => {
  sectionObserver.observe(section);
});

window.addEventListener("load", function () {
  const heroImage = document.querySelector(".header__image");
  heroImage.src = heroImage.dataset.src;
  heroImage.addEventListener("load", function () {
    heroImage.classList.remove("image--lazy");
  });
});

const imageObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("image--lazy");
      });
      observer.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.9
  }
);

document.querySelectorAll(".feature--image").forEach(img => {
  imageObserver.observe(img);
});
