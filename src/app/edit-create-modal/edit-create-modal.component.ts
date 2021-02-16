import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {StateService} from '../state.service';
import { ApiService } from '../api.service'
import { CarModel } from '../models/car'


@Component({
  selector: 'app-edit-create-modal',
  templateUrl: './edit-create-modal.component.html',
  styleUrls: ['./edit-create-modal.component.css']
})
export class EditCreateModalComponent implements OnInit {

  title: String = "Create New Car"

  carForm: FormGroup;
  tomorrow: Date = new Date()

  carToEdit: CarModel = null

  constructor(private formBuilder: FormBuilder, private state: StateService, private apiService: ApiService, public dialog: MatDialog,) {
     this.createCarForm();
  }

  ngOnInit(): void {
    this.state.carToEdit.subscribe(car => {
      this.carToEdit = car
      this.carForm.patchValue({
         brand: this.carToEdit.brand,
         country: this.carToEdit.country,
         registration: new Date(this.carToEdit.registration.toString().replace('[UTC]', ''))
       });
    })
  }

  createCarForm(){
    this.carForm = this.formBuilder.group({
       brand: ['', Validators.required ],
       country: ['', Validators.required ],
       registration: ['', Validators.required]
    });
  }

  onChange(v){
    console.log(v);
    console.log(console.log(this.carForm.controls['country']));
  }

  onSubmit(){
    if (this.carToEdit) {
      this.apiService.updateCar({...this.carToEdit, ...this.carForm.value})
    } else {
      this.apiService.createCar(this.carForm.value)
    }
    this.dialog.closeAll()
  }

}
