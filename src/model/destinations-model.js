export default class DestinationsModel{
  #service = null;
  #destinations = [];

  constructor(service){
    this.#service = service;
  }

  get(){
    return this.#destinations;
  }

  getById(id){
    return this.#destinations.find((destination) => destination.id === id);
  }

  async init(){
    this.#destinations = await this.#service.destionations;
    return this.#destinations;
  }
}
