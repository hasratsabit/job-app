import { NgModule } from '@angular/core';
import {
  MatButtonModule, 
  MatRadioModule,
  MatCheckboxModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule
  
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
    MatTableModule

  ],
  exports: [
    MatButtonModule, 
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule

    
  ]
})
export class AngularMaterialModul { }