import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EmployerRegisterComponent } from './register/employer-register/employer-register.component';
import { JobSeekerRegisterComponent } from './register/job-seeker-register/job-seeker-register.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,

    SharedModule
  ],
  declarations: [
    RegisterComponent, 
    HeaderComponent, HomeComponent, EmployerRegisterComponent, JobSeekerRegisterComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
