import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { LoanDetailsComponent } from './pages/loan-details/loan-details.component';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'',
        component:ListingPageComponent
      },

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
      },
      {
        path:'',
        redirectTo:'',
        pathMatch:'full'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
