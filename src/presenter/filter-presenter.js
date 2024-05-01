import FilterView from '../view/filter-view';
import { render } from '../framework/render';
import { generateFilter } from '../mock/filter';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filters = null;

  constructor({container, pointsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.get());
  }

  init(){
    render(new FilterView(this.#filters), this.#container);
  }
}
