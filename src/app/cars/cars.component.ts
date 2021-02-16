import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { CarModel } from '../models/car'
import { PaginationModel } from '../models/paginationModel'
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";
import { EditCreateModalComponent } from "../edit-create-modal/edit-create-modal.component"
import {MatDialog} from '@angular/material/dialog';
import {StateService} from '../state.service';
import * as auth0 from 'auth0-js';
import { environment as env } from "src/environments/environment";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  username: string;
  loading: boolean = true
  authorized: boolean = false

  search: string = null;
  cars : CarModel[]  = []
  pagination : PaginationModel = {
    pageSize: 5,
    collectionSize: 0,
    sort: 'asc',
    order: 'id',
    page: 0
  }

  private auth0: auth0.WebAuth;
  private authOptions: auth0.AuthOptions;

  constructor(private apiService: ApiService, public dialog: MatDialog, private state: StateService) {
    this.authOptions = {
      domain: env.auth.domain,
      clientID: env.auth.clientId
    };

    // Set-up the authentication flow
    this.auth0 = new auth0.WebAuth(this.authOptions);
   }

  authorize() {
    this.auth0.authorize({
      redirectUri: 'http://localhost:4200/',
      responseType: 'token id_token'
    });
  }

  private getUserInfo(){
    this.auth0.checkSession({
      redirectUri: 'http://localhost:4200/',
      responseType: 'token id_token'
    }, (err, authResult) => {
      this.authorized = true
      this.loading = false
      if(authResult){
        localStorage.setItem("idToken", authResult.idToken);
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("userId", authResult.idTokenPayload.sub)
      } else {
        this.loading = false
        this.authorized = false
      }
    })
  }

  parseAccessToken() {
    this.auth0.parseHash((err, authResult) => {
      this.loading = false
      if(authResult){
        localStorage.setItem("idToken", authResult.idToken);
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("userId", authResult.idTokenPayload.sub)
      }
    });
  }

  ngOnInit(): void {
    this.parseAccessToken();
    this.state.carToRemove.subscribe(car => {
      if (!car) {
        this.dialog.closeAll()
        this.pagination = {
          ...this.pagination,
          page: 1,
        }
        this.getCars(this.pagination, this.search);
      }
    })

    this.apiService.refresh.subscribe(refresh => {
      if (refresh) {
        this.getCars(this.pagination, this.search);
        this.apiService.setRefresh(false)
      }
    })
    this.getUserInfo()
  }

  getCars(pagination: PaginationModel, search?: string): void {
    this.apiService.getCars(pagination, search).subscribe((data: any) => {
      this.pagination = {
        ...this.pagination,
        pageSize: data.size,
        collectionSize: data.totalElmenets
      }
      this.cars = data.data
		})
  }

  onPageChange(): void {
    this.getCars(this.pagination, this.search)
  }

  searchChange(value): void {
    console.log(this.search);
    this.search = value;
    this.pagination = {
      ...this.pagination,
      page: 1,
    }
    this.getCars(this.pagination, value)
  }

  onSortChange(value): void {
    this.pagination = {
      ...this.pagination,
      order: value === this.pagination.order && this.pagination.sort === 'desc' ? 'id' : value,
      sort: this.pagination.sort === 'asc' && value === this.pagination.order ? 'desc' : 'asc'
    }
    this.getCars(this.pagination, this.search)
  }

  selectCarToRemove(car): void {
    console.log(car);
    this.state.selectCarToRemove(car)
    this.dialog.open(DeleteModalComponent)

  }

  selectCarToEdit(car): void {
    this.state.setlectCarToEdit(car)
    this.dialog.open(EditCreateModalComponent)
  }

  openCreateModal() {
    this.dialog.open(EditCreateModalComponent)
  }

  logout(){
    this.auth0.logout(this.authOptions);
    this.authorized = false
  }
}
