import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [UserManagementComponent, UserCreateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
