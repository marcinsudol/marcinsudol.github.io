import data from "./data.js";

document.onreadystatechange = (event) => {
  if (event.target.readyState === "complete") {
    loadProjects(data);
  }
};

const loadProjects = (data) => {
  const projects = document.getElementById("projects");

  for (let i = data.length - 1; i >= 0; i--) {
    projects.appendChild(createProjectsGroupElement(data[i]));
  }
};

const createProjectsGroupElement = (obj) => {
  const group = document.createElement("div");
  group.classList = "projects-group box";
  group.innerHTML = `<header class="header">
            <h3 class="textbox">${obj.title}</h3>
          </header>`;

  for (let i = obj.projects.length - 1; i >= 0; i--) {
    group.appendChild(createProject(obj.projects[i]));
  }

  return group;
};

const createProject = (obj) => {
  const project = document.createElement("article");
  project.classList = "project";
  project.innerHTML = `<div class="img-container">
              <a href="${obj.page}" target="_blank"><img src="${obj.img}" /></a>
            </div>
            <div class="info box-sm">
              <h4 class="name"><a href="${obj.page}" target="_blank">${obj.name}</a></h4>
              <a class="repo textbox hover-shadow" href="${obj.repo}" target="_blank"><i class="fab fa-github"></i> repository</a>
              <ul class="tech"></ul>
            </div>`;
  const list = project.querySelector(".tech");

  obj.tech.forEach((tech) => {
    let item = document.createElement("li");
    item.classList = "textbox";
    item.textContent = tech;
    list.appendChild(item);
  });
  return project;
};
