import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  selected_rest = '';
  all_reviews = [];
  name = '';
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.selected_rest = params.id;
      this.getSingleRestaurantFromService();
    });
  }
  getSingleRestaurantFromService() {
    const observable = this._httpService.getSingleRestaurant(this.selected_rest);
    observable.subscribe((data: any) => {
      this.all_reviews = data.data.reviews;
      sortByKey(this.all_reviews, 'rating');
      this.name = data.data.name;
    });
  }
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      const x = a[key];
      const y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * -1;
  });
}
