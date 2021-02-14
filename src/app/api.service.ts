import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/carapp";
  constructor(private httpClient: HttpClient) {  }

  public getCars(){
		return this.httpClient.get(`${this.BASE_URL}/api/cars`);
	}
}
