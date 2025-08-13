const inputTask = document.querySelector("#taskInput");
const inputDesc = document.querySelector("#descriptionInput");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
/**
 * load tasks on page startup
 */
render();
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskText = inputTask.value.trim();
  const description = inputDesc.value.trim();
  if (taskText !== "" && description !== "") {
    addTaskToList(taskText, description);
    inputTask.value = "";
    inputDesc.value = "";
    empty.style.display = "none";
  }
});
/**
 * function to render and display dynamically
 * @returns
 */
function render() {
  if (tasks.length === 0) {
    ul.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  ul.innerHTML = tasks
    .map((task, index) => {
      return `
      <li>
       <input type="checkbox"
       ${task.completed ? "checked" : ""}
        onchange="toggleTask(${index})">
        <p>${task.text} - ${task.description} </p>
        <button class="btn-view" onclick="viewTaskByIndex(${index})">
          <i class="fa-solid fa-eye" style="cursor:pointer; color:green;"></i>
        </button>
        <button class="btn-edit" onclick="editTaskByIndex(${index})">
          <i class="fa-solid fa-pen-to-square" style="cursor:pointer; color:blue;"></i>
        </button>
         <button class="btn-delete" onclick="deleteTaskByIndex(${index})">
          <i class="fa-solid fa-trash" style="cursor:pointer; color:red;"></i>
        </button>
      </li>
    `;
    })
    .join("");
}
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage();
  render();
}
/**
 * function that does not delete by index in the map
 * @param {*} taskText
 */
function deleteTask(taskText) {
  tasks = tasks.filter((task) => task !== taskText);
  saveTasksToStorage();
  render();
}
/**
 * add task to DOM and array
 * @param {*} taskText, description
 */
function addTaskToList(taskText, description) {
  tasks.push({
    text: taskText,
    description: description,
    completed: false,
  });
  saveTasksToStorage();
  render();
}
/**
 * function that doses not delete by index
 * @param {*} i
 */
function deleteTaskByIndex(i) {
  tasks.splice(i, 1);
  saveTasksToStorage();
  render();
}
/**
 * Delete array and DOM task
 * @param {*} taskText
 * @param {*} liElement
 */
function removeTaskFromList(taskText, liElement) {
  deleteTask(taskText);
}
/**
 * save in localStorage
 */
function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
/**
 * view task (only shows text in alert)
 * @param {*} id
 */
function viewTaskByIndex(index) {
  const task = tasks[index];
  if (task) {
    alert("Task: " + task.text + "\nDescription: " + task.description);
  }
}
/**
 * edit task by id
 * @param {*} id
 */
function editTaskByIndex(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  const newDesc = prompt("Edit description:", tasks[index].description);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
  }
  if (newDesc && newDesc.trim() !== "") {
    tasks[index].description = newDesc.trim();
  }
  saveTasksToStorage();
  render();
}
/**
 * function that is no longer used since render contains it
 * @param {*} taskText
 */
function renderTask(taskText) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  //ul.innerHTML = `<li><p>${taskText}</p> <button onclick=deleteTask(${taskText})></button></li>`;
  //ul.innerHTML = `<li><p>${taskText}</p> <button onclick="deleteTask('${taskText}')"></button></li>`;
  p.textContent = taskText;
  // Crear el botón eliminar usando tu función y pasándole la tarea
  const deleteBtn = addDeleteBtn(taskText);
  li.appendChild(p);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}