const inputTask = document.querySelector("#taskInput");
const inputDesc = document.querySelector("#descriptionInput");
const inputCompleted = document.querySelector("#completedInput");
const addBtn = document.querySelector(".btn-add");
const listTasks = document.querySelector("ul");
const empty = document.querySelector(".empty");
const modal = document.querySelector("#exampleModal");

let tasks;
/**
 * load tasks on page startup
 */
render();

addBtn.addEventListener("click", (e) => {
  const taskText = inputTask.value.trim();
  const description = inputDesc.value.trim();
  if (taskText !== "" && description !== "") {
    const isCompleted = inputCompleted.checked; 
    addTaskToList(taskText, description, isCompleted);
    inputTask.value = "";
    inputDesc.value = "";
    inputCompleted.checked = false;
    empty.style.display = "none";
  } else {
    alert("You must enter a task and a description");
  }
});
/**
 * function to render and display dynamically
 * @returns
 */
function render() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.length === 0) {
    listTasks.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  listTasks.innerHTML = tasks
    .map((task, index) => {
      return `
      <li>
         <input type="checkbox" ${task.completed ? "checked" : ""} 
               onchange="toggleTask(${index})">
        <p>${task.text} - ${task.description}
        ${task.completed ? "(Completada)" : "(Pendiente)"}</p>
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
 * add task to DOM and array
 * @param {*} taskText, description
 */
function addTaskToList(taskText, description, isCompleted) {
  tasks.push({
    text: taskText,
    description: description,
    completed: isCompleted,
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
    document.getElementById("modalTaskText").textContent = task.text;
    document.getElementById("modalTaskDescription").textContent =
      task.description;
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
  }
}
/**
 * edit task by id
 * @param {*} id
 */
function editTaskByIndex(index) {
  const task = tasks[index];
  document.getElementById("taskInput").value = task.text;
  document.getElementById("descriptionInput").value = task.description;
  deleteTaskByIndex(index);
  saveTasksToStorage();
}
