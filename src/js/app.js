// TODO: write code here
import Controller from "./Game/Controller";
import Field from "./Tasks/Field";
import Pictures from "./Pictures/Pictures";

const cntr = new Controller();
cntr.init();

const divTasks = document.querySelector(".tasks");
const tasks = new Field(divTasks);
tasks.init();

const divPic = document.querySelector(".pictures");
const pictures = new Pictures(divPic);
pictures.init();
