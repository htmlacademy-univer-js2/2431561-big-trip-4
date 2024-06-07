import FilterView from '../view/filter-view';
import { render, replace, remove } from '../framework/render';
import { UpdateType } from '../const';
import { filter } from '../utils/filter';

export default class FilterPresenter {
  #container = null;
  #component = null;
  #pointsModel = null;
  #filterModel = null;
  #currentFilter = null;

  constructor({container, pointsModel, filterModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters(){
    const points = this.#pointsModel.get();

    return Object.entries(filter).map(([filterType, filterPoints]) => ({
      type: filterType,
      isChecked: filterType === this.#currentFilter,
      isDisabled: !filterPoints(points).length,
    }));
  }

  init(){
    this.#currentFilter = this.#filterModel.get();
    const previousComponent = this.#component;
    this.#component = new FilterView({
      items: this.filters,
      onFilterChange: this.#handleTypeChange,
    });

    if(!previousComponent){
      render(this.#component, this.#container);
      return;
    }

    replace(this.#component, previousComponent);
    remove(previousComponent);
  }

  #handleTypeChange = (type) =>{
    this.#filterModel.set(UpdateType.MAJOR, type);
  };

  #handleModelEvent = () => {
    this.init();
  };

  destroy(){
    remove(this.#component);
  }
}
