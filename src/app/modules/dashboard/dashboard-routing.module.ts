import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListingPageComponent } from './fos/pages/listing-page/listing-page.component';


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
        path:'fos',
        loadChildren: () => import('././fos/fos.module').then(m => m.FosModule)
      },

      {
        path:'admin',
        loadChildren: () => import('././admin/admin.module').then(m => m.AdminModule)
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
