import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeeplaidComponent } from './deeplaid.component';
import { HomePageComponent } from './home-page/home-page.component';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DeeplaidComponent, HomePageComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class DeeplaidModule { }
 
