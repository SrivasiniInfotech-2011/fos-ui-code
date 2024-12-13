import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal-component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
