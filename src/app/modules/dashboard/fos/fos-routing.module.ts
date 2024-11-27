import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FosComponent } from './fos.component';
import { BmApprovalCreateComponent } from './pages/bm-approval/bm-approval-create/bm-approval-create.component';
import { BmApprovalMasterComponent } from './pages/bm-approval/bm-approval-master/bm-approval-master.component';
import { DisbursementDetailCreateComponent } from './pages/disbursement/disbursement-detail-create/disbursement-detail-create.component';
import { DisbursementDetailMasterComponent } from './pages/disbursement/disbursement-detail-master/disbursement-detail-master.component';
import { DocumentCollectionMasterComponent } from './pages/document-collection/document-collection-master/document-collection-master.component';
import { FvrGuarantorComponent } from './pages/fvr-guarantor/fvr-guarantor/fvr-guarantor.component';
import { FvrHirerMasterComponent } from './pages/fvr-hirer/fvr-hirer-master/fvr-hirer-master.component';
import { FvrVehicleComponent } from './pages/fvr-vehicle/fvr-vehicle/fvr-vehicle.component';
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

const routes: Routes = [
  {
    path: '',
    component: FosComponent,
    children: [
      {
        path: 'individual-details',
        component: IndividualDetailsComponent,
      },
      // {
      //   path: 'loan-master',
      //   component: LoanDetailsComponent
      // },
      {
        path: 'viewloan-details',
        component: ViewloanDetailsComponent,
      },
      {
        path: 'prospect-master',
        component: ProspectDetailsComponent
      },
      {
        path: 'lead-master',
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
        path: 'lead-guarantor-2',
        component: Guarantor2Component,
      },
      {
        path: 'FVR-hirer',
        component: FvrHirerMasterComponent,
      },
      {
        path: 'FVR-guarantor',
        component: FvrGuarantorComponent,
      },
      {
        path:'FVR-vehicle',
        component:FvrVehicleComponent,
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
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FosRoutingModule {}
