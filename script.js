document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("project-form");
  const list = document.getElementById("project-list");

  // --- Funkcja do rysowania jednego projektu w DOM ---
  function renderProject(project) {
    const projectItem = document.createElement("div");
    projectItem.className = "project-item";
    projectItem.innerHTML = `
      <strong>${project.name}</strong> | Kategoria: ${project.category} | Status: ${project.status} | Poziom: ${project.level}
      <button class="edit">✏️</button>
      <button class="delete">🗑️</button>
    `;

    // Usuwanie
    projectItem.querySelector(".delete").addEventListener("click", () => {
      projects = projects.filter(p => p.id !== project.id);
      saveProjects();
      list.removeChild(projectItem);
    });

    // Edycja
    projectItem.querySelector(".edit").addEventListener("click", () => {
      document.getElementById("project-name").value = project.name;
      document.getElementById("project-category").value = project.category;
      document.getElementById("project-status").value = project.status;
      document.getElementById("project-level").value = project.level;

      projects = projects.filter(p => p.id !== project.id);
      saveProjects();
      list.removeChild(projectItem);
    });

    list.appendChild(projectItem);
  }

  // --- Funkcja zapisu do localStorage ---
  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  // --- Wczytanie projektów z localStorage ---
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  projects.forEach(renderProject);

  // --- Obsługa dodawania nowego projektu ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("project-name").value.trim();
    const category = document.getElementById("project-category").value.trim();
    const status = document.getElementById("project-status").value.trim();
    const level = document.getElementById("project-level").value.trim();

    if (!name) {
      alert("Nazwa projektu jest wymagana!");
      return;
    }

    const id = Date.now();

    const newProject = { id, name, category, status, level };
    projects.push(newProject);
    saveProjects();

    renderProject(newProject);

    form.reset();
  });
});
