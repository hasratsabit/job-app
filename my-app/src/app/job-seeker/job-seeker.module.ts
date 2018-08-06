import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { JobSeekerHomeComponent } from './job-seeker-home/job-seeker-home.component';

@NgModule({
  imports: [
    CommonModule,
    JobSeekerRoutingModule,
    SharedModule
  ],
  declarations: [JobSeekerHomeComponent]
})
export class JobSeekerModule { }
