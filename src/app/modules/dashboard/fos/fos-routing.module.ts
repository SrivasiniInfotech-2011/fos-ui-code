import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FosComponent } from './fos.component';
import { BmApprovalCreateComponent } from './pages/bm-approval/bm-approval-create/bm-approval-create.component';
import { BmApprovalMasterComponent } from './pages/bm-approval/bm-approval-master/bm-approval-master.component';
import { DisbursementDetailCreateComponent } from './pages/disbursement/disbursement-detail-create/disbursement-detail-create.component';
import { DisbursementDetailMasterComponent } from './pages/disbursement/disbursement-detail-master/disbursement-detail-master.component';
import { DocumentCollectionMasterComponent } from './pages/document-collection/document-collection-master/document-collection-master.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { Guarantor1Component } from './pages/leadgeneration/guarantor-1/guarantor-1.component';
import { Guarantor2Component } from './pages/leadgeneration/guarantor-2/guarantor-2.component';
import { IndividualComponent } from './pages/leadgeneration/individual/individual.component';
import { LeadMasterComponent } from './pages/leadgeneration/lead-master/lead-master.component';
import { LeadProspectDetailComponent } from './pages/leadgeneration/lead-prospect-detail/lead-prospect-detail.component';
import { LoanDetailsComponent } from './pages/leadgeneration/loan-details/loan-details.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';
import { ViewloanDetailsComponent } from './pages/viewloan-details/viewloan-details.component';
import { NonIndividualComponent } from './pages/leadgeneration/non-individual/non-individual.component';
import { FvrHirerMasterComponent } from './pages/fvr-hirer/fvr-hirer-master/fvr-hirer-master.component';
import { FvrGuarantorComponent } from './pages/fvr-guarantor/fvr-guarantor/fvr-guarantor.component';
import { FvrVehicleComponent } from './pages/fvr-vehicle/fvr-vehicle/fvr-vehicle.component';
import { FvrHirerNeighbourComponent } from './pages/fvr-hirer-neighbour/fvr-hirer-neighbour.component';
import { FvrNeighbourComponent } from './pages/fvr-neighbour/fvr-neighbour.component';
import { FvrObservationComponent } from './pages/fvr-observation/fvr-observation.component';
import { FvrVehicleDetailsComponent } from './pages/fvr-vehicle-details/fvr-vehicle-details.component';
import { ApprovalComponent } from './pages/approval/approval.component';

const routes: Routes = [
  {
    path: '',
    component: FosComponent,
    children: [
      {
        path: 'individual-details',
        component: IndividualDetailsComponent,
      },
      {
        path: 'prospect-master',
        component: ProspectDetailsComponent
      },
      {
        path: 'lead-generation',
        component: LeadMasterComponent,
      },
      {
        path: 'lead-prospect-detail',
        component: LeadProspectDetailComponent,
      },
      {
        path: 'lead-guarantor-1',
        component: Guarantor1Component,
      },
      {
        path: 'lead-loan-details',
        component: LoanDetailsComponent,
      },
      {
        path: 'lead-individual',
        component: IndividualComponent,
      },
      {
        path: 'lead-non-individual',
        component: NonIndividualComponent,
      },
      {
        path: 'lead-guarantor-2',
        component: Guarantor2Component,
      },
      {
        path:'BM-approval',
        component:BmApprovalMasterComponent,
      },
      {
        path:'BM-approvalcreate',
        component:BmApprovalCreateComponent,
      },
      {
        path:'Disbursement-details',
        component:DisbursementDetailMasterComponent,
      },
      {
        path:'disbursement-create',
        component:DisbursementDetailCreateComponent,
      },
      {
        path:'document-collection',
        component:DocumentCollectionMasterComponent,
      },
      {
        path: 'fvr-hirer',
        component: FvrHirerMasterComponent,
      },
      {
        path: 'fvr-guarantor',
        component: FvrGuarantorComponent,
      },
      {
        path: 'fvr-vehicle',
        component: FvrVehicleComponent,
      },
      {
        path:'FVR-hirer-neighbour',
        component:FvrHirerNeighbourComponent
      },
      {
        path:'FVR-neighbour',
        component:FvrNeighbourComponent
      },
      {
        path:'FVR-observation',
        component:FvrObservationComponent
      },
      {
        path:'FVR-vehicle-detail',
        component:FvrVehicleDetailsComponent
      },
      {
        path:'approval',
        component:ApprovalComponent
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FosRoutingModule {}
