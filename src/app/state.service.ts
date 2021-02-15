import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarModel } from './models/car'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private carToRemoveSource = new BehaviorSubject<CarModel>(null);
  carToRemove = this.carToRemoveSource.asObservable()

    constructor() { }

    selectCarToRemove(carToRemove: CarModel) {
      this.carToRemoveSource.next(carToRemove);
    }
}
