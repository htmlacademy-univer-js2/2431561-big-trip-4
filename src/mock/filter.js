import { filter } from '../utils/filter';

const generateFilter = (points) => (
  Object.entries(filter)
    .map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        isExist: filterPoints(points).length > 0,
      }))
);

export {generateFilter};
