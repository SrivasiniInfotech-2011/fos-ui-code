import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatExpansionModule,
    MatMenuModule,
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
  ]
})
export class SharedModule { }
