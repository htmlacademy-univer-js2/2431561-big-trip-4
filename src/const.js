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
const MODE = {
  DEFAULT: 'default',
  EDITING: 'egiting',
  ADDING: 'adding',
};
const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};
const EnabledSortType = {
  [SORT_TYPE.DAY]: true,
  [SORT_TYPE.EVENT]: false,
  [SORT_TYPE.TIME]: true,
  [SORT_TYPE.PRICE]: true,
  [SORT_TYPE.OFFERS]: false
};
const UserAction = {
  ADD_POINT: 'ADD_POINT',
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};
const FilterMessage = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
  [FILTER_TYPE.PRESENT]: 'There are no present events now',
  [FILTER_TYPE.PAST]: 'There are no past events now'
};
const ButtonLabel = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
};
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export { DEFAULT_TYPE, POINT_EMPTY, TIME_PERIODS, FILTER_TYPE, MODE,
  SORT_TYPE, EnabledSortType, UserAction, UpdateType, EditType,
  FilterMessage, ButtonLabel, Method, TimeLimit,
};
