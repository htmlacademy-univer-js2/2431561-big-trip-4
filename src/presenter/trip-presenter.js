import SortView from '../view/sort-view';
import RedactorEventView from '../view/redactor-event-view';
import TripPointView from '../view/trip-point-view';
import TripEventsView from '../view/trip-events-view';
import { render, replace } from '../framework/render';

export default class TripPresenter{
  #tripContainer = null;
  #pointList = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({tripContainer, destinationsModel, offersModel, pointsModel }){
    this.#tripContainer = tripContainer;
    this.#pointList = new TripEventsView();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#points = [...pointsModel.get()];
  }

  init(){
    render(new SortView(), this.#tripContainer);
    render(this.#pointList, this.#tripContainer);
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });

  }

  #renderPoint(point){
    const pointComponent = new TripPointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onRedactorClick: pointRedactorClickHandler,
    }
    );
    const redactorComponent = new RedactorEventView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onFormSubmit: pointSubmitHandler,
      onResetClick: resetButtonClickHandler,
    });

    const onEscape = (evt) =>{
      if(evt.key === 'Escape'){
        evt.preventDefault();
        replace(pointComponent, redactorComponent);
        document.removeEventListener('keydown', onEscape);
      }
    };

    function pointRedactorClickHandler(){
      replace(redactorComponent, pointComponent);
      document.addEventListener('keydown', onEscape);
    }

    function pointSubmitHandler(){
      replace(pointComponent, redactorComponent);
      document.removeEventListener('keydown', onEscape);
    }

    function resetButtonClickHandler(){
      replace(pointComponent, redactorComponent);
      document.removeEventListener('keydown', onEscape);
    }

    render(pointComponent, this.#pointList.element);
  }
}
