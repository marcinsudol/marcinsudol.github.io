import data from "./data.js";

const floatingHomeButton = document.getElementById("floating-home-link");

// ---------------------------------------------------------------------
// Loading page
// ---------------------------------------------------------------------

document.onreadystatechange = (event) => {
  if (event.target.readyState === "complete") {
    // load projects list
    loadProjects(data);

    // initially sets floating button display to none
    floatingHomeButton.style.display = "none";
  }
};

// ---------------------------------------------------------------------
// Adding list of projects to the DOM
// ---------------------------------------------------------------------

const loadProjects = (data) => {
  const groupsList = document.getElementById("groups-list");

  for (let i = data.length - 1; i >= 0; i--) {
    groupsList.appendChild(createProjectsGroupElement(data[i]));
  }
};

const createProjectsGroupElement = (obj) => {
  const group = document.createElement("li");
  group.classList = "projects-group";
  group.innerHTML = `<h2 class="group-header">${obj.title}</h2><ol class="projects-list"></ol>`;

  const list = group.querySelector(".projects-list");
  for (let i = obj.projects.length - 1; i >= 0; i--) {
    list.appendChild(createProject(obj.projects[i]));
  }

  return group;
};

const createProject = (obj) => {
  const project = document.createElement("li");
  project.classList = "project";
  project.innerHTML = `<div class="img-container">
              <a href="${obj.page}" target="_blank"><img src="${obj.img}" alt="${obj.name}" /></a>
            </div>
            <div class="info">
              <h3 class="name">${obj.name}</h3>
              <a class="repo" href="${obj.repo}" target="_blank" aria-label="open repository"><i class="fab fa-github"></i> repository</a>
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

// ---------------------------------------------------------------------
// Managing visibility of floating home link
// ---------------------------------------------------------------------

// if floating home link visibility can be updated
let visibilityCanBeUpdated = true;

document.addEventListener("scroll", () => {
  if (visibilityCanBeUpdated) {
    // when scrolling update floating button's visibility
    updateHomeButtonVisibility();
    // not more often than every 200 milliseconds
    visibilityCanBeUpdated = false;
    window.setTimeout(() => {
      visibilityCanBeUpdated = true;
    }, 200);
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

floatingHomeButton.addEventListener("transitionend", () => {
  if (floatingHomeButton.classList.contains("hidden")) {
    // when floating button's transition ends
    // and button has class hidden change its display to none
    floatingHomeButton.style.display = "none";
  }
});
