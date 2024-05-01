import DestinationView from './view/destination-view';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import { render, RenderPosition } from './framework/render';

const siteDestinationContainer = document.querySelector('.trip-main');
const siteFilterContainer = document.querySelector('.trip-controls__filters');
const siteSortContainer = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const tripPresenter = new TripPresenter({
  tripContainer: siteSortContainer,
  destinationsModel,
  offersModel,
  pointsModel
});
const filterPresenter = new FilterPresenter({container: siteFilterContainer, pointsModel});

render(new DestinationView(), siteDestinationContainer, RenderPosition.AFTERBEGIN);

tripPresenter.init();
filterPresenter.init();
