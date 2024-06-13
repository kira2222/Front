import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {  } from 'echarts';
import { ReportesComponent } from './reportes.component';
@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    
  ],
  exports: [
    ReportesComponent
  ]
})
export class ReportesModule { }
