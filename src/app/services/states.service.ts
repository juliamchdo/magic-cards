import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesServices {
  private params = new BehaviorSubject<string>('');

  getParams() {
    return this.params.asObservable();
  }

  setParams(valor: string) {
    this.params.next(valor);
  }
}
