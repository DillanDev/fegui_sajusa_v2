import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon'




@NgModule({
  declarations: [

    MenuComponent,
     FooterComponent
  ],
  exports:[
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
