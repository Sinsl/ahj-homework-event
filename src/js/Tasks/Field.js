import "./css/style.css";
import Task from "./Task";

export default class Field {
  constructor(field) {
    this.field = field;
    this.tasksField = null;
    this.arrTasks = [];
    this.pinnedEl = null;
    this.allTasksEl = null;
    this.inputEl = null;
    this.errMsgEl = null;
  }

  init() {
    const tasksField = document.createElement("div");
    tasksField.classList.add("tasks-field");
    tasksField.insertAdjacentHTML(
      "beforeend",
      `<h3>TOP Tasks</h3>
      <div class="tasks-field_input">
        <input type="text" id="task-name" name="task">
      </div>
      <div class="tasks-error-conteiner">
        <div class="error-msg"></div>
      </div>
      <h3>Pinned:</h3>
      <div class="tasks-field_pinned"></div>
      <h3>All Tasks:</h3>
      <div class="tasks-field_all_tasks"></div>`
    );
    this.field.append(tasksField);
    this.pinnedEl = tasksField.querySelector(".tasks-field_pinned");
    this.allTasksEl = tasksField.querySelector(".tasks-field_all_tasks");
    this.inputEl = tasksField.querySelector("#task-name");
    this.errMsgEl = tasksField.querySelector(".error-msg");
    this.renderingTasks();
    this.inputEl.addEventListener("keyup", this.keyUpInput.bind(this));
  }

  keyUpInput(e) {
    const text = this.inputEl.value.trim();
    if (e.key === "Enter") {
      if (text.length === 0) {
        this.showError("Ошибка! Введите название задачи");
        this.inputEl.value = "";
        return;
      }
      if (text.length < 4) {
        this.showError("Название задачи слишком короткое");
        this.inputEl.value = "";
        return;
      }
      this.addTask(text);
      this.inputEl.value = "";
      return;
    } else {
      this.sortTask(text);
    }
  }

  showError(text) {
    this.errMsgEl.textContent = text;
    setTimeout(() => {
      this.errMsgEl.textContent = "";
    }, 2000);
  }

  addTask(name) {
    const taskEl = new Task(name);
    taskEl.checkbox.addEventListener("change", this.changeChexkbox.bind(this));
    this.arrTasks.push(taskEl);
    this.renderingTasks();
  }

  sortTask(name) {
    this.allTasksEl.textContent = "";
    const arrAll = this.arrTasks.filter(
      (item) => item.checkbox.checked === false
    );
    const filter = arrAll.filter((item) => item.findSubString(name));
    if (filter.length > 0) {
      filter.forEach((item) => this.allTasksEl.append(item.task));
    } else {
      this.allTasksEl.textContent = "No tasks found";
    }
  }

  renderingTasks() {
    this.allTasksEl.textContent = "";
    this.pinnedEl.textContent = "";
    const arrAll = this.arrTasks.filter(
      (item) => item.checkbox.checked === false
    );
    if (arrAll.length > 0) {
      arrAll.forEach((item) => this.allTasksEl.append(item.task));
    } else {
      this.allTasksEl.textContent = "No tasks found";
    }

    const arrPin = this.arrTasks.filter(
      (item) => item.checkbox.checked === true
    );
    if (arrPin.length > 0) {
      arrPin.forEach((item) => this.pinnedEl.append(item.task));
    } else {
      this.pinnedEl.textContent = "No tasks found";
    }
  }

  changeChexkbox() {
    this.renderingTasks();
  }
}
