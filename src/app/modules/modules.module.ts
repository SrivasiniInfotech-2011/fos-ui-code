import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModulesComponent } from './modules.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ModulesComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    MatIconModule,
    SharedModule
  ]
})
export class ModulesModule { }
