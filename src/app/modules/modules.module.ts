import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';
import { LoanDetailsComponent } from './pages/loan-details/loan-details.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ModulesComponent,
    ProspectDetailsComponent,
    LoanDetailsComponent,
    IndividualDetailsComponent,
    ListingPageComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    MatIconModule,
    SharedModule
  ]
})
export class ModulesModule { }
