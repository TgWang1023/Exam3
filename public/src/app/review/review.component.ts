import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  selected_rest = '';
  new_name = '';
  new_content = '';
  new_rating = '5';
  errors = [];
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
      this.name = data.data.name;
    });
  }
  addReviewFromService() {
    const observable = this._httpService.addReview(this.selected_rest,
      { name: this.new_name, content: this.new_content, rating: Number(this.new_rating)}
    );
    observable.subscribe((data: any) => {
      console.log('Got data.', data);
      if (data.error) {
        this.errors = [];
        for (const error in data.error.errors) {
          if (data.error.errors.hasOwnProperty(error)) {
            this.errors.push(data.error.errors[error].message);
          }
        }
      } else {
        this._router.navigate(['/restaurants', this.selected_rest]);
      }
    });
  }

}
