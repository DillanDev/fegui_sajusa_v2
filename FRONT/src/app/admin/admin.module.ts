import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SlidingMenuComponent } from './components/sliding-menu/sliding-menu.component';




@NgModule({
  declarations: [
  
    DashboardComponent,
       LoginComponent,
       SlidingMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
