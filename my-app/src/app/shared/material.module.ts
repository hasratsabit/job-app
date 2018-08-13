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
  MatProgressSpinnerModule,
  
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

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
    MatProgressSpinnerModule,
    MatIconModule

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
    MatProgressSpinnerModule,
    MatIconModule

    
  ]
})
export class AngularMaterialModul { }