import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public categ: any = '';

  constructor( private _categories:SharedService ) { 
  }

  login(){
    return true;
  }

  categoriesList(){

    this._categories.getcategories().subscribe(res =>{ 
      this.categ = res;

    });
  }

}
