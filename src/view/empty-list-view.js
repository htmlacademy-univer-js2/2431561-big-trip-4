import AbstractView from '../framework/view/abstract-view';
import {FilterMessage} from '../const';

function createEmptyListTemplate (message){
  return `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">${message}</p>
</section>`;
}

export default class EmptyListView extends AbstractView{
  #filterTypeMessage = null;

  constructor({filterType}) {
    super();
    this.#filterTypeMessage = FilterMessage[filterType];
  }

  get template(){
    return createEmptyListTemplate(this.#filterTypeMessage);
  }
}
