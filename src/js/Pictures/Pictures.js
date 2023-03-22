import "./css/style.css";
import Form from "./Form";
import Image from "./Image";

export default class Pictures {
  constructor(element) {
    this.element = element;
    this.form = new Form();
    this.conteinerImg = null;
    this.arrImg = [];
  }
  init() {
    this.element.append(this.form.form);
    this.conteinerImg = document.createElement("div");
    this.conteinerImg.className = "images-box";
    this.element.append(this.conteinerImg);
    this.eventSubscription();
  }

  eventSubscription() {
    this.form.addSubmitFormListener(this.onSubmitForm.bind(this));
  }

  onSubmitForm() {
    const nameImg = this.form.form.elements["name-img"].value.trim();
    const srcImg = this.form.form.elements["url-img"].value.trim();
    if (!nameImg) {
      this.form.showMessageError("Не заполнено название картинки");
      this.form.form.reset();
      return;
    }
    if (!srcImg) {
      this.form.showMessageError("Не заполнен url картинки");
      this.form.form.reset();
      return;
    }

    let imgBox = new Image(nameImg, srcImg);
    imgBox.createImg();
    this.form.form.reset();

    imgBox.imgEl.onload = () => {
      this.arrImg.push(imgBox.element);
      imgBox.closeEl.addEventListener("click", this.closeImg.bind(this));
      this.renderConteinerImg();
    };

    imgBox.imgEl.onerror = () => {
      this.form.showMessageError("Не валидный адрес изображения");
      this.form.form.reset();
      imgBox = undefined;
      return;
    };
  }

  clearConteinerImg() {
    let len = this.conteinerImg.children.length;
    while (len) {
      this.conteinerImg.children[len - 1].remove();
      len -= 1;
    }
    // for (let child of this.conteinerImg.children) {
    //   console.log(child);
    //   child.remove();
    // }
  }
  renderConteinerImg() {
    this.clearConteinerImg();
    this.arrImg.forEach((item) => {
      this.conteinerImg.append(item);
    });
    window.scrollTo(0, document.body.scrollHeight);
  }

  closeImg(e) {
    const imgBox = e.target.closest(".image-item");
    const idx = this.arrImg.indexOf(imgBox);
    this.deleteImg(idx);
  }

  deleteImg(idx) {
    this.arrImg[idx]
      .querySelector(".image-item_del")
      .removeEventListener("click", this.closeImg);
    let elem = this.arrImg.splice(idx, 1)[0];
    // eslint-disable-next-line no-unused-vars
    elem = undefined;
    this.renderConteinerImg();
  }
}
