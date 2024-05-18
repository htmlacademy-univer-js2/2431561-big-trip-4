import SortView from '../view/sort-view';
import TripEventsView from '../view/trip-events-view';
import EmptyListView from '../view/empty-list-view';
import { remove, render, RenderPosition } from '../framework/render';
import TripPointPresenter from './trip-point-presenter';
import { updateItem } from '../utils/common';
import { SORT_TYPE } from '../const';
import { sortDay, sortPrice, sortTime } from '../utils/sort';


export default class TripPresenter{
  #tripContainer = null;
  #pointList = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];
  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SORT_TYPE.DAY;
  #sortedPoints = [];

  constructor({tripContainer, destinationsModel, offersModel, pointsModel }){
    this.#tripContainer = tripContainer;
    this.#pointList = new TripEventsView();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#points = [...pointsModel.get()];
  }

  init(){
    this.#renderTrip();
    this.#sortedPoints = [...this.#points.sort(sortDay)];
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
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointList(){
    render(this.#pointList, this.#tripContainer);
  }

  #renderPoints(){
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #sortPoints(sortType){
    switch(sortType){
      case SORT_TYPE.TIME:
        this.#points.sort(sortTime);
        break;
      case SORT_TYPE.PRICE:
        this.#points.sort(sortPrice);
        break;
      default:
        this.#points = [...this.#sortedPoints];
    }
    this.#currentSortType = sortType;
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

  #clearSort(){
    remove(this.#sortComponent);
  }

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
    this.#sortedPoints = updateItem(this.#sortedPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#clearSort();
    this.#renderSort();
    this.#renderPoints();
  };
}
