/*
let todos = [];

function addtodo() {
  const todoTitle = document.querySelector("input").value;
  if (todoTitle.trim() === "") return; // Avoid adding empty todos
  
  todos.push({
    title: todoTitle,
  });
  
  render();
}

function deletetodo(index) {
  todos.splice(index, 1);
  render();
}

function createtodoComponent(todo, index) {
  const obj = document.createElement("div");
  const h1 = document.createElement("h1");
  const button = document.createElement("button");

  button.addEventListener("click", function() {
    deletetodo(index);
  });

  button.innerHTML = "Delete";
  h1.innerHTML = todo.title;
  obj.append(h1);
  obj.append(button);
  return obj;
}

function render() {
  document.querySelector("#todos").innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const element = createtodoComponent(todos[i], i);
    document.querySelector("#todos").appendChild(element);
  }
}*/

/*

let todos = [];

function addtodo() {
  const todoTitle = document.querySelector("#todo-input").value;
  if (todoTitle.trim() === "") return; // Avoid adding empty todos

  todos.push({
    title: todoTitle,
  });

  document.querySelector("#todo-input").value = ""; // Clear the input field
  render();
}

function deletetodo(index) {
  todos.splice(index, 1);
  render();
}

function editTodoTitle(index, newTitle) {
  todos[index].title = newTitle;
  render();
}

function createtodoComponent(todo, index) {
  const obj = document.createElement("div");
  obj.classList.add("todo-item");

  const h1 = document.createElement("h1");
  const buttonDelete = document.createElement("button");
  const buttonEdit = document.createElement("button");

  // Set up delete button
  buttonDelete.addEventListener("click", function () {
    deletetodo(index);
  });
  buttonDelete.innerHTML = "Delete";

  // Set up edit button
  buttonEdit.addEventListener("click", function () {
    const newTitle = prompt("Edit your todo:", todo.title);
    if (newTitle && newTitle.trim() !== "") {
      editTodoTitle(index, newTitle.trim());
    }
  });
  buttonEdit.innerHTML = "Edit";

  h1.innerHTML = todo.title;
  obj.append(h1);
  obj.append(buttonEdit);
  obj.append(buttonDelete);
  return obj;
}

function adjustGridHeight(container) {
  const numTasks = todos.length;
  const rowHeight = 150; // Assuming each task takes 150px in height
  const maxGridHeight = numTasks * rowHeight;
  container.style.maxHeight = `${maxGridHeight}px`;
}

function render() {
  const todosContainer = document.querySelector("#todos");
  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const element = createtodoComponent(todos[i], i);
    todosContainer.appendChild(element);
  }

  adjustGridHeight(todosContainer);
}*/
/*
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-text").forEach((taskText) => {
    tasks.push(taskText.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    document.getElementById("taskList").appendChild(taskElement);
  });
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const taskList = document.getElementById("taskList");

  if (todoInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.onclick = function () {
    setTimeout(function () {
      taskDiv.remove();
      saveTasks();
    }, 500);
  };

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = todoInput.value;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-task";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    setTimeout(function () {
      taskDiv.remove();
      saveTasks();
    }, 500);
  };

  const editButton = document.createElement("button");
  editButton.className = "edit-task";
  editButton.textContent = "Edit";
  editButton.onclick = function () {
    const newText = prompt("Edit your task:", taskText.textContent);
    if (newText && newText.trim() !== "") {
      taskText.textContent = newText.trim();
      saveTasks();
    }
  };

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(deleteButton);

  taskList.appendChild(taskDiv);
  saveTasks();

  todoInput.value = "";

  document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
  });
}*/
/*
document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("taskList");

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.onclick = function () {
    setTimeout(function () {
      taskDiv.remove();
    }, 500);
  };

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  //taskText.innerHTML = "$50";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-task";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    setTimeout(function () {
      taskDiv.remove();
    }, 500);
  };

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(deleteButton);

  taskList.appendChild(taskDiv);
});*/

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const taskList = document.getElementById("taskList");
  const tasks = loadTasks();

  if (todoInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: todoInput.value,
    completed: false,
  };

  tasks.push(task);
  saveTasks(tasks);

  renderTasks();
  todoInput.value = "";
}

function deletetodo(index) {
  const tasks = loadTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function editTodoTitle(index, newTitle) {
  const tasks = loadTasks();
  tasks[index].text = newTitle;
  saveTasks(tasks);
  renderTasks();
}

function toggleCompletion(index) {
  const tasks = loadTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the task list

  const tasks = loadTasks();

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => {
      toggleCompletion(index);
    };

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("task-completed");
    }

    const editButton = document.createElement("button");
    editButton.className = "edit-task";
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      const newText = prompt("Edit your task:", task.text);
      if (newText && newText.trim() !== "") {
        editTodoTitle(index, newText.trim());
      }
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      setTimeout(function () {
        deletetodo(index);
      }, 500);
    };

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);

    taskList.appendChild(taskDiv);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderTasks();
});
