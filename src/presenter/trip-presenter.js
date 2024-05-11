import SortView from '../view/sort-view';
import TripEventsView from '../view/trip-events-view';
import EmptyListView from '../view/empty-list-view';
import { render } from '../framework/render';
import TripPointPresenter from './trip-point-presenter';
import { updateItem } from '../utils/common';

export default class TripPresenter{
  #tripContainer = null;
  #pointList = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];
  #pointPresenters = new Map();

  constructor({tripContainer, destinationsModel, offersModel, pointsModel }){
    this.#tripContainer = tripContainer;
    this.#pointList = new TripEventsView();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#points = [...pointsModel.get()];
  }

  init(){
    this.#renderTrip();
  }

  #renderTrip(){
    if(this.#points.length === 0){
      render(new EmptyListView(), this.#tripContainer);
      return;
    }
    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
  }

  #renderSort(){
    render(new SortView(), this.#tripContainer);
  }

  #renderPointList(){
    render(this.#pointList, this.#tripContainer);
  }

  #renderPoints(){
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point){
    const pointPresenter = new TripPointPresenter({
      container: this.#pointList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      handleDataChange: this.#handlePointChange,
      handleModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints(){
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
