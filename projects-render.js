(function renderPortfolioProjects() {
  const projectStack = document.getElementById("projectStack");
  const projects = window.portfolioProjects || [];

  if (!projectStack || !Array.isArray(projects) || !projects.length) return;

  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    fragment.appendChild(createProjectCard(project, index));
  });

  projectStack.replaceChildren(fragment);

  if (typeof window.initProjectSlideshows === "function") {
    window.initProjectSlideshows(projectStack);
  }

  if (typeof window.initRevealItems === "function") {
    window.initRevealItems(projectStack.querySelectorAll(".reveal"));
  }
})();

function createProjectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card reveal";
  article.id = project.id;

  const copy = document.createElement("div");
  copy.className = "project-copy";

  const projectIndex = document.createElement("span");
  projectIndex.className = "project-index";
  projectIndex.textContent = String(index + 1).padStart(2, "0");

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const techStack = document.createElement("div");
  techStack.className = "tech-stack";
  techStack.setAttribute("aria-label", `${project.title} technology stack`);

  project.technologies.forEach((technology) => {
    const chip = document.createElement("span");
    chip.textContent = technology;
    techStack.appendChild(chip);
  });

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const linkIcon = document.createElement("i");
  linkIcon.className = project.urlIcon;
  linkIcon.setAttribute("aria-hidden", "true");

  link.append(linkIcon, document.createTextNode(project.urlLabel));
  copy.append(projectIndex, title, description, techStack, link);

  article.append(copy, createProjectSlideshow(project));
  return article;
}

function createProjectSlideshow(project) {
  const slideshow = document.createElement("div");
  slideshow.className = "web_project-slideshow";
  slideshow.setAttribute("role", "region");
  slideshow.setAttribute("aria-roledescription", "carousel");
  slideshow.setAttribute("aria-label", `${project.title} screenshots`);
  slideshow.tabIndex = 0;

  const slides = document.createElement("div");
  slides.className = "slides";

  project.screenshots.forEach((screenshot) => {
    const image = document.createElement("img");
    image.src = screenshot.src;
    image.alt = screenshot.alt;
    image.loading = "lazy";
    image.decoding = "async";
    slides.appendChild(image);
  });

  const controls = document.createElement("div");
  controls.className = "slide-controls";

  controls.append(
    createSlideButton("prev", `Previous ${project.title} screenshot`, "fa-solid fa-chevron-left"),
    createSlideButton("next", `Next ${project.title} screenshot`, "fa-solid fa-chevron-right"),
    createSlideButton("fullscreen-btn", `View ${project.title} screenshots fullscreen`, "fa-solid fa-expand")
  );

  slideshow.append(slides, controls);
  return slideshow;
}

function createSlideButton(className, label, iconClassName) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);

  const icon = document.createElement("i");
  icon.className = iconClassName;
  icon.setAttribute("aria-hidden", "true");

  button.appendChild(icon);
  return button;
}
