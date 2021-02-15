import { Component, OnInit, Input } from '@angular/core';
import { PaginationModel } from '../models/paginationModel'

@Component({
  selector: 'app-table-th',
  templateUrl: './table-th.component.html',
  styleUrls: ['./table-th.component.css']
})
export class TableThComponent implements OnInit {

  @Input() pagination: PaginationModel;
  @Input() order: string;

  constructor() { }

  ngOnInit(): void {
  }

}
