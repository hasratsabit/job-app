import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModul } from './material.module';

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
  ],
})
export class SharedModule { }
