// Selecting elements
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Add task event
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a valid task.");
        return;
    }
    addTask(taskText);
    taskInput.value = "";
});

// Add task function
function addTask(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="check-task">
        <span class="task-text">${taskText}</span>
        <input type="text" class="edit-input" style="display:none;" value="${taskText}">
        <button class="delete-task">Delete</button>
    `;
    todoList.appendChild(li);
    saveTaskToLocalStorage(taskText);

    li.querySelector(".check-task").addEventListener("click", toggleTaskCompletion);
    li.querySelector(".edit-input").addEventListener("blur", saveEdit);
    li.querySelector(".edit-input").addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            saveEdit(e);
        }
    });
    li.querySelector(".task-text").addEventListener("click", () => {
        editTask(li);
    });
    li.querySelector(".delete-task").addEventListener("click", deleteTask); // Attach delete event listener here
}

// Edit task function
function editTask(taskItem) {
    const taskTextElement = taskItem.querySelector(".task-text");
    const editInput = taskItem.querySelector(".edit-input");
    taskTextElement.style.display = "none"; // Hide task text
    editInput.style.display = "inline"; // Show input for editing
    editInput.focus(); // Focus on the input field
}

// Save edited task
function saveEdit(e) {
    const taskItem = e.target.parentElement;
    const taskTextElement = taskItem.querySelector(".task-text");
    const editInput = taskItem.querySelector(".edit-input");
    const newTaskText = editInput.value.trim();

    if (newTaskText !== "") {
        taskTextElement.textContent = newTaskText;
        taskTextElement.style.display = "inline"; // Show task text again
        editInput.style.display = "none"; // Hide the input field
        updateLocalStorage(); // Update local storage
    } else {
        alert("Please enter a valid task.");
        taskTextElement.style.display = "inline"; // Show task text again
        editInput.style.display = "none"; // Hide the input field
    }
}

// Toggle task completion
function toggleTaskCompletion(e) {
    const taskItem = e.target.parentElement;
    taskItem.classList.toggle("completed");
}

// Delete task function
function deleteTask(e) {
    const taskItem = e.target.parentElement;
    taskItem.remove();
    updateLocalStorage();
}

// Save tasks to local storage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task));
}

// Update local storage
function updateLocalStorage() {
    const taskItems = document.querySelectorAll("li .task-text");
    const tasks = [];
    taskItems.forEach(taskItem => tasks.push(taskItem.textContent));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
