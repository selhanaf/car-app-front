import { Component, OnInit } from '@angular/core';
import {StateService} from '../state.service';
import { ApiService } from '../api.service'
import { CarModel } from '../models/car'


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  carToRemove: CarModel = null

  constructor(private state: StateService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.state.carToRemove.subscribe(car => this.carToRemove = car)
  }

  onDelete() {
    console.log(this.carToRemove);
    this.apiService.deleteCar(this.carToRemove.id).subscribe((res)=>{
    })
    this.state.selectCarToRemove(null)
  }

}
