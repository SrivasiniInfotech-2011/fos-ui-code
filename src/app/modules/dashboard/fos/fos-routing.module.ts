import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FosComponent } from './fos.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { LoanDetailsComponent } from './pages/loan-details/loan-details.component';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';

const routes: Routes = [
  {
    path: '',
    component: FosComponent,
    children: [

      {
        path:'individual-details',
        component:IndividualDetailsComponent
      },

      {
        path:'loan-details',
        component:LoanDetailsComponent
      },

      {
        path:'prospect-details',
        component:ProspectDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FosRoutingModule { }
