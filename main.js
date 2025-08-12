const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

loadTask();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const taskText = input.value;

  if (taskText !== "") {
    addTaskToList(taskText);

    input.value = "";
    empty.style.display = "none";
  }
});
/**
 * Render tasks
 * @param {} taskText
 */
function renderTask(taskText) {
  const li = document.createElement("li");
  const p = document.createElement("p");

  p.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", () => {
    removeTaskFromList(taskText, li);
  });

  const editBtn = document.createElement("b");

  li.appendChild(p);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-delete");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash");
  icon.style.cursor = "pointer";
  icon.style.color = "red";

  deleteBtn.appendChild(icon);

  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const li = e.target.closest("li");
    ul.removeChild(li);

    deletTask(taskText);

    const items = document.querySelectorAll("li");
    if (items.length === 0) {
      empty.style.display = "block"; //mostrar mensaje de lista vacia
    }
  });
  deleteBtn.appendChild(icon);
  return deleteBtn;
}
/**
 *
 */
function loadTask() {
  ul.innerHTML = "";
  tasks.forEach((task) => {
    renderTask(task);
  });
  empty.style.display = tasks.length === 0 ? "block" : "none";
}

function deletTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
/**
 * Add task to array
 * @param {*} taskText
 */

function addTaskToList(taskText) {
  tasks.push(taskText);
  saveTasks();
  renderTask(taskText);
}
/**
 * Delete array and DOM task
 * @param {*} taskText
 * @param {*} liElement
 */
function removeTaskFromList(taskText, liElement) {
  tasks = tasks.filter((task) => task !== taskText);
  saveTasks();
  ul.removeChild(liElement);

  if (tasks.length === 0) {
    empty.style.display = "block";
  }
}
/**
 * Save to localStorage
 */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editBtn() {
  const editBtn = document.createElement("button");
  editBtn.classList.add("btn-edit");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-pen-to-square");
  editBtn.appendChild(icon);

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newEditBtn = prompt("Edita la tarea:", p.textContent);
    if (newEditBtn !== null && newEditBtn.trim() !== "") {
      p.textContent = newEditBtn.trim();
    }
  });

  editBtn.appendChild(icon);
  return editBtn;
}

function viewBtn() {
  const viewBtn = document.createElement("button");
  viewBtn.classList.add("btn-edit");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-eye");
  viewBtn.appendChild(icon);

  viewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newEditBtn = prompt("Edita la tarea:", p.textContent);
    if (newEditBtn !== null && newEditBtn.trim() !== "") {
      p.textContent = newEditBtn.trim();
    }
  });

  viewBtn.appendChild(icon);
  return viewBtn;
}
