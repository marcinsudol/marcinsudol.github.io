import data from "./data.js";

const floatingHomeButton = document.getElementById("floating-home-button");

let visibilityCanBeUpdated = true;

document.onreadystatechange = (event) => {
  if (event.target.readyState === "complete") {
    loadProjects(data);
    // initially sets floating button display to none
    floatingHomeButton.style.display = "none";
  }
};

// when scrolling update floating button's visibility
// not more often than every 200 milliseconds
document.addEventListener("scroll", () => {
  if (visibilityCanBeUpdated) {
    updateHomeButtonVisibility();
    visibilityCanBeUpdated = false;
    window.setTimeout(() => {
      visibilityCanBeUpdated = true;
    }, 200);
  }
});

// when floating button's transition ends
// and button has class hidden its display is set to none
floatingHomeButton.addEventListener("transitionend", () => {
  if (floatingHomeButton.classList.contains("hidden")) {
    floatingHomeButton.style.display = "none";
  }
});

const updateHomeButtonVisibility = () => {
  if (window.scrollY > window.innerHeight * 1.2) {
    floatingHomeButton.style.display = "inline-block";
    // wait short period of time and update class list
    window.setTimeout(() => {
      floatingHomeButton.classList.add("visible");
      floatingHomeButton.classList.remove("hidden");
    }, 20);
  } else {
    floatingHomeButton.classList.add("hidden");
    floatingHomeButton.classList.remove("visible");
    // after transition ends display will be set to none by event listener
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
  group.classList = "projects-group";
  group.innerHTML = `<header class="header">
            <h3>${obj.title}</h3>
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
            <div class="info">
              <h4 class="name"><a href="${obj.page}" target="_blank">${obj.name}</a></h4>
              <a class="repo" href="${obj.repo}" target="_blank"><i class="fab fa-github"></i> repository</a>
              <ul class="tech"></ul>
            </div>`;
  const list = project.querySelector(".tech");

  obj.tech.forEach((tech) => {
    let item = document.createElement("li");
    item.textContent = tech;
    list.appendChild(item);
  });
  return project;
};
