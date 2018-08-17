import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { OneComponent } from './one/one.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: 'restaurants', component: ListComponent, children: [
    { path: ':id/edit', component: EditComponent },
  ] },
  { path: 'restaurants/new', component: NewComponent },
  { path: 'restaurants/:id', component: OneComponent },
  { path: 'restaurants/:id/review', component: ReviewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/restaurants' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
