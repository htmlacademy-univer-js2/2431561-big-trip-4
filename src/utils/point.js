import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TIME_PERIODS } from '../const';
import {getRandomNumber} from './common';

dayjs.extend(duration);
dayjs.extend(relativeTime);

let date = dayjs().subtract(getRandomNumber(0, 5), 'day').toDate();

function humanizeDateTime(dateInfo) {
  return dateInfo ? dayjs(dateInfo).format('YYYY-MM-DDTHH:mm') : '';
}

function humanizeShortDate(dateInfo) {
  return dateInfo ? dayjs(dateInfo).format('MMM DD') : '';
}

function humanizeTime(dateInfo) {
  return dateInfo ? dayjs(dateInfo).format('HH:mm') : '';
}

function getPointDuration(dateFrom, dateTo){
  const difference = dayjs(dateTo).diff(dayjs(dateFrom));
  let pointDuration = 0;
  switch(true){
    case(difference >= TIME_PERIODS.MSEC_IN_DAY):
      pointDuration = dayjs.duration(difference).format('DD[D] HH[H] mm[M]');
      break;
    case(difference >= TIME_PERIODS.MSEC_IN_HOUR):
      pointDuration = dayjs.duration(difference).format('HH[H] mm[M]');
      break;
    case(difference < TIME_PERIODS.MSEC_IN_HOUR):
      pointDuration = dayjs.duration(difference).format('mm[M]');
      break;
  }
  return pointDuration;
}

function getScheduleDate(dateInfo){
  return dayjs(dateInfo).format('DD/MM/YY HH:mm');
}

function getDate({next}){
  const minGap = getRandomNumber(0, 59);
  const hourGap = getRandomNumber(1, 5);
  const dayGap = getRandomNumber(0, 5);

  if(next){
    date = dayjs(date).add(minGap, 'minute').add(hourGap, 'hour').add(dayGap, 'day').toDate();
  }

  return date;
}

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPresent(point) {
  return (dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo));
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

function getDuration(dateTo, dateFrom){
  const minuteDifference = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  return dayjs.duration(minuteDifference);
}

function adaptToClient(point){
  const adaptedPoint = {...point,
    'basePrice': point['base_price'],
    'dateFrom': point['date_from'],
    'dateTo': point['date_to'],
    'isFavorite': point['is_favorite'],
  };

  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
}

function adaptToServer(point){
  const adaptedPoint = {...point,
    ['base_price']: point.basePrice,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['is_favorite']: point.isFavorite,
  };

  delete adaptedPoint.basePrice;
  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
}

export {humanizeDateTime, humanizeShortDate, humanizeTime, getPointDuration, getScheduleDate, getDate,
  isPointFuture, isPointPresent, isPointPast, getDuration, adaptToClient, adaptToServer};
