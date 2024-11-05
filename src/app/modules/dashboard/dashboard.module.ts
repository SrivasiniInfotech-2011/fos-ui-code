import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { LoanDetailsComponent } from './pages/loan-details/loan-details.component';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, IndividualDetailsComponent, ListingPageComponent, LoanDetailsComponent, ProspectDetailsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
