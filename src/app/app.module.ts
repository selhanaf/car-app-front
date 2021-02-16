import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { TableThComponent } from './table-th/table-th.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatDialogModule} from '@angular/material/dialog';
import { EditCreateModalComponent } from './edit-create-modal/edit-create-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { TokenIneterceptorService } from "./token-ineterceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    SearchInputComponent,
    TableThComponent,
    DeleteModalComponent,
    EditCreateModalComponent
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
    NgxBootstrapIconsModule.forRoot(allIcons),
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIneterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
