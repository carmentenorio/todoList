




const inputTask = document.querySelector("#taskInput");
const inputDesc = document.querySelector("#descriptionInput");
const inputCompleted = document.querySelector("#completedInput");
const addBtn = document.querySelector(".btn-add");
const listTasks = document.querySelector("ul");
const empty = document.querySelector(".empty");
const modal = document.querySelector("#exampleModal");
const selectCategory = document.querySelector("#category");
const selectTag = document.querySelector("#tags");

let tasks;
let categoryOptions = [
  {
    name: "category1",
    id: 1,
  },
  {
    name: "category2",
    id: 2,
  },
  {
    name: "category3",
    id: 3,
  },
  {
    name: "category4",
    id: 4,
  },
];
//console.log(categoriesOptions);
let tagsOptions = [
  {
    id: 1, name: "tag1"
  },
  {
    id: 2, name: "tag2"
  },
  {
    id: 3, name: "tag3"
  },
  {
    id: 4, name: "tag4"
  },
  {
    id: 5, name: "tag5"
  },
  {
    id: 6, name: "tag6"
  },
];
// Renderizar categorías
function renderCategories() {
  let html = "";
  html +=
    // selectCategory.innerHTML =
    "<option value=0 disabled>Selecciona una categoría</option>";
  categoryOptions.forEach((category, index) => {
    html += `<option value=${category.id} >${category.name}</option>`;
    // const option = document.createElement("option");
    // if(index === 0){
    //   console.log("here", option)
    //   option.selected = true;
    // }
    // option.value = category.id;
    // option.textContent = category.name;
    // selectCategory.appendChild(option);
  });
  console.log("htmlhtml", html);
  selectCategory.innerHTML = html;
}
// Renderizar tags
function renderTags() {
  selectTag.innerHTML = "<option disabled>Selecciona uno o más tags</option>";
  tagsOptions.forEach((tag, index) => {
    //const option = document.createElement("option");
    //option.value = index;
    //option.textContent = tag;
    //selectTag.appendChild(option);
    let html = "<option disabled>Selecciona uno o más tags</option>";
    tagsOptions.forEach((tag) => {
      html += `<option value=${tag.id}>${tag.name}</option>`;
    });
    selectTag.innerHTML = html;
  });
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskText = inputTask.value.trim();
  //console.log(taskText);
  const description = inputDesc.value.trim();
  const completed = inputCompleted.checked;
  const categoryId = selectCategory.value;
  const categoryName =
    selectCategory.options[selectCategory.selectedIndex]?.text;
  console.log("ID:", categoryId);
  console.log("Nombre:", categoryName);
  //obtener tags seleccionados
  const tags = [];
  for (let i = 0; i < selectTag.options.length; i++) {
    if (selectTag.options[i].selected) {
      tags.push({
        id: selectTag.options[i].value,
        name: selectTag.options[i].text,
      });
    }
  }
  //console.log("here is my message", tags);

  //console.log(selectTag);
  if (taskText === "" || description === "") {
    alert("You must enter a task and a description");
  } else {
    addTaskToList(
      taskText,
      description,
      completed,
      categoryId,
      categoryName,
      tags
    );
    //limpiar campos
    inputTask.value = "";
    inputDesc.value = "";
    inputCompleted.checked = false;
    selectCategory.selectedIndex = 1;
    //desmarcar la opcion de tags 
    for (let i = 0; i < selectTag.options.length; i++) {
      selectTag.options[i].selected = false;
      //console.log(selectTag);
    }
    empty.style.display = "none";
  }
});
/**
 * function to render and display dynamically
 * @returns
 */
function render() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log(tasks);

  if (tasks.length === 0) {
    listTasks.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  listTasks.innerHTML = tasks
    .map((task, index) => {
      /*const categorys = task.categoryId
        ? `<small>Category: ${task.categoryId}</small>`
        : "";
      const tags =
        task.tags && task.tags.length
          ? `<small>^Tags: ${task.tags.join(", ")}</small>`
          : "";*/
      return `
      <li>
         <input type="checkbox" ${task.completed ? "checked" : ""} 
               onchange="toggleTask(${index})">
        <p>${task.text} - ${task.description}
        ${task.completed ? "(Completada)" : "(Pendiente)"}</p>
  
        <p><strong>Categoría:</strong> ${task.categoryName}</p>
        <p><strong>Tags:</strong> ${task.tags.map((t) => t.name).join(", ")}</p>

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
function addTaskToList(
  taskText,
  description,
  isCompleted,
  categoryId,
  categoryName,
  tags
) {
  tasks.push({
    text: taskText,
    description: description,
    completed: isCompleted,
    categoryId: categoryId, //string
    categoryName: categoryName,
    tags: tags, //array
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
  document.getElementById("completedInput").checked = task.completed;
  const selectCategory = document.querySelector("#category");
  if (task.categoryId) {
    selectCategory.value = task.categoryId;
  }
  for (let i = 0; i < selectTag.options.length; i++) {
    selectTag.options[i].selected = task.tags.some(
      (t) => t.id == selectTag.options[i].value
    );
  }
  deleteTaskByIndex(index);
  saveTasksToStorage();
}

render();
renderCategories();
renderTags();







