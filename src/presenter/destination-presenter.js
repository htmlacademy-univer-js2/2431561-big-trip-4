import DestinationView from '../view/destination-view';
import { render, remove, replace, RenderPosition } from '../framework/render';
import {getTripDates, getTripPrice, getTripPath} from '../utils/destination';

export default class DestinationPresenter{
  #component = null;
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({container, pointsModel, offersModel, destinationsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init(){
    this.#renderDestinationInfo();
    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  #renderDestinationInfo = () => {
    const prevComponent = this.#component;
    const points = this.#pointsModel.get();
    const offers = this.#offersModel.get();
    const destinations = this.#destinationsModel.get();

    this.#component = new DestinationView({
      path: getTripPath(points, destinations),
      dates: getTripDates(points),
      price: getTripPrice(points, offers),
      isEmpty: !points.length,
    });

    if (!prevComponent) {
      render(this.#component, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#component, prevComponent);
    remove(prevComponent);
  };

  #handleModelChange = () => { this.#renderDestinationInfo(); };
}
