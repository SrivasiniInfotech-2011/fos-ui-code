import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './pages/user/user-management/user-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyMasterComponent } from './pages/company/company-master/company-master.component';
import { AssetMasterComponent } from './pages/asset/asset-master/asset-master.component';
import { AssetCreateComponent } from './pages/asset/asset-create/asset-create.component';
import { EntityMasterComponent } from './pages/entity/entity-master/entity-master.component';
import { EntityCreateComponent } from './pages/entity/entity-create/entity-create.component';
import { GobalParameterSetupComponent } from './pages/globalparameter/gobal-parameter-setup/gobal-parameter-setup.component';
import { DocumentMasterComponent } from './pages/document/document-master/document-master.component';
import { DocumentCreateComponent } from './pages/document/document-create/document-create.component';


@NgModule({
  declarations: [UserManagementComponent, UserCreateComponent, CompanyMasterComponent, AssetMasterComponent, AssetCreateComponent, EntityMasterComponent, EntityCreateComponent, GobalParameterSetupComponent, DocumentMasterComponent, DocumentCreateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
