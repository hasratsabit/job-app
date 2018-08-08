import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileResolverService } from './shared/resolvers/profile-resolver.service';

const routes: Routes = [
  {
    path: "employer",
    loadChildren: "src/app/employer/employer.module#EmployerModule",
    resolve: { profile: ProfileResolverService},
    canActivate: [AuthGuard]
    
  },
  {
    path: "jobseeker",
    loadChildren: "src/app/job-seeker/job-seeker.module#JobSeekerModule",
    resolve: { profile: ProfileResolverService},
    canActivate: [AuthGuard]
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
