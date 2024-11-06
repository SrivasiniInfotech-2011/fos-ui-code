import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FosComponent } from './fos/fos.component';
import { FosModule } from './fos/fos.module';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [DashboardComponent, FosComponent, AdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FosModule,
    AdminModule,
    SharedModule
  ]
})
export class DashboardModule { }
