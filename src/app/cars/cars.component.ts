import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { CarModel } from '../models/car'
import { PaginationModel } from '../models/paginationModel'

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars : CarModel[]  = []
  pagination : PaginationModel = {
    pageSize: 5,
    collectionSize: 0,
    sort: 'asc',
    order: 'order',
    page: 0
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCars(this.pagination)
  }

  getCars(pagination?: PaginationModel) {
    this.apiService.getCars(pagination).subscribe((data: any)=>{
      console.log(data);
      this.cars = data.data
		})
  }

}
