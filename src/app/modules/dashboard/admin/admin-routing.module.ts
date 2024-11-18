import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetCreateComponent } from './pages/asset-create/asset-create.component';
import { AssetMasterComponent } from './pages/asset-master/asset-master.component';
import { CompanyMasterComponent } from './pages/company-master/company-master.component';
import { EntityCreateComponent } from './pages/entity-create/entity-create.component';
import { EntityMasterComponent } from './pages/entity-master/entity-master.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

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
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
