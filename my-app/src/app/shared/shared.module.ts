import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModul } from './material.module';
import { ErrorService } from './service/error.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModul,
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModul,
    HttpClientModule
  ],
  providers: [ErrorService]
})
export class SharedModule { }
