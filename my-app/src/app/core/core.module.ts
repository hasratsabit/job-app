import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterService } from './services/register.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  declarations: [
    RegisterComponent, 
    HeaderComponent, 
    HomeComponent, 
    LoginComponent, 
    PageNotFoundComponent, 
    SpinnerComponent
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent
  ],
  providers: [RegisterService]
})
export class CoreModule { }
