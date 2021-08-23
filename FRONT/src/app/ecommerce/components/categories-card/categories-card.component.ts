import { Component, OnInit } from '@angular/core';

import {Categories} from '../../interfaces/categories.interface';
import { EcommerceService } from '../../services/ecommerce.service';


@Component({
  selector: 'app-categories-card',
  templateUrl: './categories-card.component.html',
  styleUrls: ['./categories-card.component.css']
})
export class CategoriesCardComponent  implements OnInit {



  public categ: any = '';


  constructor( private _category:EcommerceService ) { }


  ngOnInit(): void {
    this.categoriesList();
  }

  categoriesList(){

    this._category.getcategory().subscribe(res =>{ 
      this.categ = res;

    });
  }



}
