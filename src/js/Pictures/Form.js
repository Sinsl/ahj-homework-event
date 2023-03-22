export default class Form {
  constructor() {
    this.form = null;
    this.submitListener = null;
    this.init();
  }

  init() {
    const form = document.createElement("form");
    form.classList.add("form-add-pictures");
    form.insertAdjacentHTML(
      "beforeend",
      `<label>
        <div class="label-text">Название</div>
        <input type="text" name="name" id="name-img" placeholder="Напишите название" required autofocus>
      </label>
      <label>
        <div class="label-text">Ссылка на изображение</div>
        <input type="url" name="url" id="url-img" placeholder="Вставьте ссылку" required autofocus>
      </label>
      <div class="err-container">
        <div class="err-msg"></div>
      </div>
      <button type="submit">Добавить</button>`
    );
    this.form = form;
    this.form.addEventListener("submit", (e) => this.onSubmitForm(e));
  }

  addSubmitFormListener(callback) {
    this.submitListener = callback;
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.submitListener.call(null);
  }

  showMessageError(text) {
    const msg = this.form.querySelector(".err-msg");
    msg.textContent = text;
    setTimeout(() => {
      msg.textContent = "";
    }, 2000);
  }
}
