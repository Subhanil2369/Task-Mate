// TaskMate - LocalStorage Task Manager

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const categorySelect = document.getElementById("category");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "All";

// ========== Theme Toggle ==========
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

// ========== Render Tasks ==========
function renderTasks() {
  taskList.innerHTML = "";
  let filtered = tasks.filter(
    (t) => currentFilter === "All" || t.category === currentFilter
  );

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <span>${task.text} <small>(${task.category})</small></span>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">✅</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ========== Add Task ==========
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const category = categorySelect.value;

  if (text === "") return alert("Please enter a task!");

  tasks.push({ text, category, completed: false });
  taskInput.value = "";
  renderTasks();
});

// ========== Toggle Complete ==========
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// ========== Delete Task ==========
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// ========== Filter Tasks ==========
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Initial Render
renderTasks();
