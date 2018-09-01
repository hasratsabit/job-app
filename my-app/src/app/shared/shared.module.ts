import { AuthGuard } from './guards/auth.guard';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModul } from './material.module';
import { ErrorService } from './services/error.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProfileResolverService } from './resolvers/profile-resolver.service';
import { DataService } from './services/data.service';
import { AlertComponent } from './alert/alert.component';
import { FormProcesserService } from './services/form-processer.service';
import { CachingService } from './services/caching.service';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { SweetAlertComponent } from './components/sweet-alert/sweet-alert.component';
import { SweetAlertService } from './services/sweet-alert.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModul,
    FormsModule
  ],
  declarations: [
  AlertComponent,
  SweetAlertComponent
],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModul,
    FormsModule,
    HttpClientModule,
    AlertComponent,
    SweetAlertComponent
  ],
  providers: [
    ErrorService,
    AuthService,
    DataService, 
    FormProcesserService,
    AuthGuard,
    ProfileResolverService,
    CachingService,
    SweetAlertService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
  ]
})
export class SharedModule { }
