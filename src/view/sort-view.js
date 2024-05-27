import AbstractView from '../framework/view/abstract-view';

const createSortItemsTemplate = ({items}) => {
  const sortItems = items.reduce((accumulator, item) =>
    `${accumulator}
  <div class="trip-sort__item  trip-sort__item--${item.type}">
    <input id="sort-${item.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.type}" data-sort-type="${item.type}" ${(item.isChecked) ? 'checked' : ''} ${(item.isDisabled) ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${item.type}">${item.type}</label>
  </div>`, '');
  return sortItems;
};

function createSortTemplate({items}) {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createSortItemsTemplate({items})}</form>`);
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  #items = null;

  constructor({items, onSortTypeChange}){
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#items = items;

    this.element.addEventListener('change', this.#sortTypeClickHandler);
  }

  #sortTypeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template(){
    return createSortTemplate({items: this.#items});
  }
}
