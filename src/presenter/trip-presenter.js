import SortView from '../view/sort-view';
import RedactorEventView from '../view/redactor-event-view';
import TripPointView from '../view/trip-point-view';
import TripEventsView from '../view/trip-events-view';
import { render } from '../render';

export default class TripPresenter{

  constructor({tripContainer, destinationsModel, offersModel, pointsModel }){
    this.tripContainer = tripContainer;
    this.pointList = new TripEventsView();
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.get()];
  }

  init(){
    render(new SortView(), this.tripContainer);
    render(this.pointList, this.tripContainer);
    render(
      new RedactorEventView({
        point: this.points[0],
        pointDestination: this.destinationsModel.getById(this.points[0].destination),
        pointOffers: this.offersModel.getByType(this.points[0].type),
      }), this.pointList.getElement());

    this.points.forEach((point) => {
      render(
        new TripPointView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type)
        }),
        this.pointList.getElement()
      );
    });
  }
}
