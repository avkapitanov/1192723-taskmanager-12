import AbstractView from "./abstract";

export default class Board extends AbstractView {
  getTemplate() {
    return (
      `<section class="board container">
    </section>`
    );
  }
}
