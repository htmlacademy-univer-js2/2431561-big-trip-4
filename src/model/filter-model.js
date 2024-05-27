import Observable from '../framework/observable';
import { FILTER_TYPE } from '../const';

export default class FilterModel extends Observable{
  #currentType = FILTER_TYPE.EVERYTHING;

  get(){
    return this.#currentType;
  }

  set(updateType, update){
    this.#currentType = update;
    this._notify(updateType, update);
  }
}
