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
  search: string = null;
  cars : CarModel[]  = []
  pagination : PaginationModel = {
    pageSize: 5,
    collectionSize: 0,
    sort: 'asc',
    order: 'brand',
    page: 0
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

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
}
