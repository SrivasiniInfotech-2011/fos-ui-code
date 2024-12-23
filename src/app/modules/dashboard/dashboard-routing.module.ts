import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListingPageComponent } from './fos/pages/listing-page/listing-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { FvrGuarantorComponent } from './fos/pages/fvr-guarantor/fvr-guarantor/fvr-guarantor.component';
import { FvrHirerMasterComponent } from './fos/pages/fvr-hirer/fvr-hirer-master/fvr-hirer-master.component';
import { FvrVehicleComponent } from './fos/pages/fvr-vehicle/fvr-vehicle/fvr-vehicle.component';
import { FvrHirerNeighbourComponent } from './fos/pages/fvr-hirer-neighbour/fvr-hirer-neighbour.component';
import { FvrNeighbourComponent } from './fos/pages/fvr-neighbour/fvr-neighbour.component';
import { FvrObservationComponent } from './fos/pages/fvr-observation/fvr-observation.component';
import { FvrVehicleDetailsComponent } from './fos/pages/fvr-vehicle-details/fvr-vehicle-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // {
      //   path:'',
      //   component:ListingPageComponent
      // },
      {
        path: 'fos',
        loadChildren: () =>
          import('././fos/fos.module').then((m) => m.FosModule),
        //  canActivate: [AuthGuard],
      },

      {
        path: 'admin',
        loadChildren: () =>
          import('././admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'fvr-hirer',
        component: FvrHirerMasterComponent,
      },
      {
        path: 'FVR-guarantor',
        component: FvrGuarantorComponent,
      },
      {
        path: 'FVR-vehicle',
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
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
