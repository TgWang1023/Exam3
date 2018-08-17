import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  selected_rest = '';
  edited_restaurant = { name: '', cuisine: '' };
  errors = [];
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.selected_rest = params.id;
      this.getSingleRestaurantFromService();
    });
  }
  getSingleRestaurantFromService() {
    const observable = this._httpService.getSingleRestaurant(this.selected_rest);
    observable.subscribe((data: any) => {
      this.edited_restaurant.name = data.data.name;
      this.edited_restaurant.cuisine = data.data.cuisine;
    });
  }
  editRestaurantFromService() {
    const observable = this._httpService.editRestaurant(this.selected_rest, this.edited_restaurant);
    observable.subscribe((data: any) => {
      if (data.error) {
        this.errors = [];
        if (data.error.name === 'MongoError' && data.error.code === 11000) {
          this.errors.push('This restaurant name already exists!');
          console.log(this.errors);
        }
        for (const error in data.error.errors) {
          if (data.error.errors.hasOwnProperty(error)) {
            this.errors.push(data.error.errors[error].message);
            console.log(this.errors);
          }
        }
      } else {
        this._router.navigate(['']);
        location.reload();
      }
    });
  }
}
