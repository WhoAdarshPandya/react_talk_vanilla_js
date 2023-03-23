const todoTitleInputField = document.getElementById("todo-title");
const addTodoButton = document.getElementById("add-todo-btn");
const todoListContainer = document.getElementsByClassName("todo-list")[0];
const notificationBadgeCount = document.getElementById("notification-badge");

let todos = [];

function addTodo() {
  const todoContent = todoTitleInputField.value;
  if (!todoContent) return alert("Please enter a todo title");
  todos.push({
    title: todoContent,
    completed: false,
    id: Math.random().toString(16).slice(2),
  });
  updateNotificationBadge();
  displayTodos();
  todoTitleInputField.value = "";
}

function checkTodo(id) {
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  displayTodos();
}

function deleteTodo(id) {
  todos = todos.filter(function (todo) {
    if (todo.id !== id) return todo;
  });
  displayTodos();
  updateNotificationBadge();
}

function displayTodos() {
  todoListContainer.innerHTML = "";
  todos.forEach(function (todo) {
    todoListContainer.innerHTML += `
		<div class="todo">
			<input
				type="checkbox"
				name="todo-check"
				class="todo-check"
				${todo.completed ? "checked" : ""}
				onchange="checkTodo('${todo.id}')"
			/>
			<span class="todo-content" style='text-decoration:${
        todo.completed ? "line-through;" : "none;"
      }'
				>${todo.title}</span
			>
			<button class="todo-delete-btn" onclick="deleteTodo('${
        todo.id
      }')">DELETE</button>
		</div>`;
  });
}

function updateNotificationBadge() {
  notificationBadgeCount.textContent = todos.length.toString();
}

todoTitleInputField.addEventListener("keydown", function (e) {
  e.key === "Enter" && addTodo();
});

addTodoButton.addEventListener("click", addTodo);
