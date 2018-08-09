import { AlertModel } from './../models/alert.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<div [ngClass]="alertData.alertClass" class="alert">
                <p class="alert__message">{{ alertData.alertMessage }}</p>
             </div>`,
})
export class AlertComponent implements OnInit {

  @Input('alertData') alertData: AlertModel;
  constructor() { }

  ngOnInit() {
  }

}
