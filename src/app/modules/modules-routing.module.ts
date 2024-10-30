import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { ProspectDetailsComponent } from './pages/prospect-details/prospect-details.component';
import { LoanDetailsComponent } from './pages/loan-details/loan-details.component';
import { IndividualDetailsComponent } from './pages/individual-details/individual-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'prospect-details',
        component: ProspectDetailsComponent,
      },
      {
        path: 'loan-details',
        component: LoanDetailsComponent,
      },
      {
        path: 'individual-details',
        component: IndividualDetailsComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
