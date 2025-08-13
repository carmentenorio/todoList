const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
render();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const taskText = input.value.trim();

  if (taskText !== "") {
    addTaskToList(taskText);
    input.value = "";
    empty.style.display = "none";
  }
});

function deleteTask(text) {
  deleteTask(text);
  render();
}

function renderTask(taskText) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  //ul.innerHTML = `<li><p>${taskText}</p> <button onclick=deleteTask(${taskText})></button></li>`;
  //ul.innerHTML = `<li><p>${taskText}</p> <button onclick="deleteTask('${taskText}')"></button></li>`;

  p.textContent = taskText;
  const deleteBtn = addDeleteBtn(taskText);
  deleteBtn.addEventListener("click", () => {
    removeTaskFromList(taskText, li);
  });

  li.appendChild(p);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}
/**
 * Create the delete button using your function and passing the task to it
 * @param {*} taskText
 * @returns
 */
function addDeleteBtn(taskText) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-delete");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash"); //clase del icon
  icon.style.cursor = "pointer";
  icon.style.color = "red";
  deleteBtn.appendChild(icon);
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteTask(taskText);
    render();
  });
  deleteBtn.appendChild(icon);
  return deleteBtn;
}
/**
 * Load tasks on startup
 *
 */
function render() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log("Lista completa de tareas:", tasks);
  ul.innerHTML = "";

  tasks.forEach((task) => {
    renderTask(task);
  });
  empty.style.display = tasks.length === 0 ? "block" : "none";
}
/**
 * delete task function
 * @param {*} taskText
 */
function deleteTask(taskText) {
  tasks = tasks.filter((task) => task !== taskText);
  saveTasksToStorage();
}
/**
 * Add task to array and DOM
 * @param {*} taskText
 */
function addTaskToList(taskText) {
  tasks.push(taskText);
  saveTasksToStorage();
  render();
}
/**
 * Delete array and DOM task
 * @param {*} taskText
 * @param {*} liElement
 */
function removeTaskFromList(taskText, liElement) {
  tasks = tasks.filter((task) => task !== taskText);
  saveTasksToStorage();

  if (tasks.length === 0) {
    empty.style.display = "block";
  }
}
/**
 * Save to localStorage
 */
function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editBtn() {
  const editBtn = document.createElement("button");
  editBtn.classList.add("btn-edit");
  //crear icono editar
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-pen-to-square"); //clase del icon

  //Insertar ícono dentro del botón
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
  //crear icono ver
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-eye"); //clase del icon

  //Insertar ícono dentro del botón
  viewBtn.appendChild(icon);

  viewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newEditBtn = prompt("Edita la tarea:", p.textContent);
    if (newEditBtn !== null && newEditBtn.trim() !== "") {
      p.textContent = newEditBtn.trim();
    }
  });

  viewBtn.appendChild(icon);
  ~1;
  return viewBtn;
}
