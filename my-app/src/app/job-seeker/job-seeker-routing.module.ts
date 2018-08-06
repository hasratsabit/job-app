import { AuthGuard } from './../shared/guards/auth.guard';
import { JobSeekerHomeComponent } from './job-seeker-home/job-seeker-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: JobSeekerHomeComponent,
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
