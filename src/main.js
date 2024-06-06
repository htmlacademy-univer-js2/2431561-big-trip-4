import DestinationView from './view/destination-view';
import PointService from './service/api-service';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import FilterPresenter from './presenter/filter-presenter';
import TripPresenter from './presenter/trip-presenter';
import NewPointButtonPresenter from './presenter/new-point-button-presenter';
import { render, RenderPosition } from './framework/render';

const AUTHORIZATION = 'Basic aASFwfrgtb43sad';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';
const siteDestinationContainer = document.querySelector('.trip-main');
const siteFilterContainer = document.querySelector('.trip-controls__filters');
const siteSortContainer = document.querySelector('.trip-events');

const service = new PointService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel(service, offersModel, destinationsModel);
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
pointsModel.init();
