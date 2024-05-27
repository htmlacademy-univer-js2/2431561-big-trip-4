import Observable from '../framework/observable';

export default class PointsModel extends Observable{
  #service = null;
  #points = [];

  constructor(service){
    super();
    this.#service = service;
    this.#points = this.#service.points;
  }

  get(){
    return this.#points;
  }

  addPoint(updateType, update){
    this.#points = [update, ...this.#points,];
    this._notify(updateType, update);
  }

  updatePoint(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
