import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';

import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent,LoaderComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    BreadcrumbComponent,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ]
})
export class SharedModule { }
