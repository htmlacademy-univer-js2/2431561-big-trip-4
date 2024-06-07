import dayjs from 'dayjs';
import {sortDay} from './sort';

const getDate = (points) => {
  const start = dayjs(points.at(0).dateFrom).format('DD MMM');
  const finish = dayjs(points.at(-1).dateTo).format('DD MMM');
  return `${start} &mdash; ${finish}`;
};

const getOffersPrice = (currentOffers, offers) =>
  currentOffers.reduce((accumulator, id) => accumulator + offers.find((offer) => offer.id === id)?.price ?? 0, 0);

const getTripPath = (points, destinations) => {
  const path = points.sort(sortDay).map((point) => destinations.find((destination) => destination.id === point.destination).name);
  const cities = new Set(path);

  if (cities.size <= 3 && path.at(0) !== path.at(-1) || cities.size === 1) {
    return [...cities].join(' &mdash; ');
  }

  return `${path[0]} &mdash; ... &mdash; ${path[path.length - 1]}`;
};

const getTripDates = (points) => {
  const sortedPoints = points.sort(sortDay);
  return sortedPoints.length ? getDate(sortedPoints) : '';
};

const getTripPrice = (points, offers) => points
  .reduce((price, point) => price + point.basePrice + getOffersPrice(point.offers, offers
    .find((offer) => point.type === offer.type)?.offers), 0);

export {getTripDates, getTripPrice, getTripPath};
