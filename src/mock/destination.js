import { generateDescription, getRandomArrayElement, getRandomNumber } from '../utils/common';
import { CITIES, DESCRIPTION } from '../const';

function generateDestination(){
  const city = getRandomArrayElement(CITIES);
  return {
    id: crypto.randomUUID(),
    name: city,
    description: generateDescription(DESCRIPTION),
    illustrations: Array.from({ length: getRandomNumber(1, 5) }, () => ({
      'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      'description': `${city} description`
    }))
  };
}

export {generateDestination};
