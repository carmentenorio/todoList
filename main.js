const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add"); //añadir una tarea
const ul = document.querySelector("ul"); //lista donde se va a gregar todos los elementos
const empty = document.querySelector(".empty"); //mensaje de lista vacia

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log(1);

  const taskText = input.value;

  if (taskText !== "") {
    addTask(taskText);

    input.value = "";
    empty.style.display = "none"; //ocultar mensaje de lista vacia
  }
});

function addTask(taskText) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = taskText;

  li.appendChild(p);
  li.appendChild(addDeleteBtn());
  li.appendChild(editBtn());
  li.appendChild(viewBtn());
  ul.appendChild(li);
}

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn-delete");
  //crear icono
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash"); //clase del icon
  icon.style.cursor = "pointer";
  icon.style.color = "red";
  //Insertar ícono dentro del botón
  deleteBtn.appendChild(icon);
  /*
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //para encontrar el li mas cercano al icono
    const li = e.target.closest("li"); // Busca el <li> más cercano
    ul.removeChild(li);
    const items = document.querySelectorAll("li");
    if (items.length === 0) {
      empty.style.display = "block"; //mostrar mensaje de lista vacia
    }
  });
  deleteBtn.appendChild(icon);*/
  return deleteBtn;
}

function editBtn() {
  const editBtn = document.createElement("button");
  editBtn.classList.add("btn-edit");
  //crear icono editar
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-pen-to-square"); //clase del icon

  //Insertar ícono dentro del botón
  editBtn.appendChild(icon);
/*
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newEditBtn = prompt("Edita la tarea:", p.textContent);
    if (newEditBtn !== null && newEditBtn.trim() !== "") {
      p.textContent = newEditBtn.trim();
    }
  });

  editBtn.appendChild(icon);*/
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
/*
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newEditBtn = prompt("Edita la tarea:", p.textContent);
    if (newEditBtn !== null && newEditBtn.trim() !== "") {
      p.textContent = newEditBtn.trim();
    }
  });

  editBtn.appendChild(icon);*/
  return viewBtn;
}
