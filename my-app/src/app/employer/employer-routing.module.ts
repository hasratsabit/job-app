import { SingleJobResolverService } from './../shared/resolvers/single-job-resolver.service';
import { JobListResolverService } from './resolvers/job-list-resolver.service';
import { AuthGuard } from './../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditJobComponent } from "./employer-home/edit-job/edit-job.component";
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { JobListComponent } from './employer-home/job-list/job-list.component';
import { AddJobComponent } from './employer-home/add-job/add-job.component';
import { EmployerOverviewComponent } from './employer-home/employer-overview/employer-overview.component';
import { ApplicantsComponent } from './employer-home/applicants/applicants.component';
import { DeleteJobComponent } from './employer-home/delete-job/delete-job.component';
import { JobDetailComponent } from './employer-home/job-detail/job-detail.component';

const routes: Routes = [
  {
    path: "",
    component: EmployerHomeComponent,
    canLoad: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "employer-overview"},
      { path: "employer-overview", component: EmployerOverviewComponent},
      { path: "applicants", component: ApplicantsComponent},
      { path: "add-job", component: AddJobComponent },
      { path: "job-list", component: JobListComponent, resolve: { jobs: JobListResolverService} },
      { path: "edit-job/:id", component: EditJobComponent, resolve: {job: SingleJobResolverService} },
      { path: "delete-job/:id", component: DeleteJobComponent },
      { path: "job-detail/:id", component: JobDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
