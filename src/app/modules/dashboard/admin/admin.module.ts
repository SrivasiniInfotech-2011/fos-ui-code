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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LocationMasterComponent } from './pages/locationmaster/location-master/location-master.component';
import { LocationMasterCreateComponent } from './pages/locationmaster/location-master-create/location-master-create.component';

@NgModule({
  declarations: [UserManagementComponent, UserCreateComponent, CompanyMasterComponent, AssetMasterComponent, AssetCreateComponent, EntityMasterComponent, EntityCreateComponent, GobalParameterSetupComponent, DocumentMasterComponent, DocumentCreateComponent, LocationMasterComponent, LocationMasterCreateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class AdminModule { }
