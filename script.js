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
