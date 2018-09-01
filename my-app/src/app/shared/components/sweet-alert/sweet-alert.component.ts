import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-sweet-alert',
  templateUrl: './sweet-alert.component.html',
  styleUrls: ['./sweet-alert.component.scss']
})
export class SweetAlertComponent implements OnInit {

  public showAlert: boolean = false;
  constructor(private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.sweetAlertService.sweetAlert.subscribe(id => {
      this.showAlert = true;
    })
  }

}
