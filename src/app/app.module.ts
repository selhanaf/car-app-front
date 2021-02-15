import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { TableThComponent } from './table-th/table-th.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    SearchInputComponent,
    TableThComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: CarsComponent},
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    NgbModule,
    NgxBootstrapIconsModule.forRoot(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
