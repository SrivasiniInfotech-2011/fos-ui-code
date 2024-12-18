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
import { FvrHirerNeighbourComponent } from './fos/pages/fvr-hirer-neighbour/fvr-hirer-neighbour.component';
import { FvrNeighbourComponent } from './fos/pages/fvr-neighbour/fvr-neighbour.component';
import { FvrObservationComponent } from './fos/pages/fvr-observation/fvr-observation.component';


@NgModule({
  declarations: [DashboardComponent, FosComponent, AdminComponent, HomeComponent, LoanDetailsComponent, FvrHirerNeighbourComponent, FvrNeighbourComponent, FvrObservationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FosModule,
    AdminModule,
    SharedModule,
    MatTabsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: FOSRequestInterceptor, multi: true }]
})
export class DashboardModule { }
