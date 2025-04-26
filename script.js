document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    retriveTask(task);
  });

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    retriveTask(newTask);
    saveTasks();
    todoInput.value = "";
    console.log(tasks);
  });

  //local storage take the key value pair

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function retriveTask(task) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<span>${task.text}</span>
    <button>Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      task.completed = !task.completed; // reverse operator
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("delete icon clicked");
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);

    console.log(tasks.text);
  }
});
