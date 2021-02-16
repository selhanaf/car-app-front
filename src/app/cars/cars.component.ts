import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { CarModel } from '../models/car'
import { PaginationModel } from '../models/paginationModel'
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";
import { EditCreateModalComponent } from "../edit-create-modal/edit-create-modal.component"
import {MatDialog} from '@angular/material/dialog';
import {StateService} from '../state.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  username: string;

  search: string = null;
  cars : CarModel[]  = []
  pagination : PaginationModel = {
    pageSize: 5,
    collectionSize: 0,
    sort: 'asc',
    order: 'id',
    page: 0
  }

  constructor(private apiService: ApiService, public dialog: MatDialog, private state: StateService) { }

  ngOnInit(): void {
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
    console.log(car);
    this.state.setlectCarToEdit(car)
    this.dialog.open(EditCreateModalComponent)
  }

  openCreateModal() {
    this.dialog.open(EditCreateModalComponent)
  }
}
