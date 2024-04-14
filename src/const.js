const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Rome', 'London', 'Dijon', 'Milan'];
const TYPES_OF_TRIP = ['taxi','bus', 'train', 'ship', 'check-in','restaurant','drive', 'flight', 'sightseeing',];
const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const OFFER_COUNT = 5;
const DESTINATION_COUNT = 5;
const POINT_COUNT = 5;
const OFFERS = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
  'Upgrade to a business class'
];
const DEFAULT_TYPE = 'flight';
const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};
const Price = {
  MIN: 1,
  MAX: 1000
};
const TIME_PERIODS = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24,
  get MSEC_IN_HOUR() {
    return this.MSEC_IN_SEC * this.SEC_IN_MIN * this.MIN_IN_HOUR;
  },
  get MSEC_IN_DAY() {
    return this.MSEC_IN_HOUR * this.HOUR_IN_DAY;
  },
};
const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export {
  OFFER_COUNT,
  DESTINATION_COUNT,
  POINT_COUNT,
  CITIES,
  OFFERS,
  DESCRIPTION,
  Price,
  TYPES_OF_TRIP,
  DEFAULT_TYPE,
  POINT_EMPTY,
  TIME_PERIODS,
  FILTER_TYPE
};
