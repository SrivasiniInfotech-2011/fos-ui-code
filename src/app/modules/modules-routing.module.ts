import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProspectDetailsComponent } from './components/prospect-details/prospect-details.component';
import { LoanDetailsComponent } from './components/loan-details/loan-details.component';

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
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
