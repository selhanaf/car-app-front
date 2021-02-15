import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationModel }from './models/paginationModel'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/carapp";
  constructor(private httpClient: HttpClient) {  }

  public getCars(pagination?: PaginationModel){
    let params = new HttpParams().set('page', `${pagination.page - 1}`);
    params = params.set('sort', pagination.sort);
    params = params.set('order', pagination.order);
    params = params.set('size', `${pagination.pageSize}`);
    debugger;
		return this.httpClient.get(`${this.BASE_URL}/api/cars`, { params: params});
	}
}
