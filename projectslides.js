const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.querySelector("[data-menu-overlay]");
const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
const sectionTargets = desktopLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

let lastScrollY = window.scrollY;
let revealObserver = null;

function setMenu(open, restoreFocus = true) {
  if (!mobileMenu || !menuToggle || !mobileOverlay) return;

  document.body.classList.toggle("menu-open", open);
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileOverlay.hidden = !open;

  if (open) {
    const firstLink = mobileMenu.querySelector("a, button");
    firstLink?.focus();
  } else if (restoreFocus) {
    menuToggle.focus();
  }
}

function initRevealItems(items = document.querySelectorAll(".reveal")) {
  const revealItems = [...items].filter((item) => !item.dataset.revealReady);

  if (!revealItems.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => {
      item.dataset.revealReady = "true";
      item.classList.add("is-visible");
    });
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -44px 0px",
    });
  }

  revealItems.forEach((item, index) => {
    item.dataset.revealReady = "true";
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });
}

function initProjectSlideshows(root = document) {
  root.querySelectorAll(".web_project-slideshow").forEach((slideshow) => {
    if (slideshow.dataset.slideshowReady) return;

    const slides = [...slideshow.querySelectorAll(".slides img")];
    const prevButton = slideshow.querySelector(".prev");
    const nextButton = slideshow.querySelector(".next");
    const fullscreenButton = slideshow.querySelector(".fullscreen-btn");
    const baseLabel = slideshow.getAttribute("aria-label") || "Project screenshots";
    let index = 0;

    if (!slides.length) return;

    slideshow.dataset.slideshowReady = "true";

    function show(nextIndex) {
      slides[index].classList.remove("active");
      slides[index].setAttribute("aria-hidden", "true");

      index = (nextIndex + slides.length) % slides.length;

      slides[index].classList.add("active");
      slides[index].setAttribute("aria-hidden", "false");
      slideshow.setAttribute("aria-label", `${baseLabel}, slide ${index + 1} of ${slides.length}`);
    }

    slides.forEach((slide) => slide.setAttribute("aria-hidden", "true"));
    slides[0].classList.add("active");
    slides[0].setAttribute("aria-hidden", "false");
    slideshow.setAttribute("aria-label", `${baseLabel}, slide 1 of ${slides.length}`);

    prevButton?.addEventListener("click", () => show(index - 1));
    nextButton?.addEventListener("click", () => show(index + 1));

    slideshow.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(index - 1);
      if (event.key === "ArrowRight") show(index + 1);
    });

    function updateFullscreenButton() {
      const isFullscreen = document.fullscreenElement === slideshow;
      if (!fullscreenButton) return;

      fullscreenButton.innerHTML = isFullscreen
        ? '<i class="fa-solid fa-compress" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-expand" aria-hidden="true"></i>';
      fullscreenButton.setAttribute(
        "aria-label",
        isFullscreen ? "Exit fullscreen screenshots" : "View screenshots fullscreen"
      );
    }

    fullscreenButton?.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement === slideshow) {
          await document.exitFullscreen();
        } else {
          await slideshow.requestFullscreen();
        }
      } catch (error) {
        console.warn("Fullscreen request was blocked.", error);
      }
    });

    document.addEventListener("fullscreenchange", updateFullscreenButton);
  });
}

window.initRevealItems = initRevealItems;
window.initProjectSlideshows = initProjectSlideshows;

menuToggle?.addEventListener("click", () => setMenu(true));
menuClose?.addEventListener("click", () => setMenu(false));
mobileOverlay?.addEventListener("click", () => setMenu(false));

mobileMenu?.querySelectorAll("a, [data-menu-action]").forEach((item) => {
  item.addEventListener("click", () => setMenu(false, false));
});

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  header?.classList.toggle("is-scrolled", currentScrollY > 18);
  header?.classList.toggle(
    "is-hidden",
    currentScrollY > lastScrollY && currentScrollY > 420 && !document.body.classList.contains("menu-open")
  );

  lastScrollY = Math.max(currentScrollY, 0);
}, { passive: true });

if (sectionTargets.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeId = `#${entry.target.id}`;
      desktopLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === activeId);
      });
    });
  }, {
    rootMargin: "-30% 0px -58% 0px",
    threshold: 0.01,
  });

  sectionTargets.forEach((section) => navObserver.observe(section));
}

initRevealItems();
initProjectSlideshows();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    setMenu(false);
  }
});
