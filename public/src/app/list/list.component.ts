import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() all_restaurants = [];
  current_time = new Date();
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getRestaurantsFromService();
    setInterval(() => {
      this.current_time = new Date();
    }, 1000);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.getRestaurantsFromService();
  }

  getRestaurantsFromService() {
    const observable = this._httpService.getRestaurants();
    observable.subscribe((data: any) => {
      console.log('Got all restaurants.', data);
      this.all_restaurants = data.data;
      for (const restaurant of this.all_restaurants) {
        restaurant.createdAt = new Date(restaurant.createdAt);
      }
    });
  }
  deleteRestaurantFromService(id) {
    const observable = this._httpService.deleteRestaurant(id);
    observable.subscribe((data: any) => {
      this.getRestaurantsFromService();
    });
  }
}
