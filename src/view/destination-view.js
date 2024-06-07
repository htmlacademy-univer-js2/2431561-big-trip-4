import AbstractView from '../framework/view/abstract-view';

function creatDestinationTemplate({path, dates,price,isEmpty}){
  return (`<section class="trip-main__trip-info  trip-info">
    ${isEmpty ? '' : `<div class="trip-info__main">
      <h1 class="trip-info__title">${path}</h1>
      <p class="trip-info__dates">${dates}</p>
    </div>
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`}
</section>`);
}

export default class DestinationView extends AbstractView{
  #path = null;
  #dates = null;
  #price = null;
  #isEmpty = true;
  constructor({path, dates, price, isEmpty}){
    super();
    this.#path = path;
    this.#dates = dates;
    this.#price = price;
    this.#isEmpty = isEmpty;
  }

  get template(){
    return creatDestinationTemplate({path: this.#path, dates: this.#dates, price: this.#price, isEmpty: this.#isEmpty});
  }
}
