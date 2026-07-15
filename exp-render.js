(function renderExperienceSections() {
  renderJobs();
  renderEducation();
})();

function renderJobs() {
  const jobsList = document.getElementById("jobsList");
  const jobs = window.jobs || [];

  if (!jobsList || !Array.isArray(jobs)) return;

  if (!jobs.length) {
    jobsList.replaceChildren(createEmptyTimelineItem("Job entries coming soon."));
    initializeExperienceReveal(jobsList);
    return;
  }

  const fragment = document.createDocumentFragment();
  jobs.forEach((job) => fragment.appendChild(createJobItem(job)));
  jobsList.replaceChildren(fragment);
  initializeExperienceReveal(jobsList);
}

function renderEducation() {
  const educationList = document.getElementById("educationList");
  const education = window.education || [];

  if (!educationList || !Array.isArray(education)) return;

  if (!education.length) {
    educationList.replaceChildren(createEmptyTimelineItem("Education entries coming soon."));
    initializeExperienceReveal(educationList);
    return;
  }

  const fragment = document.createDocumentFragment();
  education.forEach((entry) => fragment.appendChild(createEducationItem(entry)));
  educationList.replaceChildren(fragment);
  initializeExperienceReveal(educationList);
}

function createJobItem(job) {
  const item = document.createElement("li");

  const content = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = job.role || "";

  const organization = document.createElement("p");
  organization.textContent = [job.organization, job.location].filter(Boolean).join(" - ");

  const description = document.createElement("p");
  description.className = "timeline-description";
  description.textContent = job.description || "";

  content.append(title, organization);
  if (job.description) content.appendChild(description);
  if (Array.isArray(job.tags) && job.tags.length) {
    content.appendChild(createTimelineTags(job.tags));
  }

  item.append(content, createTime(job.datetime, job.period));
  return item;
}

function createEducationItem(entry) {
  const item = document.createElement("li");

  const content = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = entry.qualification || "";

  const institution = document.createElement("p");
  institution.textContent = entry.institution || "";

  content.append(title, institution);
  item.append(content, createTime(entry.datetime, entry.period));
  return item;
}

function createTime(datetime, period) {
  const time = document.createElement("time");
  if (datetime) time.dateTime = datetime;
  time.textContent = period || "";
  return time;
}

function createTimelineTags(tags) {
  const tagList = document.createElement("div");
  tagList.className = "timeline-tags";
  tagList.setAttribute("aria-label", "Experience tags");

  tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    tagList.appendChild(chip);
  });

  return tagList;
}

function createEmptyTimelineItem(message) {
  const item = document.createElement("li");
  item.className = "timeline-empty";

  const content = document.createElement("div");
  const text = document.createElement("p");
  text.textContent = message;

  content.appendChild(text);
  item.appendChild(content);
  return item;
}

function initializeExperienceReveal(root) {
  if (typeof window.initRevealItems === "function") {
    window.initRevealItems(root.closest(".section")?.querySelectorAll(".reveal") || []);
  }
}
