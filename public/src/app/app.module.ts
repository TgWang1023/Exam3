import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { OneComponent } from './one/one.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NewComponent,
    OneComponent,
    EditComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
