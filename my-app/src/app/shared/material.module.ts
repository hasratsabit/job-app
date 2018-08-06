import { NgModule } from '@angular/core';
import {
  MatButtonModule, 
  MatRadioModule,
  MatCheckboxModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  
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

  ],
  exports: [
    MatButtonModule, 
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    
  ]
})
export class AngularMaterialModul { }