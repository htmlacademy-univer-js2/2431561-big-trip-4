import Observable from '../framework/observable';
import { UpdateType } from '../const';
import { adaptToClient, adaptToServer } from '../utils/point';
import { updateItem } from '../utils/common';

export default class PointsModel extends Observable{
  #service = null;
  #points = [];
  #offersModel = null;
  #destinationsModel = null;

  constructor(service, offersModel, destinationsModel){
    super();
    this.#service = service;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get(){
    return this.#points;
  }

  addPoint(updateType, update){
    this.#points = [update, ...this.#points,];
    this._notify(updateType, update);
  }

  async updatePoint(updateType, update){
    try{
      const updatedPoint = await this.#service.updatePoint(adaptToServer(update));
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch{
      throw new Error('Can not update point');
    }
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

  async init(){
    try{
      await Promise.all([
        this.#offersModel.init(),
        this.#destinationsModel.init(),
      ]);
      const points = await this.#service.points;
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {});
    } catch{
      this.#points = [];
      this._notify(UpdateType.INIT, {isEror: true});
    }
  }
}
