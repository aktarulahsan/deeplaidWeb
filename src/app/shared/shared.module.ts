import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent,  SidebarComponent],
  imports: [
    CommonModule,
    RouterModule, 
    FlexLayoutModule
  ],
  exports: [HeaderComponent,SidebarComponent],
})
export class SharedModule { }
