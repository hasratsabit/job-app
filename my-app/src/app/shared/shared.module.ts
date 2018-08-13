import { AuthGuard } from './guards/auth.guard';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModul } from './material.module';
import { ErrorService } from './services/error.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProfileResolverService } from './resolvers/profile-resolver.service';
import { DataService } from './services/data.service';
import { AlertComponent } from './alert/alert.component';
import { FormProcesserService } from './services/form-processer.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModul
  ],
  declarations: [
  AlertComponent],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModul,
    HttpClientModule,
    AlertComponent
  ],
  providers: [
    ErrorService,
    AuthService,
    DataService, 
    FormProcesserService,
    AuthGuard,
    ProfileResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true}
  ]
})
export class SharedModule { }
