import AbstractView from "./abstract";

export default class TaskList extends AbstractView {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
