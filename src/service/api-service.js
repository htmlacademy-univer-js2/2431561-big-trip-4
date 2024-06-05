import ApiService from '../framework/api-service';
import { Method } from '../const';

export default class PointService extends ApiService{
  get points(){
    return this._load({url: 'points'}).then(ApiService.parseResponse);
  }

  get offers(){
    return this._load({url: 'offers'}).then(ApiService.parseResponse);
  }

  get destinations(){
    return this._load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  addPoint(data){
    return {...data, id: crypto.randomUUID()};
  }

  async updatePoint(newPoint){
    const response = await this._load({
      url: `points/${newPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(newPoint),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    // const parsedResponse = ;
    return await ApiService.parseResponse(response);
  }

  deletePoint(){

  }
}
