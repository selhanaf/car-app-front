import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationModel }from './models/paginationModel'
import { environment } from "../environments/environment";
import { CarModel } from './models/car'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {  }

  public getCars(pagination: PaginationModel, search?:string){
    let params = new HttpParams().set('page', `${pagination.page - 1}`);
    params = params.set('sort', pagination.sort);
    params = params.set('order', pagination.order);
    params = params.set('size', `${pagination.pageSize}`);
    if (search) {
      params = params.set('search', search)
    }
		return this.httpClient.get(`${this.BASE_URL}/api/cars`, { params: params});
	}

  public deleteCar(id: string){
    return this.httpClient.delete(`${this.BASE_URL}/api/cars/${id}`);
  }

  public createCar(car: CarModel){
    this.httpClient.post(`${this.BASE_URL}/api/cars`, car).subscribe(res => console.log(res))
  }

  public updateCar(car: CarModel){
    this.httpClient.put(`${this.BASE_URL}/api/cars`, car).subscribe(res => console.log(res))
  }
}
