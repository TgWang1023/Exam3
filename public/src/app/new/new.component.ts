import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  new_restaurant = { name: '', cuisine: '' };
  errors = [];
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }
  addRestaurantFromService() {
    const observable = this._httpService.addRestaurant(this.new_restaurant);
    observable.subscribe((data: any) => {
      if (data.error) {
        console.log('Errors:', data);
        this.errors = [];
        if (data.error.name === 'MongoError' && data.error.code === 11000) {
          this.errors.push('This restaurant name already exists!');
        }
        for (const error in data.error.errors) {
          if (data.error.errors.hasOwnProperty(error)) {
            this.errors.push(data.error.errors[error].message);
          }
        }
      } else {
        this._router.navigate(['/restaurants']);
      }
    });
  }

}
