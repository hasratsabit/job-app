import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { AddJobComponent } from './employer-home/add-job/add-job.component';

@NgModule({
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule
  ],
  declarations: [EmployerHomeComponent, AddJobComponent]
})
export class EmployerModule { }
