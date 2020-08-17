import AbstractView from "./abstract.js";

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _createFilterItemTemplate(filter, isChecked) {
    const {name, count} = filter;

    return (
      `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
    );
  }

  getTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter, index) => this._createFilterItemTemplate(filter, index === 0))
      .join(``);

    return (
      `<section class="main__filter filter container">
        ${filterItemsTemplate}
      </section>`
    );
  }
}
