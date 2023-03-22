export default class Task {
  constructor(name) {
    this.task = document.createElement("div");
    this.task.classList.add("task");
    this.task.insertAdjacentHTML(
      "beforeend",
      `<p>${name}</p>
      <input type="checkbox" class="checkbox">`
    );
    this.name = name;
    this.checkbox = this.task.querySelector("input");
  }

  findSubString(text) {
    return this.name.toLowerCase().includes(text.toLowerCase());
  }
}
