import { TYPES_OF_TRIP, DESTINATION_COUNT, OFFER_COUNT, POINT_COUNT } from '../const';
import { generateDestination } from '../mock/destination';
import { generateOffer } from '../mock/offer';
import { generatePoint } from '../mock/tripPoint';
import { getRandomNumber, getRandomArrayElement } from '../utils/common';

export default class MockService{
  #destinations = [];
  #offers = [];
  #points = [];

  constructor(){
    this.#destinations = this.generateDestinations();
    this.#offers = this.generateOffers();
    this.#points = this.generatePoints();
  }

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }

  get points(){
    return this.#points;
  }

  generateDestinations(){
    return Array.from({length: DESTINATION_COUNT}, generateDestination);
  }

  generateOffers(){
    return TYPES_OF_TRIP.map((type) => ({
      type,
      offers: Array.from({length: getRandomNumber(0, OFFER_COUNT)}, generateOffer)
    }));
  }

  generatePoints(){
    return Array.from({length: POINT_COUNT}, () => {
      const type = getRandomArrayElement(TYPES_OF_TRIP);
      const destination = getRandomArrayElement(this.#destinations);
      const hasOffers = Boolean(getRandomNumber(0, 1));
      const offersByType = this.#offers.find((offerType) => offerType.type === type);
      const offersIds = (hasOffers) ? offersByType.offers.slice(0, getRandomNumber(0, OFFER_COUNT)).map((offer) => offer.id) : [];
      return generatePoint(type, destination.id, offersIds);
    });
  }
}
