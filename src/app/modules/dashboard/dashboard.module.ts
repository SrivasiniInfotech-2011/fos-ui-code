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
import { FOSRequestInterceptor } from '../../../core/interceptors/fos-request-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoanDetailsComponent } from './fos/pages/loan-details/loan-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FvrGuarantorComponent } from './fos/pages/fvr-guarantor/fvr-guarantor/fvr-guarantor.component';
import { FvrHirerMasterComponent } from './fos/pages/fvr-hirer/fvr-hirer-master/fvr-hirer-master.component';
import { FvrVehicleComponent } from './fos/pages/fvr-vehicle/fvr-vehicle/fvr-vehicle.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [DashboardComponent, FosComponent, AdminComponent, HomeComponent, LoanDetailsComponent, FvrHirerMasterComponent, FvrGuarantorComponent, FvrVehicleComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FosModule,
    AdminModule,
    SharedModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: FOSRequestInterceptor, multi: true }]
})
export class DashboardModule { }
