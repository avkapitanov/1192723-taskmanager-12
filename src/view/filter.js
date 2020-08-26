import AbstractView from "./abstract";

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _createFilterItemTemplate(filter, currentFilterType) {
    const {type, name, count} = filter;

    return (
      `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${type === currentFilterType ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
      value="${type}"
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
    );
  }

  getTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter) => this._createFilterItemTemplate(filter, this._currentFilter))
      .join(``);

    return (
      `<section class="main__filter filter container">
        ${filterItemsTemplate}
      </section>`
    );
  }
}
