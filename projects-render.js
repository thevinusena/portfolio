(function renderProjectSections() {
  renderMainProjects();
  renderUniversityProjects();
})();

function renderMainProjects() {
  const projectStack = document.getElementById("projectStack");
  const projects = window.portfolioProjects || [];

  if (!projectStack || !Array.isArray(projects) || !projects.length) return;

  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    fragment.appendChild(createProjectCard(project, index));
  });

  projectStack.replaceChildren(fragment);
  initializeDynamicProjectUi(projectStack);
}

function renderUniversityProjects() {
  const universityStack = document.getElementById("universityProjectStack");
  const projects = window.universityProjects || [];

  if (!universityStack) return;

  if (!Array.isArray(projects) || !projects.length) {
    const fallback = document.createElement("p");
    fallback.className = "project-fallback university-empty";
    fallback.textContent = "University projects coming soon.";
    universityStack.replaceChildren(fallback);
    initializeDynamicProjectUi(universityStack);
    return;
  }

  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    fragment.appendChild(createUniversityProjectCard(project, index));
  });

  universityStack.replaceChildren(fragment);
  initializeDynamicProjectUi(universityStack);
}

function createProjectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card reveal";
  article.id = project.id;

  const copy = document.createElement("div");
  copy.className = "project-copy";
  copy.append(
    createProjectIndex(index),
    createTextElement("h3", project.title),
    createTextElement("p", project.description),
    createTechStack(project.title, project.technologies),
    createProjectLink(project)
  );

  article.append(copy, createProjectSlideshow(project));
  return article;
}

function createUniversityProjectCard(project, index) {
  const article = document.createElement("article");
  article.className = "university-project-card reveal";
  article.id = project.id;

  const screenshot = getUniversityScreenshot(project);
  if (screenshot) {
    article.appendChild(createUniversityMedia(project.title, screenshot));
  }

  const body = document.createElement("div");
  body.className = "university-project-body";
  body.append(
    createProjectIndex(index),
    createTextElement("h3", project.title),
    createTextElement("p", project.description),
    createTechStack(project.title, project.technologies)
  );

  const link = createProjectLink(project);
  if (link) body.appendChild(link);

  article.appendChild(body);
  return article;
}

function createProjectIndex(index) {
  const projectIndex = document.createElement("span");
  projectIndex.className = "project-index";
  projectIndex.textContent = String(index + 1).padStart(2, "0");
  return projectIndex;
}

function createTextElement(tagName, text) {
  const element = document.createElement(tagName);
  element.textContent = text || "";
  return element;
}

function createTechStack(title, technologies = []) {
  const techStack = document.createElement("div");
  techStack.className = "tech-stack";
  techStack.setAttribute("aria-label", `${title} technology stack`);

  technologies.forEach((technology) => {
    const chip = document.createElement("span");
    chip.textContent = technology;
    techStack.appendChild(chip);
  });

  return techStack;
}

function createProjectLink(project) {
  if (!project.url || !project.urlLabel || !project.urlIcon) return null;

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const linkIcon = document.createElement("i");
  linkIcon.className = project.urlIcon;
  linkIcon.setAttribute("aria-hidden", "true");

  link.append(linkIcon, document.createTextNode(project.urlLabel));
  return link;
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
    slides.appendChild(createScreenshotImage(screenshot));
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

function createUniversityMedia(title, screenshot) {
  const media = document.createElement("div");
  media.className = "university-project-media";

  const image = createScreenshotImage({
    src: screenshot.src,
    alt: screenshot.alt || `${title} screenshot`,
  });

  media.appendChild(image);
  return media;
}

function createScreenshotImage(screenshot) {
  const image = document.createElement("img");
  image.src = screenshot.src;
  image.alt = screenshot.alt;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

function getUniversityScreenshot(project) {
  if (project.screenshot) return project.screenshot;
  if (Array.isArray(project.screenshots) && project.screenshots.length) {
    return project.screenshots[0];
  }
  return null;
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

function initializeDynamicProjectUi(root) {
  if (typeof window.initProjectSlideshows === "function") {
    window.initProjectSlideshows(root);
  }

  if (typeof window.initRevealItems === "function") {
    window.initRevealItems(root.querySelectorAll(".reveal"));
  }
}
