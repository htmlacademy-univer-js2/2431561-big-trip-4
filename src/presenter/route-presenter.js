import TripEventsView from '../view/trip-events-view';
import NewEventView from '../view/new-event-view';
import RedactorEventView from '../view/redactor-event-view';
import RoutePointView from '../view/route-point-view';
import { render } from '../render';

export default class RoutePresenter{
  tripEventsComponent = new TripEventsView();

  constructor({routeContainer}){
    this.routeContainer = routeContainer;
  }

  init(){
    render(this.tripEventsComponent, this.routeContainer);
    render(new RedactorEventView(), this.tripEventsComponent.getElement());
    render(new NewEventView(), this.tripEventsComponent.getElement());
    for(let i = 0; i < 3; i++){
      render(new RoutePointView(), this.tripEventsComponent.getElement());
    }
  }
}
