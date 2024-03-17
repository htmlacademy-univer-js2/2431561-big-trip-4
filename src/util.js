import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;
let date = dayjs().subtract(getRandomNumber(0, 5), 'day').toDate();

function getRandomNumber(min, max) {
  const leftBorder = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const rightBorder = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const randomNumber = Math.random() * (rightBorder - leftBorder + 1) + leftBorder;
  return Math.floor(randomNumber);
}

function getRandomArrayElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}

function capitalize(string){
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

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
    case(difference >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(difference).format('DD[D] HH[H] mm[M]');
      break;
    case(difference >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(difference).format('HH[H] mm[M]');
      break;
    case(difference < MSEC_IN_HOUR):
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

function generateDescription(items){
  const sentencesCount = getRandomNumber(1, 5);
  let description = '';
  for(let i = 0; i < sentencesCount; i ++){
    description = `${description} ${getRandomArrayElement(items) }`;
  }

  return description;
}

export {getRandomNumber, getRandomArrayElement, capitalize, humanizeDateTime,
  humanizeShortDate, humanizeTime, getPointDuration, getScheduleDate, getDate, generateDescription};
