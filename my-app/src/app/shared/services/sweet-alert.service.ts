import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  public sweetAlert = new Subject<Observable<any>>();
  public showAlert: boolean = false;

  constructor() { }

  
  confirmAlert(data) {
    this.sweetAlert.next(data);
    this.showAlert = true;
  }
}
