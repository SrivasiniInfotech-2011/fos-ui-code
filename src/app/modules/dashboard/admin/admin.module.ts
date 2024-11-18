import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyMasterComponent } from './pages/company-master/company-master.component';
import { AssetMasterComponent } from './pages/asset-master/asset-master.component';
import { AssetCreateComponent } from './pages/asset-create/asset-create.component';
import { EntityMasterComponent } from './pages/entity-master/entity-master.component';


@NgModule({
  declarations: [UserManagementComponent, UserCreateComponent, CompanyMasterComponent, AssetMasterComponent, AssetCreateComponent, EntityMasterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
