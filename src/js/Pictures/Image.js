export default class Image {
  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.element = null;
    this.imgEl = null;
    this.closeEl = null;
  }

  createImg() {
    const divImg = document.createElement("div");
    divImg.className = "image-item";
    const img = document.createElement("img");
    img.className = "image-item_img";
    img.src = this.url;
    const close = document.createElement("div");
    close.className = "image-item_del";
    close.innerHTML = "&#10008;";
    divImg.append(img);
    divImg.append(close);
    this.element = divImg;
    this.imgEl = img;
    this.closeEl = close;
    this.element.addEventListener("mouseover", this.onMouseOver.bind(this));
    this.element.addEventListener("mouseout", this.onMouseOut.bind(this));
  }

  onMouseOver() {
    this.closeEl.classList.add("active");
  }

  onMouseOut() {
    this.closeEl.classList.remove("active");
  }
}
