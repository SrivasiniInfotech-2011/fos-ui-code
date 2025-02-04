import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetCreateComponent } from './pages/asset/asset-create/asset-create.component';
import { AssetMasterComponent } from './pages/asset/asset-master/asset-master.component';
import { CompanyMasterComponent } from './pages/company/company-master/company-master.component';
import { DocumentCreateComponent } from './pages/document/document-create/document-create.component';
import { DocumentMasterComponent } from './pages/document/document-master/document-master.component';
import { EntityCreateComponent } from './pages/entity/entity-create/entity-create.component';
import { EntityMasterComponent } from './pages/entity/entity-master/entity-master.component';
import { GobalParameterSetupComponent } from './pages/globalparameter/gobal-parameter-setup/gobal-parameter-setup.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { UserManagementComponent } from './pages/user/user-management/user-management.component';
import { LocationMasterComponent } from './pages/locationmaster/location-master/location-master.component';
import { LocationMasterCreateComponent } from './pages/locationmaster/location-master-create/location-master-create.component';

const routes: Routes = [
  {
    path:'user-management',
    component:UserManagementComponent
  },
  {
    path:'',
    redirectTo:'user-management',
    pathMatch:'full'
  },

    {
      
      path:'user-create',
      component:UserCreateComponent
    },
    {
      path:'company-master',
      component:CompanyMasterComponent
    },
    {
      path:'asset-master',
      component:AssetMasterComponent
    },
    {
      path:'asset-create',
      component:AssetCreateComponent
    },
    {
      path:'entity-master',
      component:EntityMasterComponent
    },
    {
      path:'entity-create',
      component:EntityCreateComponent
    },
    {
      path:'global-parameter',
      component:GobalParameterSetupComponent
    },
    {
      path:'document-create',
      component:DocumentCreateComponent
    },
    {
      path:'document-master',
      component:DocumentMasterComponent
    },
    {
      path:'location-master-create',
      component:LocationMasterCreateComponent
    },
    {
      path:'location-master',
      component:LocationMasterComponent
    }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
