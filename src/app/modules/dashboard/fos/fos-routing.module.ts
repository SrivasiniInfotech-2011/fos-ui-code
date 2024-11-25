import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FosComponent } from './fos.component';
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
      // {
      //   path: 'prospect-master',
      //   component: ProspectDetailsComponent
      // },
      {
        path: 'lead-master',
        component: LeadMasterComponent,
      },
      {
        path: 'lead-prospect-detail',
        component: LeadProspectDetailComponent,
      },
      {
        path: 'lead-gaurantor-1',
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
        path: 'lead-gaurantor-2',
        component: Guarantor2Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FosRoutingModule {}
