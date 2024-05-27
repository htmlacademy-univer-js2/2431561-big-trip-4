import DestinationView from './view/destination-view';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import FilterPresenter from './presenter/filter-presenter';
import TripPresenter from './presenter/trip-presenter';
import NewPointButtonPresenter from './presenter/new-point-button-presenter';
import { render, RenderPosition } from './framework/render';

const siteDestinationContainer = document.querySelector('.trip-main');
const siteFilterContainer = document.querySelector('.trip-controls__filters');
const siteSortContainer = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const filterModel = new FilterModel();

const newPointButton = new NewPointButtonPresenter({container:siteDestinationContainer});
const tripPresenter = new TripPresenter({
  tripContainer: siteSortContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButton,
});
const filterPresenter = new FilterPresenter({container: siteFilterContainer, pointsModel, filterModel, newPointButton});


render(new DestinationView(), siteDestinationContainer, RenderPosition.AFTERBEGIN);
newPointButton.init({onClick: tripPresenter.handleNewPointClick});
tripPresenter.init();
filterPresenter.init();
