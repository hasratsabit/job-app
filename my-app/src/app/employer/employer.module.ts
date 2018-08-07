import { JobService } from './services/job.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { AddJobComponent } from './employer-home/add-job/add-job.component';
import { JobListComponent } from './employer-home/job-list/job-list.component';

@NgModule({
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule
  ],
  declarations: [EmployerHomeComponent, AddJobComponent, JobListComponent],
  providers: [JobService]
})
export class EmployerModule { }
