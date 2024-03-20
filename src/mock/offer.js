import { OFFERS } from '../const';
import { getRandomArrayElement, getRandomNumber } from '../util';

function generateOffer(){
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomNumber(1, 1000)
  };
}

export {generateOffer};
