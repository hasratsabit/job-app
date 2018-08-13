import { AlertModel } from './../models/alert.model';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})



export class FormProcesserService {

  public processingForm: FormGroup;
  public message: AlertModel = {alertClass: "", alertMessage: ""};
  public alertMessageIsShowing: boolean = true;
  public routedPage: string;

  constructor(
    private router: Router
  ) { }



  formProccessCompleted(response: Response) {
    this.proccessForm(response);
    this.showFormAlertMessage(response);
    setTimeout(() => {
      this.alertMessageIsShowing = false;
      this.navigateAfterProccessed(response);
    }, 3000);
  }

  proccessForm(response: Response) {
    if(response.success) {
      this.processingForm.disable();
    } else {
      this.processingForm.enable();
    }
  }

  showFormAlertMessage(response: Response) {
    if(response.success) {
      this.message.alertClass = "alert--success";
      this.message.alertMessage = response.message;
    } else {
      this.message.alertClass = "alert--error";
      this.message.alertMessage = response.message;
    }
  }

  navigateAfterProccessed(response: Response) {
    if(response.success) {
      this.router.navigate([`${this.routedPage}`]);
    }
  }
}
