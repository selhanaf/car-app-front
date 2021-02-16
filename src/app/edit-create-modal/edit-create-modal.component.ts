import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-create-modal',
  templateUrl: './edit-create-modal.component.html',
  styleUrls: ['./edit-create-modal.component.css']
})
export class EditCreateModalComponent implements OnInit {

  carForm: FormGroup;
  tomorrow: Date = new Date()

  constructor(private formBuilder: FormBuilder) {
     this.createCarForm();
  }

  ngOnInit(): void {
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

}
