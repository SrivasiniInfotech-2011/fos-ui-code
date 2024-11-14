import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
