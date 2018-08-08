import { NgModule } from '@angular/core';
import {
  MatButtonModule, 
  MatRadioModule,
  MatCheckboxModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatProgressSpinnerModule
  
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule

  ],
  exports: [
    MatButtonModule, 
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule

    
  ]
})
export class AngularMaterialModul { }