import { JobService } from './services/job.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { AddJobComponent } from './employer-home/add-job/add-job.component';
import { JobListComponent } from './employer-home/job-list/job-list.component';
import { EditJobComponent } from './employer-home/edit-job/edit-job.component';
import { EmployerOverviewComponent } from './employer-home/employer-overview/employer-overview.component';
import { ApplicantsComponent } from './employer-home/applicants/applicants.component';
import { DeleteJobComponent } from './employer-home/delete-job/delete-job.component';
import { JobDetailComponent } from './employer-home/job-detail/job-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule
  ],
  declarations: [EmployerHomeComponent, AddJobComponent, JobListComponent, EditJobComponent, EmployerOverviewComponent, ApplicantsComponent, DeleteJobComponent, JobDetailComponent],
  providers: [JobService]
})
export class EmployerModule { }
