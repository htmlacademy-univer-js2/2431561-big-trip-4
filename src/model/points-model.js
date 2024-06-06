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

  async addPoint(updateType, update){
    try{
      const response = await this.#service.addPoint(adaptToServer(update));
      const adaptedPoint = adaptToClient(response);
      this.#points.push(adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch{
      throw new Error('Can not add point');
    }
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

  async deletePoint(updateType, update){
    try{
      await this.#service.deletePoint(adaptToServer(update));
      this.#points = this.#points.filter((point) => point.id !== update.id);
      this._notify(updateType);
    }catch{
      throw new Error('Can not delete point');
    }
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
