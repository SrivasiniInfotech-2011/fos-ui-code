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

@NgModule({
  declarations: [HeaderComponent, SidebarComponent,LoaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ]
})
export class SharedModule { }
