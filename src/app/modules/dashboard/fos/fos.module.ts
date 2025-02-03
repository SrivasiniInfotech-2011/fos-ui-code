import { LoanDetailsComponent } from './pages/leadgeneration/loan-details/loan-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FosRoutingModule } from './fos-routing.module';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ViewloanDetailsComponent } from './pages/viewloan-details/viewloan-details.component';
import { LeadProspectDetailComponent } from './pages/leadgeneration/lead-prospect-detail/lead-prospect-detail.component';
import { LeadMasterComponent } from './pages/leadgeneration/lead-master/lead-master.component';
import { IndividualComponent } from './pages/leadgeneration/individual/individual.component';
import { Guarantor1Component } from './pages/leadgeneration/guarantor-1/guarantor-1.component';
import { Guarantor2Component } from './pages/leadgeneration/guarantor-2/guarantor-2.component';

import { MatTableModule } from '@angular/material/table';
import { BmApprovalMasterComponent } from './pages/bm-approval/bm-approval-master/bm-approval-master.component';
import { BmApprovalCreateComponent } from './pages/bm-approval/bm-approval-create/bm-approval-create.component';
import { DocumentCollectionMasterComponent } from './pages/document-collection/document-collection-master/document-collection-master.component';
import { DisbursementDetailMasterComponent } from './pages/disbursement/disbursement-detail-master/disbursement-detail-master.component';
import { DisbursementDetailCreateComponent } from './pages/disbursement/disbursement-detail-create/disbursement-detail-create.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NonIndividualComponent } from './pages/leadgeneration/non-individual/non-individual.component';
import { FvrHirerMasterComponent } from './pages/fvr-hirer/fvr-hirer-master/fvr-hirer-master.component';
import { FvrGuarantorComponent } from './pages/fvr-guarantor/fvr-guarantor/fvr-guarantor.component';
import { FvrVehicleComponent } from './pages/fvr-vehicle/fvr-vehicle/fvr-vehicle.component';
import { FvrHirerNeighbourComponent } from './pages/fvr-hirer-neighbour/fvr-hirer-neighbour.component';
import { FvrNeighbourComponent } from './pages/fvr-neighbour/fvr-neighbour.component';
import { FvrObservationComponent } from './pages/fvr-observation/fvr-observation.component';
import { FvrVehicleDetailsComponent } from './pages/fvr-vehicle-details/fvr-vehicle-details.component';
import { ApprovalComponent } from './pages/approval/approval.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReadOnlyLeadMasterComponent } from './read-only-pages/read-only-lead-master/read-only-lead-master.component';
import { ReadOnlyProspectMasterComponent } from './read-only-pages/read-only-prospect-master/read-only-prospect-master.component';
import { ReadOnlyProspectDetailsComponent } from './read-only-pages/read-only-prospect-details/read-only-prospect-details.component';
import { ReadOnlyLoanDetailsComponent } from './read-only-pages/read-only-loan-details/read-only-loan-details.component';
import { ReadOnlyIndividualComponent } from './read-only-pages/read-only-individual/read-only-individual.component';
import { ReadOnlyNonIndividualComponent } from './read-only-pages/read-only-non-individual/read-only-non-individual.component';

@NgModule({
  declarations: [
    ListingPageComponent,
    LoanDetailsComponent,
    ProspectDetailsComponent,
    IndividualDetailsComponent,
    ViewloanDetailsComponent,
    LoanDetailsComponent,
    LeadProspectDetailComponent,
    LeadMasterComponent,
    IndividualComponent,
    Guarantor1Component,
    Guarantor2Component,
    BmApprovalMasterComponent,
    BmApprovalCreateComponent,
    DocumentCollectionMasterComponent,
    DisbursementDetailMasterComponent,
    DisbursementDetailCreateComponent,
    NonIndividualComponent,
    FvrHirerMasterComponent,
    FvrGuarantorComponent,
    FvrVehicleComponent,
    FvrHirerNeighbourComponent,
    FvrNeighbourComponent,
    FvrObservationComponent,
    FvrVehicleDetailsComponent,
    ApprovalComponent,
    ReadOnlyLeadMasterComponent,
    ReadOnlyProspectMasterComponent,
    ReadOnlyProspectDetailsComponent,
    ReadOnlyLoanDetailsComponent,
    ReadOnlyIndividualComponent,
    ReadOnlyNonIndividualComponent,

  ],
  imports: [
    CommonModule,
    FosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    FormsModule,
    SlickCarouselModule,
  ],
})
export class FosModule {}
