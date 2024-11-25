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
import { LeadProspectDetailComponent } from './pages/leadgeneration/lead-prospect-detail/lead-prospect-detail.component';
import { LeadMasterComponent } from './pages/leadgeneration/lead-master/lead-master.component';
import { IndividualComponent } from './pages/leadgeneration/individual/individual.component';
import { Guarantor1Component } from './pages/leadgeneration/guarantor-1/guarantor-1.component';
import { Guarantor2Component } from './pages/leadgeneration/guarantor-2/guarantor-2.component';
import { FvrHirerMasterComponent } from './pages/fvr-hirer/fvr-hirer-master/fvr-hirer-master.component';
import { FvrGuarantorComponent } from './pages/fvr-guarantor/fvr-guarantor/fvr-guarantor.component';

@NgModule({
  declarations: [
    ListingPageComponent,
    LoanDetailsComponent,
    ProspectDetailsComponent,
    IndividualDetailsComponent,
    ViewloanDetailsComponent,
    LeadProspectDetailComponent,
    LeadMasterComponent,
    IndividualComponent,
    Guarantor1Component,
    Guarantor2Component,
    FvrHirerMasterComponent,
    FvrGuarantorComponent
  ],
  imports: [
    CommonModule,
    FosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class FosModule {}
