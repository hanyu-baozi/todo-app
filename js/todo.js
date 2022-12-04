let todos = window.localStorage.getItem("tasks")
  ? JSON.parse(window.localStorage.getItem("tasks"))
  : [];
const app = document.querySelector(".app");
const titleComponent = "<h1>To Do App</h1>";
const inputComponent = `<div class="input-wrapper">
  <input type="text" placeholder="" />
  <button type="button" onclick="methods.addItem()"><i class="icon">+</i></button>
</div>`;

const methods = {
  renderTodos: () => {
    let Temp = `
      <ul class="todos">
        ${todos
          .map(
            (todo) => `
          <li ${todo.status === "done" ? 'class="done"' : ""}>
            <span>${todo.title}</span>
            <div class="buttons">
            ${
              todo.status === "done"
                ? `<button class="btn-delete" onclick="methods.removeItem('${todo.id}')"><i class="icon">×</i></button>`
                : ""
            }
            <button class="btn-done" onclick="methods.toggleItem('${
              todo.id
            }')"></button>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
    `;

    app.innerHTML = `
      ${titleComponent}
      ${inputComponent}
      ${todos.length > 0 ? Temp : ""}
    `;

    let input = document.querySelector('input[type="text"]');
    input.focus();
    input.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) methods.addItem();
    });
  },
  updateLocalStorage: () => {
    window.localStorage.setItem("tasks", JSON.stringify(todos));
  },
  updateTodos: () => {
    methods.updateLocalStorage();
    methods.renderTodos();
  },
  addItem: () => {
    let input = document.querySelector('input[type="text"]');
    if (input.value.length > 0) {
      todos.push({
        id: `todo-${Date.now()}`,
        title: input.value,
        status: "new",
      });
      input.value = "";

      methods.updateTodos();
    }
  },
  removeItem: (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    methods.updateTodos();
  },
  toggleItem: (id) => {
    let checkedTodo = todos.find((todo) => todo.id === id);
    checkedTodo.status = checkedTodo.status === "done" ? "new" : "done";
    methods.updateTodos();
  },
};

methods.renderTodos();
