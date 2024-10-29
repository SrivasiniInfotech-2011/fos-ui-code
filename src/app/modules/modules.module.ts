import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModulesComponent } from './modules.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ProspectDetailsComponent } from './components/prospect-details/prospect-details.component';
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ModulesComponent,
    ProspectDetailsComponent,
    LoanDetailsComponent,
  
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    MatIconModule,
    SharedModule
  ]
})
export class ModulesModule { }
