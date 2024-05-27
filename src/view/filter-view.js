import AbstractView from '../framework/view/abstract-view';
import { capitalize } from '../utils/common';

const createFilterItemTemplate = ({filters}) => {
  const filterItems = filters.map((filter, currentIndex) => (
    `<div class="trip-filters__filter">
              <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}"
              ${(currentIndex === 0) ? 'checked' : ''} ${(filter.isDisabled) ? 'disabled' : ''}>
              <label class="trip-filters__filter-label" for="filter-${filter.type}">${capitalize(filter.type)}</label>
          </div>`
  )).join('');

  return filterItems;
};

const createFilterTemplate = ({filters}) => (
  `<form class="trip-filters" action="#" method="get">
          ${createFilterItemTemplate({filters})}
          <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
);

export default class FilterView extends AbstractView{
  #filters = null;
  #handleFilterChange = null;

  constructor({items, onFilterChange}){
    super();
    this.#filters = items;
    this.#handleFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate({filters: this.#filters});
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };
}
