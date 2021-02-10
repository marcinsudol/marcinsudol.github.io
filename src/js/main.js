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
