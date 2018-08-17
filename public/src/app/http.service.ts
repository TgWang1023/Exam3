import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getRestaurants() {
    return this._http.get('/rest');
  }
  getSingleRestaurant(id) {
    return this._http.get(`/rest/${id}`);
  }
  addRestaurant(new_restautant) {
    return this._http.post('/rest', new_restautant);
  }
  editRestaurant(id, updated_restaurant) {
    return this._http.put(`/rest/${id}`, updated_restaurant);
  }
  deleteRestaurant(id) {
    return this._http.delete(`/rest/${id}`);
  }
  addReview(id, new_review) {
    return this._http.post(`/reviews/${id}`, new_review);
  }
}
