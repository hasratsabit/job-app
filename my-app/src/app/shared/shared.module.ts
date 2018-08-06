import { AuthGuard } from './guards/auth.guard';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModul } from './material.module';
import { ErrorService } from './services/error.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModul
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModul,
    HttpClientModule
  ],
  providers: [
    ErrorService,
    AuthService, 
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true}
  ]
})
export class SharedModule { }
