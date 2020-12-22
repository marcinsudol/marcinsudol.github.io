import data from "./data.js";

document.onreadystatechange = (event) => {
  if (event.target.readyState === "complete") {
    loadProjects(data);
  }
};

const loadProjects = (data) => {
  const projects = document.getElementById("projects");
  data.forEach((obj) => {
    projects.appendChild(createProjectsGroupElement(obj));
  });
};

const createProjectsGroupElement = (obj) => {
  const group = document.createElement("div");
  group.classList = "projects-group box";
  group.innerHTML = `<header class="header">
            <h3 class="textbox">${obj.title}</h3>
          </header>`;

  obj.projects.forEach((obj) => {
    group.appendChild(createProject(obj));
  });

  return group;
};

const createProject = (obj) => {
  const project = document.createElement("article");
  project.classList = "project";
  project.innerHTML = `<div class="img-container">
              <a href="${obj.page}" target="_blank"><img src="${obj.img}" /></a>
            </div>
            <div class="info box-sm">
              <h4 class="name textbox"><a href="${obj.page}" target="_blank">${obj.name}</a></h4>
              <a class="repo pill" href="${obj.repo}" target="_blank">GitHub repo</a>
              <ul class="tech">`;
  const list = project.querySelector(".tech");

  obj.tech.forEach((tech) => {
    let item = document.createElement("li");
    item.classList = "textbox";
    item.textContent = tech;
    list.appendChild(item);
  });
  return project;
};
