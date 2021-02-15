import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service'
import { CarModel } from '../models/car'
import { PaginationModel } from '../models/paginationModel'

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  @Input() search: string;
 @Output() searchChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value): void {
    this.searchChange.emit(this.search)
  }

}
