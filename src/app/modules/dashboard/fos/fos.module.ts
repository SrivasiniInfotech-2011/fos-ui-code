import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FosRoutingModule } from './fos-routing.module';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { LoanDetailsComponent } from './pages/loan-details/loan-details.component';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewloanDetailsComponent } from './pages/viewloan-details/viewloan-details.component';


@NgModule({
  declarations: [ListingPageComponent, LoanDetailsComponent, ProspectDetailsComponent, IndividualDetailsComponent, ViewloanDetailsComponent],
  imports: [
    CommonModule,
    FosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FosModule { }
