import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { POINT_EMPTY, TYPES_OF_TRIP, CITIES, EditType, ButtonLabel } from '../const';
import { capitalize, getLastWord } from '../utils/common';
import { humanizeDateTime } from '../utils/point';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const createPointTypesTemplate = ({currentType, isDisabled}) => TYPES_OF_TRIP.reduce((accumulator, type)=>
  `${accumulator}<div class="event__type-item">
     <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''} ${(isDisabled) ? 'disabled' : ''}>
     <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
   </div>`, ''
);

const createCitiesTemplate = ({isDisabled}) => (
  `<datalist id="destination-list-1" ${isDisabled ? 'disabled' : ''}>
        ${CITIES.reduce((accumulator, city) => `${accumulator}<option value="${city}"></option>`, '')}
    </datalist>`
);

const createOffersTemplate = ({currentOffers, selectedOffers}) => {
  const offerItems = currentOffers.reduce((accumulator, offer) => (
    `${accumulator}<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${getLastWord(offer.title)}" data-offer-id="${offer.id}" ${selectedOffers.some((id) => id === offer.id) ? 'checked' : ''}>
              <label class="event__offer-label" for="${offer.id}">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
              </label>
          </div>`
  ), '');
  return offerItems;
};

const createPhotosTemplate = ({currentDestination}) => (
  `<div class="event__photos-tape">
  ${(currentDestination.illustrations.length) ? currentDestination.illustrations.reduce((accumulator, picture) => (`${accumulator}<img class="event__photo" src="${picture.src}" alt="${picture.description}">`), '') : ''}
  </div>`
);

// const createOffersSectionTemplate = ({ currentOffers, selectedOffers }) => `
//   <section class="event__section  event__section--offers">
//     <h3 class="event__section-title  event__section-title--offers">Offers</h3>
//     <div class="event__available-offers">
//       ${createOffersTemplate({ currentOffers, selectedOffers })}
//     </div>
//   </section>
// `;

// const createDestinationSectionTemplate = ({ currentDestination }) => {
//   if (!currentDestination.illustrations.length && !currentDestination.description.length) {
//     return '';
//   }
//   return `
//     <section class="event__section  event__section--destination">
//       <h3 class="event__section-title  event__section-title--destination">Destination</h3>
//       ${currentDestination.description.length
//     ? `<p class="event__destination-description">
//         ${currentDestination.description}
//       </p>` : ''}
//       ${currentDestination.illustrations.length
//     ? `<div class="event__photos-container">
//         ${createPhotosTemplate({ currentDestination })}
//       </div>` : ''}
//     </section>`;
// };

const createPointEditButtonsTemplate = ({pointType, isDisabled, isSaving, isDeleting}) => {
  const isEditing = pointType === EditType.EDITING;
  const saveLabel = isSaving ? ButtonLabel.SAVING : ButtonLabel.SAVE;
  let resetLabel;
  if(isEditing){
    resetLabel = isDeleting ? ButtonLabel.DELETING : ButtonLabel.DELETE;
  }else{
    resetLabel = ButtonLabel.CANCEL;
  }
  return `
    <button class="event__save-btn  btn  btn--blue" type="submit" ${(isDisabled) ? 'disabled' : ''}>${saveLabel}</button>
    <button class="event__reset-btn" type="reset" ${(isDisabled) ? 'disabled' : ''}>${resetLabel}</button>
    ${isEditing ? `
      <button class="event__rollup-btn" type="button" ${(isDisabled) ? 'disabled' : ''}>
        <span class="visually-hidden">Open event</span>
      </button>`
    : ''}
  `;
};

const createRedactorEventTemplate = ({state, pointDestination, pointOffers, pointType}) => {
  const {point, isDisabled, isSaving, isDeleting} = state;
  const { basePrice, dateFrom, dateTo, offers: selectedOffers, type } = point;
  const currentOffers = pointOffers.find((offer) => offer.type === type).offers;
  const currentDestination = pointDestination.find((destination) => destination.id === point.destination);
  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createPointTypesTemplate({type, isDisabled})}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalize(type)}
        </label>
        <input
          class="event__input  event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          value="${currentDestination ? he.encode(currentDestination.name) : ''}"
          list="destination-list-1"
          ${isDisabled ? 'disabled' : ''}>
        ${createCitiesTemplate({isDisabled})}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.dateFrom ? humanizeDateTime(dateFrom) : ''}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${point.dateTo ? humanizeDateTime(dateTo) : ''}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(String(basePrice))}" ${isDisabled ? 'disabled' : ''}>
      </div>

      ${createPointEditButtonsTemplate({pointType, isDisabled, isSaving, isDeleting})}
    </header>
    <section class="event__details">
      ${(currentOffers.length !== 0) ?
      `section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        ${createOffersTemplate({currentOffers, selectedOffers})}
      </section>` : ''}
      ${(currentDestination) ?
      `<section class="event__section  event__section--destination">
         <h3 class="event__section-title  event__section-title--destination">Destination</h3>
         <p class="event__destination-description">${currentDestination.description}</p>
         <div class="event__photos-container">
             ${createPhotosTemplate({currentDestination})}
         </div>
      </section>` : ''}
    </section>
  </form>
  </li>`);
};

export default class RedactorEventView extends AbstractStatefulView{
  #pointDestination = null;
  #pointOffers = null;
  #handleRedactorSubmit = null;
  #handleRedactorDelete = null;
  #handleRedactorClose = null;
  #datepickeFrom = null;
  #datepickerTo = null;
  #pointType = null;

  constructor({point = POINT_EMPTY, pointDestination, pointOffers, onFormClose, onFormSubmit, onFormDelete}){
    super();
    this._setState(RedactorEventView.parsePointToState({point}));
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleRedactorClose = onFormClose;
    this.#handleRedactorSubmit = onFormSubmit;
    this.#handleRedactorDelete = onFormDelete;
    this._restoreHandlers();

  }

  get template(){
    return createRedactorEventTemplate({point: this._state.point, pointDestination: this.#pointDestination, pointOffers: this.#pointOffers, pointType: this.#pointType });
  }

  reset = (point) => {
    this.updateElement({point});
  };

  _restoreHandlers = () => {
    if(this.#pointType === EditType.EDITING){
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#redactorCloseHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#redactorDeleteHandler);
    }
    if(this.#pointType === EditType.CREATING){
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#redactorCloseHandler);
    }
    this.element.querySelector('form').addEventListener('submit', this.#redactorSubmitHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);

    this.#setDatePickers();
  };

  #redactorSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleRedactorSubmit(RedactorEventView.parseStateToPoint(this._state));
  };

  #redactorCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleRedactorClose();
  };

  #redactorDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleRedactorDelete(RedactorEventView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: [],
      },
    });
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: selectedOffers.map((element) => element.dataset.offerId),
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#pointDestination.find((destination) => destination.name === evt.target.value).id;
    if(!selectedDestination){
      return;
    }
    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestination.id,
      }
    });
  };

  #datepickerFromChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      }
    });
    this.#datepickeFrom.set('maxDate', this._state.point.dateTo);
  };

  #datepickerToChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate,
      }
    });
    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #setDatePickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    this.#datepickeFrom = flatpickr(
      dateFromElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true,
        defaultDate: this._state.point.dateFrom,
        maxDate: this._state.point.dateTo,
        onChange: this.#datepickerFromChangeHandler,
      },
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true,
        defaultDate: this._state.point.dateTo,
        minDate: this._state.point.dateFrom,
        onChange: this.#datepickerToChangeHandler,
      },
    );
  };

  static parsePointToState = ({point, isDisabled = false, isSaving = false, isDeleting = false}) =>
    ({
      point,
      isDisabled,
      isSaving,
      isDeleting,
    });

  static parseStateToPoint(state){
    return state.point;
  }

  removeElement = () => {
    super.removeElement();
    if(this.#datepickeFrom){
      this.#datepickeFrom.destroy();
      this.#datepickeFrom = null;
    }

    if(this.#datepickerTo){
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  get isDisabled() {
    return this._state.isDisabled;
  }

  get isSaving() {
    return this._state.isDisabled;
  }

  get isDeleting() {
    return this._state.isDeleting;
  }
}
