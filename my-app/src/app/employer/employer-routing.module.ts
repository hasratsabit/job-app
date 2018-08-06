import { AuthGuard } from './../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerHomeComponent } from './employer-home/employer-home.component';

const routes: Routes = [
  {
    path: "",
    component: EmployerHomeComponent,
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
